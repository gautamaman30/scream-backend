export default function makeListProfile({ profileDb}){
  return async function listProfile( profileInfo ){
    try{
      const profile = await profileDb.findByUsername({username: profileInfo.username });
      if(!profile) throw new Error('Profile with this username does not exist');
      if(profile.error) throw new Error('Internal Error');


      return Object.freeze({
        username: profile.username,
        firstname: profile.firstname,
        lastname:profile.lastname,
        memoir:profile.memoir,
        avatar:profile.avatar
      });
    } catch(e){
      console.log(e);
      return {error: e.message};
    }
  }
}
