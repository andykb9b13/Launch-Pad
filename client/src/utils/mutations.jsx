import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

// removed token
export const ADD_BUSINESS = gql`
  mutation addBusiness(
    $name: String!
    $sponsor: String
    $description: String
    $location: String
    $website: String
    $facebook: String
    $twitter: String
    $instagram: String
    $missionStatement: String
    $imageUrl: String
  ) {
    addBusiness(
      name: $name
      sponsor: $sponsor
      description: $description
      location: $location
      website: $website
      facebook: $facebook
      twitter: $twitter
      instagram: $instagram
      missionStatement: $missionStatement
      imageUrl: $imageUrl
    ) {
      _id
      name
      sponsor
      description
      location
      website
      facebook
      twitter
      instagram
      missionStatement
      imageUrl
    }
  }
`;

export const ADD_DONATION = gql`
  mutation donate(
    $amount: String!
    $message: String
    $productId: String
  ) {
    donate(
      amount: $amount
      message: $message
      productId: $productId
    ) {
      _id
      donor
      amount
      product
      message
    }
  }
`;
export const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $description: String!
    $funding: String!
    $externalLink: String
    $imageUrl: String
    $businessId: String
  ) {
    addProduct(
      name: $name
      description: $description
      funding: $funding
      externalLink: $externalLink
      imageUrl: $imageUrl
      businessId: $businessId
    ) {
      _id
      name
      description
      funding
      externalLink
      imageUrl
      businessId
    }
  }
`;


export const DELETE_BUSINESS = gql`
mutation Mutation($id: ID!) {
  deleteBusiness(_id: $id) {
    _id
  }
}
`