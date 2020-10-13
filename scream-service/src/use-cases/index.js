import makeAddScream from './add-scream.js'
import makeListAllScreams from './list-all-screams.js'
import makeRemoveScream from './remove-scream.js'
import makeListUserScreams from './list-user-screams.js'
import makeAddLike from './like-scream.js'
import makeRemoveLike from './unlike-scream.js'
import {screamDb, likesDb, profileDb} from '../data-access/index.js'


const addScream = makeAddScream({screamDb, profileDb});
const listUserScreams = makeListUserScreams({screamDb});
const removeScream = makeRemoveScream({screamDb});
const listAllScreams = makeListAllScreams({screamDb});
const addLike = makeAddLike({screamDb, likesDb, profileDb});
const removeLike = makeRemoveLike({screamDb, likesDb, profileDb});


export {addScream, listUserScreams, listAllScreams, removeScream, addLike, removeLike};
