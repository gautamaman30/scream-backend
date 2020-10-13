export default function makeAuthUser({fs, jwt}){
  const authToken = Object.freeze({
    signToken: (data) => {
      const privateKey = fs.readFileSync(process.cwd()+'/authKeys/private.pem', 'utf8');
      const payload = {
        user : data.firstname + " " + data.lastname
      };
      let time = 24*60*60*1000;
      time = time + Date.now();
      const signOptions = {
        issuer: 'company name',
        subject: data.email,
        audience: 'company site',
        expiresIn: time,
        algorithm: 'RS256',
      };
      try{
        const token = jwt.sign(payload, privateKey, signOptions);
        console.log(token);
        return token;
      } catch(e){
        console.log(e);
        return null;
      }
    }
  });
  return authToken;
}
