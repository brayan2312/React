const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY = "Wcgrs896SF34fgsfgcdfJOD056S2mkfbns2";

exports.ensureAuth = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(404).send({message: "La peticion no tiene cabezera"});
    }

    const token = req.headers.authorization.replace(/['"]+/g, "");

    try{
        var payload = jwt.decode(token, SECRET_KEY);

        if(payload.exp <= moment.unix()){
            return res.status(404).send({message: "Token ha expirado"});
        }
    }catch(ex){
        return res.status(404).send({ message: "Token invalido"});
    }
    req.user = payload;
    next();
}