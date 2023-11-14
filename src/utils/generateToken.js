
import jwt from 'jsonwebtoken'

const generateToken = (data) => {
    let accessToken =  jwt.sign({data}, process.env.JWT_SECRET_KEY, { expiresIn: 10 }) 
    let refreshToken = jwt.sign({data}, process.env.JWT_REFRESH_SECRET_KEY,{ expiresIn: 600 }) 
    return {accessToken ,refreshToken}


    
}

const verifyToken = (token, type = 'access') => {
    // console.log(token + type )

    try {
        if (type == 'access') {

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            return decoded.data;
        }

        const decoded =  jwt.verify(token, 'fkawejhJfkalke32fawekjalwkjalkwa3kakafjlake');

        return decoded.data;
    } catch (error) {
      throw new Error('Invalid token');
    }
  };
 
module.exports ={
    generateToken,
    verifyToken
     
}