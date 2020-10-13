export default function makeGetUser({loginUser, signToken}){
  return async function getUser(httpRequest){
    try{
      const userInfo = httpRequest.body;
      if(!userInfo.email) throw new Error('User must provide an email');
      if(!userInfo.password) throw new Error('User must provide the password');
      const user = await loginUser({email: userInfo.email, password: userInfo.password});
      if(user.error) throw new Error(user.error);
      if(user){
        const token = signToken(user);
        if(token !== null){
          return {
            headers: {
              'Content-Type': 'application/json',
            },
            statusCode: 200,
            body: {
              message: 'User logged in successfully',
              token: token
            },
          }
        }
      }
      throw new Error('Authentication failed');
    } catch(e){
      console.log(e);
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 401,
        body: {
          error: e.message,
        },
      }
    }
  }
}
