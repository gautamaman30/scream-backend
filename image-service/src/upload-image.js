export default function postImage({fs, db, Busboy, path}){
  return async (req, res) => {
    res.set({
      'Content-Type': 'application/json'
    });

    console.log(req.headers);
    const size = 1024 * 250;//250kilobytes
    const busboy = new Busboy({
      headers: req.headers,
      limits: {
        files: 1,
        fileSize:  size}
    });

    const username = req.params.username;
    let avatar = 'file://';
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      file.on('limit', (data) => {
        console.log(data);
        return res.status(400).send({error: 'File should be less than 250kb'});
      });

      let imgExt = '';

      if (mimetype === "image/jpeg") imgExt = '.jpeg';
      else if(mimetype === "image/png") imgExt = '.png';
      else if(mimetype === "image/jpg") imgExt = '.jpg';
      else return res.status(400).send({error: 'Wrong file type submitted'});

      const imgFileName = `${username}${imgExt}`;
      let filePath = path.join(process.cwd()+'/tempImg/', imgFileName);
      avatar = avatar.concat(filePath);
      console.log(avatar);
      console.log(filePath);
      file.pipe(fs.createWriteStream(filePath));
    });
    busboy.on('finish', async () => {
      const data = {username: username, avatar: avatar};
      const result1 = await db.updateProfileAvatar(data);
      const result2 = await db.updateScreamAvatar(data);
      if(!result1 || result1.error || result2.error) return res.status(500).send({error: 'Internal Error'});
    });
    req.pipe(busboy);
    res.status(200).send({message: 'Image uploaded successfully', avatar: avatar});
  }
}
