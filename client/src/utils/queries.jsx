import { gql } from "@apollo/client";

export const QUERY_PRODUCTS = gql`
  query allProducts {
    _id
    name
    description
    funding
    donors
  }
`;
