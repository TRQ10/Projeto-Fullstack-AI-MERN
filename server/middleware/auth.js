import jwt from 'jsonwebtoken';


const jwt_secret = process.env.JWT_SECRET

/** auth middleware */
export default async function Auth(req, res, next){
    try {
        
        // Header de autorização para validação de request
        const token = req.headers.authorization.split(" ")[1];
       

        // Retornar as informações do usúario conectado
        const decodedToken = await jwt.verify(token, jwt_secret);

        req.user = decodedToken;

        next()

    } catch (error) {
        res.status(401).json({ error : "Authentication Failed!"})
    }
}


export function localVariables(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
}

export function isAdmin (req, res, next){
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized access' });
    }
  };