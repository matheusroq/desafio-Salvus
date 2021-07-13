import Usuario from "../Model/Usuario";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export default async (req, res, next) => {
    const authorization  = req.headers.authorization; 
    if(!authorization) {
         return res.json({
            errors: ['É necessário estar logado'],
        });
    }
    const [, token] = authorization.split(' ');
        try {
            const dados = jwt.verify(token, process.env.TOKEN_SECRET);
            const { id, email } = dados;

            const usuario = Usuario.usuario(id);

            if(!usuario) {

                return res.json({
                    errors: ['Usuário inválido'],
                });
            }

            req.userId = id;
            req.userEmail = email;
            return next();
        } catch (error) {
            return res.json({
                errors: ['Token expirado ou inválido'],
              });
        }
}