
import jwt from 'jsonwebtoken'

const generateToken = (data) => {
    let accessToken =  jwt.sign({data}, process.env.JWT_SECRET_KEY, { expiresIn: 10}) 
    let refreshToken = jwt.sign({data}, process.env.JWT_REFRESH_SECRET_KEY,{ expiresIn: 60 * 60 }) 
    return {accessToken ,refreshToken}
}
 
module.exports ={
    generateToken,
     
}