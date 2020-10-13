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
