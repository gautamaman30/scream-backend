import express from 'express'
import cors from 'cors'
import makeCallBack from './callback/index.js'
import {authCallBack} from './callback/index.js'
import {verifyToken, getProfile, editProfile} from './controllers/index.js'


const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/v1/profile/:username', authCallBack(verifyToken), makeCallBack(getProfile));
app.put('/api/v1/edit/profile', authCallBack(verifyToken), makeCallBack(editProfile));


const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running at PORT :${PORT}`))
