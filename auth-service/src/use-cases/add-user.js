import makeUserEntity from '../users/index.js'

export default function makeAddUser({ userDb }){
  return async function addUser( userInfo ){
    try{
      const userEntity = makeUserEntity( userInfo );
      if(userEntity.error){
        throw new Error(JSON.stringify(userEntity.error));
      }
      const user = await userDb.findByEmail({email: userEntity.getEmail() });
      if(user) throw new Error('User with this email already exists');
      if(user && user.error) throw new Error('Internal Error');

      const res = await userDb.insert({
        id: userEntity.getId(),
        email : userEntity.getEmail(),
        firstname: userEntity.getFirstname(),
        lastname: userEntity.getLastname(),
        dob: userEntity.getDob(),
        createdon: userEntity.getCreatedon(),
        password: userEntity.getPassword(),
        username: userEntity.getEmail()
      });
      if(res.id) return {
        message: 'User created successfully',
        email: userEntity.getEmail(),
        firstname: userEntity.getFirstname(),
        lastname: userEntity.getLastname()
      };
      throw new Error('Internal Error');
    } catch(e){
      console.log(e.message);
      return {error: e.message};
    }
  }
}
