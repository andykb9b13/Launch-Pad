import { gql } from "@apollo/client";

export const QUERY_BUSINESS = gql`
  query Business {
    business {
      _id
      name
      sponsor
      description
      products
    }
  }
`;
