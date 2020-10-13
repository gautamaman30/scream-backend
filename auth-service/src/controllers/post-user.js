export default function makePostUser({addUser, signToken}){
  return async function postUser(httpRequest){
    try{
      const {...userInfo } = httpRequest.body;
      const user = await addUser({...userInfo});
      if(user.error) throw new Error(user.error);
      const token = signToken(user);
      if(token !== null){
        return {
          headers: {
            'Content-Type': 'application/json',
          },
          statusCode: 201,
          body: {
            message: user.message,
            token: token
          },
        }
      }
      throw new Error('Signup failed');
    } catch(e){
      console.log(e.message);
      return {
         headers: {
           'Content-Type': 'application/json'
         },
         statusCode: 400,
         body: {
           error: e.message,
         },
       }
    }
  }
}
