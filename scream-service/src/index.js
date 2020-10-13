import express from 'express'
import cors from 'cors'
import makeCallBack from './callback/index.js'
import {authCallBack} from './callback/index.js'
import dotenv from 'dotenv'
import {verifyToken, getUserScreams, postScream, deleteScream} from './controllers/index.js'
import { getAllScreams, postLike, deleteLike} from './controllers/index.js'


const app = express();
app.use(express.json());


app.get('/api/v1/screams/profile/:username', authCallBack(verifyToken), makeCallBack(getUserScreams));
app.get('/api/v1/screams', authCallBack(verifyToken), makeCallBack(getAllScreams));
app.post('/api/v1/scream', authCallBack(verifyToken), makeCallBack(postScream));
app.delete('/api/v1/scream/:screamid', authCallBack(verifyToken), makeCallBack(deleteScream));
app.post('/api/v1/like/scream/:screamid', authCallBack(verifyToken), makeCallBack(postLike));
app.post('/api/v1/unlike/scream/:screamid', authCallBack(verifyToken), makeCallBack(deleteLike));


const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running at PORT :${PORT}`))
