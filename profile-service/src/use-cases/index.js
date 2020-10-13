import makeListProfile from './list-profile.js'
import makeUpdateProfile from './update-profile.js'
import profileDb from '../data-access/index.js'


const listProfile = makeListProfile({profileDb});
const updateProfile = makeUpdateProfile({profileDb});


export {listProfile, updateProfile};
