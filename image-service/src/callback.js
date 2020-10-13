export default function authCallBack(controller){
  return (req, res, next) => {
    res.set('Content-Type', 'application/json');
    if(!req.headers.authorization) return res.status(401).send({error: 'Unauthorized request'});

    let token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).send({error: 'Unauthorized request'});
    let payloadEncoded = token.split('.')[1];
    let payloadString = Buffer.from(payloadEncoded, 'base64').toString('utf-8');
    let payload = JSON.parse(payloadString);
    if(!(payload.exp > Date.now())) return res.status(401).send({error: 'Unauthorized request'});

    const legit  = controller(token);
    if(legit === null) return res.status(401).send({error: 'Unauthorized request'});

    next();
  }
}
