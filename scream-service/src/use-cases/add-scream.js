import makeScreamEntity from '../screams/index.js'


export default function makeAddScream({ screamDb, profileDb}){
  return async function addScream ( screamInfo ){
    try{
      const screamEntity = makeScreamEntity( screamInfo );
      if(screamEntity.error){
        throw new Error(JSON.stringify(screamEntity.error));
      }

      //check if user exist
      const user = await profileDb.checkUser({username: screamInfo.username});
      if(!user) throw new Error('User does not exist');
      if(user.error)  throw new Error('Internal Error');
      const scream = {
          screamid: screamEntity.getScreamid(),
          username: screamEntity.getUsername(),
          body: screamEntity.getBody(),
          avatar: screamEntity.getAvatar(),
          likescount: screamEntity.getLikescount(),
          createdat: screamEntity.getCreatedat()
      };
      const res = await screamDb.insert(scream);
      if(!res || res.error) throw new Error('Internal Error');
      if(res) {
        return Object.freeze(scream);
      }
    } catch(e){
      console.log(e.message);
      return {error: e.message};
    }
  }
}
