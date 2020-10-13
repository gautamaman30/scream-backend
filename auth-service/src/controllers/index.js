import fs from 'fs'
import jwt from 'jsonwebtoken'
import {addUser, loginUser} from '../use-cases/index.js'
import makePostUser from './post-user.js'
import makeGetUser from './get-user.js'
import makeAuthUser from './auth-user.js'


const authToken = makeAuthUser({fs, jwt});
const signToken = authToken.signToken;
const postUser = makePostUser({addUser, signToken});
const getUser = makeGetUser({loginUser, signToken});


export {postUser, getUser};
