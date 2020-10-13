export default function makeAddLike({ screamDb, likesDb, profileDb}){
  return async function addLike ( likeInfo ){
    try{
      //check if user exist
      const user = await profileDb.checkUser({username: likeInfo.username});
      if(!user) throw new Error('User does not exist');
      if(user.error) throw new Error('Internal error');

      const like = await likesDb.likeScream({screamid: likeInfo.screamid, username: likeInfo.username});
      if(!like) throw new Error('You have already liked this scream');
      if(like.error) throw new Error('Internal Error');

      //check scream if exist and update likes count
      const scream = await screamDb.updateLikescount({screamid: likeInfo.screamid, count:1});
      if(!scream) throw new Error('Scream does not exist');
      if(scream.error) throw new Error('Internal error');

      return {message: 'Like added successfully'};
    } catch(e){
      console.log(e.message);
      return {error: e.message};
    }
  }
}
