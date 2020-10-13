export default function buildMakeProfileEntity({Id}){
  return function makeProfileEntity({
    username,
    avatar,
    body,
    screamid = Id.makeId(),
    createdat = new Date().getTime(),
    likescount = 0
  }){
    let err = {error: {}};
    if(!username) err.error.message1 = "No username provided for screams";

    if(!body) err.error.message3 = "Screams must have body";


    if(Object.keys(err.error).length > 0 ) return err;

    return Object.freeze({
      getUsername: () => username,
      getAvatar: () => avatar,
      getBody: () => body,
      getScreamid: () => screamid,
      getLikescount:() =>  likescount,
      getCreatedat: () => createdat
    });
  }
}
