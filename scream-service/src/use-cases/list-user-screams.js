export default function makeListUserScreams({ screamDb }){
  return async function listUserScreams ( {username}){
    try{
      const screams = await screamDb.findScreams({username});
      if(!screams){
        throw new Error('No screams by this user');
      }
      if(screams.error){
        throw new Error('Internal Error');
      }
      screams.forEach(scream => {
        delete scream.id;
      });
      return screams;
    } catch(e){
      console.log(e.message);
      return {error: e.message};
    }
  }
}
