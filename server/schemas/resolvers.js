const { User, Business, Product } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
// Stripe goes here if we use it

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate("businesses").populate("donorTier");
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username }).populate("businesses").populate("donorTier");
    },
    products: async () => {
      return await Product.find().populate("funding");
    },
    businesses: async () => {
        return await Business.find();
    },
    business: async (parent, { name }) => {
        return await Business.findOne({ name });
    },
    // make sure to set Context on the client side in app.js
    me: async (parent, args, contest) => {
        if (context.user) {
            return await User.findOne({ _id: context.user._id }).populate('donations').populate('businesses').populate('watchlist');
        }
        throw new AuthenticationError('You are not logged in.');
    },
  },
  
  Mutation: {
    // Mutation resolvers go here
    addUser: async (_, { username, email, password }) => {
      const user = new User({ username, email, password });
      await user.save();
      const token = jwt.signToken({ _id: user._id }, process.env.SECRET);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('No user with that email');
      }
      // if (password !== user.password) {
      //   throw new Error('Incorrect password');
      // }
      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) {
        throw new AuthenticationError("Invalid Login");
      }

      const token = jwt.signToken({ _id: user._id }, process.env.SECRET);
      return { token, user };
    },
    addToWatchlist: async (_, { _id }, { user }) => {
      if (!user) {
        throw new Error('Authentication failed');
      }
      const product = await Product.findById(_id);
      if (!product) {
        throw new Error('Product not found');
      }
      if (product.donors.includes(user._id)) {
        throw new Error('Product already in watchlist');
      }
      product.donors.push(user._id);
      await product.save();
      user.watchlist.push(product._id);
      await user.save();
      return product;
    },
    removeFromWatchlist: async (_, { _id }, { user }) => {
      if (!user) {
        throw new Error('Authentication failed');
      }
      const product = await Product.findById(_id);
      if (!product) {
        throw new Error('Product not found');
      }
      if (!product.donors.includes(user._id)) {
        throw new Error('Product not in watchlist');
      }
      product.donors = product.donors.filter((donor) => donor !== user._id);
      await product.save();
      user.watchlist = user.watchlist.filter((productId) => productId !== product._id);
      await user.save();
      return product;
    },
    addBusiness: async (_, { name, sponsor, description }, { user }) => {
      if (!user) {
        throw new Error('Authentication failed');
      }
      const business = new Business({ name, sponsor, description });
      await business.save();
      user.businesses.push(business._id);
      await user.save();
      return user;
    },
    donate: async (_, { _id, amount }, { user }) => {
      if (!user) {
        throw new Error('Authentication failed');
      }
      const product = await Product.findById(_id);
      if (!product) {
        throw new Error('Product not found');
      }
      product.funding += amount;
      await product.save();
      return product;
    }
    }
};

module.exports = resolvers;
