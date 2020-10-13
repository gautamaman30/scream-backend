export default function makeAuthUser({fs, jwt}){
  const authToken = Object.freeze({
    verifyToken: (token) => {
      const publicKey = fs.readFileSync(process.cwd()+'/authKeys/public.pem', 'utf8');

      /*const verifyOptions = {
        issuer: data.iss,
        subject: data.sub,
        audience: data.aud,
        expiresIn: data.exp,
        algorithm: ['RS256'],
      };*/
      try {
        return jwt.verify(token, publicKey);
      } catch(e){
        console.log(e);
        return null;
      }
    }
  });
  return authToken;
}
