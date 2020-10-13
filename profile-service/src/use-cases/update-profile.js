import makeProfileEntity from '../profiles/index.js'

export default function makeUpdateProfile({ profileDb }){
  return async function updateProfile( profileInfo ){
    try{
      const profileEntity = makeProfileEntity( profileInfo );

      //check if username exist
      let profile = await profileDb.findByUsername({username: profileEntity.getCurrentUsername()});
      if(profile === null ) throw new Error('Profile with this username does not exist');
      if(profile.error) throw new Error('Internal Error');


      //check if the new username is available or not
      if(profileEntity.getNewUsername()){
        let check = await profileDb.findByUsername({username: profileEntity.getNewUsername() });
        if(!check) profile.username = profileEntity.getNewUsername();
        else if(check.error) throw new Error('Internal Error');
      }

      const updatedProfile = {
        id: profile.id,
        username: profile.username ,
        firstname: profileEntity.getFirstName() || profile.firstname,
        lastname: profileEntity.getLastName() || profile.lastname,
        memoir: profileEntity.getMemoir() || profile.memoir,
        avatar: profileEntity.getAvatar() || profile.avatar,
        lastupdated: profileEntity.getLastUpdated()
      }
      const res = await profileDb.updateProfile(updatedProfile);
      if(!res || res.error) throw new Error('Internal Error');
      
      delete updatedProfile.id;
      delete updatedProfile.lastupdated;
      return Object.freeze(updatedProfile);
    } catch(e){
      console.log(e);
      return {error: e.message};
    }
  }
}
