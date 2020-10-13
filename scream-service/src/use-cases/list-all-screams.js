export default function makeListAllScreams({ screamDb }){
  return async function listAllScreams (){
    try{
      const screams = await screamDb.findAllScreams();
      if(!screams){
        throw new Error('screams do not exist');
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
