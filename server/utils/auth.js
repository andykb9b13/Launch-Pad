const jwt = require('jsonwebtoken');

const secret = 'JoshLovesAlec';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"] COPY into App.js in client folder ---> 
    
    // const authLink = setContext((_, { headers }) => {
    //   const token = localStorage.getItem('id_token');
    //   return {
    //     headers: {
    //       ...headers,
    //       authorization: token ? `Bearer ${token}` : '',
    //     },
    //   };
    // }); 

    // const client = new ApolloClient({
    //     link: authLink.concat(httpLink),
    //     cache: new InMemoryCache(),
    //   });

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
