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
  mutation addBusiness($name: String!, $sponsor: String, $description: String, $location: String, $website: String, $facebook: String, $twitter: String, $instagram: String, $missionStatement: String) {
    addBusiness(name: $name, sponsor: $sponsor, description: $description, location: $location, website: $website, facebook: $facebook, twitter: $twitter, instagram: $instagram, missionStatement: $missionStatement) {

      business {
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
      }
    }
  }
`;
