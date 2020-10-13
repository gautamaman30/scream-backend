export default function makeCallBack(controller){
  return async (req, res) => {
    console.log(req.path);
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    console.log(req.method);
    console.log(req.headers);
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
      }
    }
    let httpResponse = {};
    try{
      httpResponse = await controller(httpRequest);
      if(httpResponse.headers){
        res.set(httpResponse.headers);
      }
    } catch(e){
      console.log(e);
    }
    console.log('response');
    console.log(httpResponse);
    res.status(httpResponse.statusCode).send(httpResponse.body);
  }
}

export function authCallBack(controller){
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
