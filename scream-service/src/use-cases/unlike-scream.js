export default function makeRemoveLike({ screamDb, likesDb, profileDb}){
  return async function removeLike( unlikeInfo ){
    try{
      //check if user exist
      const user = await profileDb.checkUser({username: unlikeInfo.username});
      if(!user) throw new Error('User does not exist');
      if(user.error) throw new Error('Internal error');

      const unlike = await likesDb.unlikeScream({screamid: unlikeInfo.screamid, username: unlikeInfo.username});
      if(!unlike) throw new Error('You have not liked this scream');
      if(unlike.error)  throw new Error('Internal Error');


      //check scream if exist and update likes count
      const scream = await screamDb.updateLikescount({screamid: unlikeInfo.screamid, count:-1});
      if(!scream) throw new Error('Scream does not exist');
      if(scream.error) throw new Error('Internal error');

      return {message: 'Unliked scream successfully'};
    } catch(e){
      console.log(e.message);
      return {error: e.message};
    }
  }
}
