export default function buildMakeProfileEntity(){
  return function makeProfileEntity( profileInfo ){
    return Object.freeze({
      getCurrentUsername: () => profileInfo.username,
      getNewUsername: () => profileInfo.newUsername,
      getAvatar: () => profileInfo.avatar,
      getFirstName: () => profileInfo.firstname,
      getLastName: () => profileInfo.lastname,
      getMemoir: () => profileInfo.memoir,
      getLastUpdated: () => new Date().getTime()
    });
  }
}
