const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    username: String
    password: String
    donorTier: Int
    donations: [Donation]
    businesses: [Business]
    watchlist: [Product]
  }

  type Business {
    _id: ID
    name: String
    sponsor: String
    description: String
    location: String
    website: String
    facebook: String
    twitter: String
    instagram: String
    missionStatement: String
    imageUrl: String
    products: [Product]
  }

  type Product {
    _id: ID
    name: String
    description: String
    funding: Int
    fundingGoal: Int
    externalLink: String
    imageUrl: String
    businessId: String
    donors: [User]
  }

  type Donation {
    _id: ID
    donor: String
    amount: Int
    product: String
    message: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    products: [Product]
    product(productId: String!): Product
    businesses: [Business]
    business(name: String!): Business
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    deleteUser(_id: ID!): Auth
    addToWatchlist(_id: ID!): Product
    removeFromWatchlist(_id: ID!): Product
    addBusiness(
      name: String!
      sponsor: String
      description: String
      location: String
      website: String
      facebook: String
      twitter: String
      instagram: String
      missionStatement: String
      imageUrl: String
    ): Business
    deleteBusiness(_id: ID!): User
    donate(amount: Int!, message: String, productId: String): Donation
    addProduct(
      name: String!
      description: String!
      funding: Int!
      fundingGoal: Int!
      externalLink: String
      imageUrl: String
      businessId: String
    ): Product
    deleteProduct(productId: ID!): Product
  }
`;

module.exports = typeDefs;
