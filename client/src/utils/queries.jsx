import { gql } from "@apollo/client";

export const QUERY_BUSINESS = gql`
  query Business($name: String!) {
    business(name: $name) {
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
      products {
        _id
        name
        description
        funding
        externalLink
      }
    }
  }
`;

export const QUERY_BUSINESSES = gql`
  query Businesses {
    businesses {
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
      products {
        _id
        name
        description
        funding
        externalLink
      }
    }
  }
`;

export const QUERY_PRODUCT = gql`
  query Product($productId: String!) {
    product(productId: $productId) {
      _id
      name
      description
      funding
      externalLink
    }
  }
`;
