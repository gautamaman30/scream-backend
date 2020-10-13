import express from 'express'
import cors from 'cors'
import authCallBack from './callback.js'
import authKey from './authKey.js'
import postImage from './upload-image.js'
import db from './db.js'
import fs from 'fs'
import path from 'path'
import Busboy from 'busboy'


const app = express();
app.use(express.json());


app.post('/api/v1/image/profile/:username', authCallBack(authKey.verifyToken), postImage({fs, db, Busboy, path}));


const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running at PORT :${PORT}`))
