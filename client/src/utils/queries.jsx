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

export const QUERY_BUSINESSES = gql`
  query Businesses {
    businesses {
      name
      sponsor
      description
      location
      website
      facebook
      twitter
      instagram
      missionStatement
      products {
        name
        description
        funding
        externalLink
      }
    }
  }
`;
