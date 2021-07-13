import jwt from  'jsonwebtoken';
import Usuario from "../Model/Usuario";
import dotenv from 'dotenv';
dotenv.config()

class TokenController {
    async store(req, res) {
        const {email = '', senha = ''} = req.body;
       
        if(!email || !senha) {
            return res.json({
                error: ['Crendenciais inválidas']
            });
        }
        const usuario = await Usuario.findByEmail(email);

        if(Object.keys(usuario) == 0) {
            return res.json({
                error: ['Usuário não existe']
            });
        }
        if(!(await Usuario.passwordIsValid(senha, email))) {
            return res.json({
                error: ['Senha inválida']
            });
        }
        const id = usuario.id;
       
        const token = jwt.sign({id, email}, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION
        });
        return res.json({token, id})
    }
}

export default new TokenController();