import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {
  hashPasword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  generateToken(_id, _isAdmin) {
    const token = jwt.sign({ id:_id, isAdmin:_isAdmin }, process.env.JWT_SECRET);
    return token;
  },
};

export default Helper;
