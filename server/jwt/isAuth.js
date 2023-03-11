const { verify } = require('jsonwebtoken');

const isAuth = (req) => {
  
  const authorization = req.headers['authorization'];

  if (authorization === `Bearer undefined`) throw new Error('Please Log In');
  // Based on 'Bearer ksfljrewori384328289398432'
  const token = authorization && authorization.split(' ')[1];
  
  const { userId } = verify(token, process.env.ACCESS_TOKEN_SECRET);

  return userId;
};

module.exports = {
  isAuth,
};
