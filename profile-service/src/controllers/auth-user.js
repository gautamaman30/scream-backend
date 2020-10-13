export default function makeAuthUser({fs, jwt}){
  const authToken = Object.freeze({
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
  return authToken;
}
