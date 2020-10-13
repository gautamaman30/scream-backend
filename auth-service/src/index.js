import express from 'express'
import cors from 'cors'
import makeCallBack from './callback/index.js'
import {postUser, getUser} from './controllers/index.js'


const app = express();
app.use(express.json());



app.post('/api/v1/user/signup', makeCallBack(postUser));
app.post('/api/v1/user/login', makeCallBack(getUser));



const PORT = PORT;
app.listen(PORT, () => console.log(`Server is running at PORT:${PORT}`))
