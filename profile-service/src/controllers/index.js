import {listProfile, updateProfile} from '../use-cases/index.js'
import makeGetProfile from './get-profile.js'
import makeEditProfile from './edit-profile.js'
import makeAuthUser from './auth-user.js'
import fs from 'fs'
import jwt from 'jsonwebtoken'


const authToken = makeAuthUser({fs, jwt});
const verifyToken = authToken.verifyToken;

const getProfile = makeGetProfile({listProfile});
const editProfile = makeEditProfile({updateProfile});



export {verifyToken, getProfile, editProfile};
