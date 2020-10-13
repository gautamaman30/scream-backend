import {listAllScreams, addScream, addLike} from '../use-cases/index.js'
import {removeScream, listUserScreams, removeLike} from '../use-cases/index.js'
import makeGetUserScreams from './get-user-screams.js'
import makeGetAllScreams from './get-all-screams.js'
import makePostScream from './post-scream.js'
import makeDeleteScream from './delete-scream.js'
import makeAuthUser from './auth-user.js'
import makeDeleteLike from './delete-like.js'
import makePostLike from './post-like.js'
import fs from 'fs'
import jwt from 'jsonwebtoken'


const authToken = makeAuthUser({fs, jwt});
const verifyToken = authToken.verifyToken;

const getUserScreams = makeGetUserScreams({listUserScreams});
const getAllScreams = makeGetAllScreams({listAllScreams});
const postScream = makePostScream({addScream});
const deleteScream = makeDeleteScream({removeScream});
const deleteLike = makeDeleteLike({removeLike});
const postLike = makePostLike({addLike});



export {verifyToken, getUserScreams, getAllScreams, postScream, deleteScream, postLike, deleteLike};
