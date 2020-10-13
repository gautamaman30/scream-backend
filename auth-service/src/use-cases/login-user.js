export default function makeLoginUser({ userDb, compareHashPassword}){
  return async function loginUser( userInfo ){
    try{
      const user = await userDb.findByEmail({email: userInfo.email });
      if(user && user.error) throw new Error('Internal Error');
      if(user){
        const check = await compareHashPassword(userInfo.password, user.password);
        if(check === false) throw new Error('Wrong Password');
        else if (check === true ){
          const {email, firstname, lastname, dob} = user;
          return {email, firstname, lastname, dob};
        }
        else throw new Error('Internal Error');
      }
      throw new Error('User does not exist');
    } catch(e){
      console.log(e);
      return {error: e.message};
    }
  }
}
