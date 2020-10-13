export default function makeRemoveScream({ screamDb }){
  return async function removeScream ( {screamid}){
    try{
      const res = await screamDb.remove({screamid});
      if(!res) throw new Error('Scream does not exist');
      if(res.error) throw new Error('Internal Error');
      return Object.freeze({message: 'Scream deleted successfully'});
    } catch(e){
      console.log(e.message);
      return {error: e.message};
    }
  }
}
