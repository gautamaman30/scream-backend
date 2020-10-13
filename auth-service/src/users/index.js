import buildMakeUserEntity from './user.js'
import Id from '../Id/index.js'


function isValidAge(dob){
  //dob format MM/DD/YYYY
  dob = new Date(dob);
  let msDiff = Date.now() - dob.getTime();
  return Math.abs((new Date(msDiff).getUTCFullYear()) - 1970) >= 13 ? true: false ;
}

const makeUserEntity = buildMakeUserEntity({Id, isValidAge});

export default makeUserEntity;
