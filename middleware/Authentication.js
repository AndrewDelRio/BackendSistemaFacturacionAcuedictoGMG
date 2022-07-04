const jwt = require("jsonwebtoken");

function JWTokenVerification(req, res, next) {
    let token = req.get('token');
    let signature = process.env.JWT_SIGNATURE;
    jwt.verify(token, signature, (err, decoded) => {
        if (err) {            
            return res.status(401).json({
                ok: false,
                error: 'No autorizado',
                message:'Usted no esta autorizado o su sesion ha caducado'              
            });            
        }
        req.user = decoded.user;
        next();
    });
}

module.exports = {JWTokenVerification};