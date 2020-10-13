import makeAddUser from './add-user.js'
import makeLoginUser from './login-user.js'
import userDb, { compareHashPassword } from '../data-access/index.js'


const addUser = makeAddUser({userDb});
const loginUser = makeLoginUser({userDb, compareHashPassword});

export {addUser, loginUser};
