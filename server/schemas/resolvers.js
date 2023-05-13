const { User, Business, Product, Donation } = require("../models");
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
    addBusiness: async (_, { name, description, location, website, twitter, facebook, instagram, missionStatement, imageUrl }, { user }) => {
      if (!user) {
        throw new Error("Authentication failed");
      }
      console.log("this is user: ", user);
      try {
        // const business = new Business({ name, description, sponsor: user._id });
        // console.log("this is business: ", business);
        // let theBusiness = await business.save();

        // console.log("this is theBusiness 2 ", theBusiness);

        let newBusiness = await Business.create({
          name,
          description,
          sponsor: user._id,
          location,
          website,
          twitter,
          facebook,
          instagram,
          missionStatement,
          imageUrl
        });

        console.log("here is newBusiness", newBusiness);

        const newUser = await User.findByIdAndUpdate(
          user._id,
          { $push: { businesses: newBusiness._id } },
          { new: true }
        );

        return newBusiness;
      } catch (err) {
        console.error(err);
      }
    },
    deleteBusiness: async (_, { _id }, { user }) => {
      // if (!user) {
      //   throw new Error("Invalid Credentials");
      // }
      // if (!user.businesses.includes(Business._id)) {
      //   throw new Error("Invalid Credentials");
      // }        
      console.log("user ID: ",Business.sponsor);
      const userId = Business.sponsor; 
      const updatedUser = await User.findByIdAndUpdate(

        userId,
        { $pull: { businesses: _id } },
        { new: true }
      );
      await Business.findByIdAndDelete(_id);
      
      return updatedUser;
    },

    addProduct: async (
      _,
      { name, description, funding, externalLink, imageUrl, businessId }
    ) => {
      try {
        console.log("In the resolver~~~~~");
        let newProduct = await Product.create({
          name,
          description,
          funding,
          externalLink,
          imageUrl,
          businessId,
        });
        console.log("This is businessId", businessId);

        let newBusiness = await Business.findByIdAndUpdate(
          businessId,
          { $push: { products: newProduct._id } },
          { new: true }
        );
        console.log("here is newBusiness in the resolver", newBusiness);
        return newProduct;
      } catch (err) {
        console.error(err);
      }
    },
    deleteProduct: async (_, { productId }) => {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Product not found");
      }
      await Product.findByIdAndDelete(productId);
      return product;
    },

    donate: async (_, { amount, message, productId }, { user }) => {
      if (!user) {
        throw new Error("Authentication failed");
      }
      console.log('hitting donation route');
      let newDonation = await Donation.create({
        amount,
        message,
        donor: user._id,
      });
      let newProduct = await Product.findByIdAndUpdate(
        productId,
        { $push: { donors: user._id } },
        { new: true }
      );
        let newUser = await User.findByIdAndUpdate(
        user._id,
        { $push: { donations: newDonation._id } },
        { new: true }
      );
      // product.funding += amount;
      // await product.save();
      return newDonation;
    },
  },
};

module.exports = resolvers;
