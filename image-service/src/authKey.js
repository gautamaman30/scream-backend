import fs from 'fs'
import jwt from 'jsonwebtoken'
const authKey = Object.freeze({
    verifyToken: (token) => {
      const publicKey = fs.readFileSync(process.cwd()+'/authKeys/public.pem', 'utf8');
      try {
        const res = jwt.verify(token, publicKey);
        return res;
      } catch(e){
        console.log(e);
        return null;
      }
    }
  });

export default authKey;
