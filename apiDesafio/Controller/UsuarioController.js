import Usuario from "../Model/Usuario";

class UsuarioController {
    async index(req, res) {
        try {
            const usuarios = await Usuario.usuarios();
            return res.json(usuarios);
        } catch (error) {
           
            return res.status(400).json({
                error
            })
        }
    }
    async show(req, res) {
        try{
            const {id} = req.params;
            const usuario = await Usuario.usuario(id);
            return res.json(usuario);
        } catch(error) {
            return res.status(400).json({
               error
            })
        }
    }
    async store(req, res) {
        try {
           const {email, nome, senha, nascimento, telefone, cpf, genero} = req.body
           const usuario = await Usuario.register(nome,email, senha, nascimento, telefone, cpf, genero);
            return res.json(usuario);
        } catch(error) {
            return res.status(400).json({
                error
            })
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params
            const {email, nome, telefone, genero} = req.body
            const usuario = await Usuario.update(id, email, nome, telefone, genero)
            console.log('upd',usuario)
            return res.json(usuario)
        } catch (error) {
            return res.status(400).json({error})
        }
    }
    async delete(req, res) {
        try {
            const {id} = req.params;
            const usuarioDeletado = await Usuario.delete(id);
            console.log(usuarioDeletado)
            return res.json(usuarioDeletado);
        } catch (error) {
            return res.status(400).json({error});
        }
    }

    async validate(req, res){
        return res.json({msg: 'validado'});
    }
}

export default new UsuarioController();