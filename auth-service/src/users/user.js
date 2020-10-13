export default function buildMakeUserEntity({Id, isValidAge}){
  return function makeUserEntity({
    email,
    firstname,
    lastname,
    dob,
    createdon = new Date().getTime(),
    id = Id.makeId(),
    password,
    password2,
  }){
    let err = {error: {}};
    if(!email) err.error.message1 = "User must provide an email";

    if(!firstname) err.error.message2 = "User must provide first name";

    if(!lastname) err.error.message3 = "User must provide last name";

    if(!dob) err.error.message4 = "User must provide date of birth";
    else if(!isValidAge(dob)) err.error.message5 = "User must be at least 13 years old";

    if(!password) err.error.message6 = "User must provide password";
    else if(!password2) err.error.message7 = "User must provide password two times";
    else if(password !== password2) err.error.message8 = "Passwords do not match ";
    else if(password.length < 8) err.error.message9 = "Password must have at least 8 characters";

    if(Object.keys(err.error).length > 0){
      return err;
    }
    return Object.freeze({
      getEmail: () => email,
      getFirstname: () => firstname,
      getLastname: () => lastname,
      getDob: () => new Date(dob).getTime(),
      getCreatedon: () => createdon,
      getId: () => id,
      getPassword: () => password,
    });
  }
}
