const { User, Business, Product } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
// Stripe goes here if we use it

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate("businesses").populate("donorTier");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .populate("businesses")
        .populate("donorTier");
    },
    products: async () => {
      return await Product.find().populate("funding");
    },
    product: async (parent, { productId }) => {
      console.log("productId in resolvers", productId);
      try {
        const product = await Product.findOne({ _id: productId });
        console.log("product in resolvers", product);
        return product;
      } catch (err) {
        console.log(err);
      }
    },
    businesses: async () => {
      return await Business.find().populate("products");
    },
    business: async (parent, { name }) => {
      return await Business.findOne({ name }).populate("products");
    },
    // make sure to set Context on the client side in app.js
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("donations")
          .populate("businesses")
          .populate("watchlist");
      }
      throw new AuthenticationError("You are not logged in.");
    },
  },

  Mutation: {
    // Mutation resolvers go here
    addUser: async (_, { username, email, password }) => {
      const user = new User({ username, email, password });
      await user.save();
      const token = signToken({ _id: user._id }, process.env.SECRET);
      return { token, user };
    },
    deleteUser: async (_, { userId }) => {
      const deletedUser = await User.findByIdAndDelete(userId);
      return deletedUser;
    },
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("No user with that email");
      }
      // if (password !== user.password) {
      //   throw new Error('Incorrect password');
      // }
      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) {
        throw new AuthenticationError("Invalid Login");
      }

      const token = signToken({ _id: user._id }, process.env.SECRET);
      return { token, user };
    },
    addToWatchlist: async (_, { _id }, { user }) => {
      if (!user) {
        throw new Error("Authentication failed");
      }
      const product = await Product.findById(_id);
      if (!product) {
        throw new Error("Product not found");
      }
      if (product.donors.includes(user._id)) {
        throw new Error("Product already in watchlist");
      }
      product.donors.push(user._id);
      await product.save();
      user.watchlist.push(product._id);
      await user.save();
      return product;
    },
    removeFromWatchlist: async (_, { _id }, { user }) => {
      if (!user) {
        throw new Error("Authentication failed");
      }
      const product = await Product.findById(_id);
      if (!product) {
        throw new Error("Product not found");
      }
      if (!product.donors.includes(user._id)) {
        throw new Error("Product not in watchlist");
      }
      product.donors = product.donors.filter((donor) => donor !== user._id);
      await product.save();
      user.watchlist = user.watchlist.filter(
        (productId) => productId !== product._id
      );
      await user.save();
      return product;
    },
    addBusiness: async (_, { name, description }, { user }) => {
      if (!user) {
        throw new Error("Authentication failed");
      }
      console.log("this is user: ",user);
      try {
        const business = new Business({ name, description, sponsor: user._id} );
        console.log("this is business: ",business);
        await business.save();
        
        await User.findByIdAndUpdate(user._id, {$push: {businesses: business._id}});

        return user;
      } catch (err) {
        console.error(err);
      }
    },
    deleteBusiness: async (_, { businessId }, { user }) => {
      if (!user) {
        throw new Error("Invalid Credentials");
      }
      const business = await Business.findById(businessId);
      if (!business) {
        throw new Error("Business not found");
      }
      if (!user.businesses.includes(business._id)) {
        throw new Error("Invalid Credentials");
      }
      await Business.findByIdAndDelete(businessId);
      user.businesses = user.businesses.filter(
        (b) => b.toString() !== businessId.toString()
      );
      await user.save();
      return user;
    },
    addProduct: async (_, { name, description, funding, externalLink }) => {
      const product = new Product({ name, description, funding, externalLink });
      await product.save();
      return product;
    },
    deleteProduct: async (_, { productId }) => {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Product not found");
      }
      await Product.findByIdAndDelete(productId);
      return product;
    },

    donate: async (_, { _id, amount }, { user }) => {
      if (!user) {
        throw new Error("Authentication failed");
      }
      const product = await Product.findById(_id);
      if (!product) {
        throw new Error("Product not found");
      }
      product.funding += amount;
      await product.save();
      return product;
    },
  },
};

module.exports = resolvers;
