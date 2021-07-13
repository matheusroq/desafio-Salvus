import knex from "../database/connection";
import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';

class Usuario {
    async usuarios() {
        try {
            const usuarios = await knex.select('id', 'nome', 'email', 'nascimento', 'telefone', 'cpf', 'genero').table('usuarios');
            return usuarios;
        } catch (error) {
            return error.sqlMessage;
        }
    }
    async usuario(id) {
        try {
            let error = []
            const usuario = await knex.select('id', 'nome', 'email', 'nascimento', 'telefone', 'cpf', 'genero').where({id}).table('usuarios');
            if(usuario.length == 0) {
                error.push('Usuário não existe');
                return error;
            } else {
                return usuario;
            }
        } catch (error) {
            return error.sqlMessage;
        }
    }
    async register(nome, email, senha, nascimento, telefone, cpf, genero) {
        try{
            let errors = [];
            let checkErrors = false;
            
            const emailExists = await this.findByEmail(email);
            if(emailExists.email === email) {
                errors.push('E-mail já cadastrado');
                checkErrors = true;
                return {errors};
            }
             if(!isEmail(email)) {
                errors.push('E-mail inválido');
                checkErrors = true;
                return {errors};
            } 
            
            if(!senha || senha.length < 6 || senha.length > 50) {
                errors.push('Senha deve ter entre 6 e 50 caracteres');
                checkErrors = true;
                return {errors};
            }
            if(!nome || nome.length < 3 || nome.length > 50) {
                errors.push('Nome deve ter entre 3 e 50 caracteres');
                checkErrors = true;
                return {errors};
            }
            if(!cpf) {
                errors.push('Campo cpf é obrigaório');
                checkErrors = true;
                return {errors};
            }
            if(!telefone) {
                errors.push('Campo telefone é obrigaório');
                checkErrors = true;
                return {errors};
            }
            if(!nascimento) {
                errors.push('Campo nascimento é obrigaório');
                checkErrors = true;
                return {errors};
            }
            if(!genero) {
                errors.push('Campo gênero é obrigaório');
                checkErrors = true;
                return {errors};
            }
            if(!checkErrors) {
                const senha_hash = bcrypt.hashSync(senha, 8);
                const user = await knex.insert({
                    nome,
                    email,
                    senha: senha_hash,
                    nascimento,
                    telefone,
                    cpf,
                    genero,
    
                }).table('usuarios');
                return user;
            } 
        } catch(e) {
            return e.sqlMessage;
        }
        
    }
    async findByEmail(email) {
        try {
            const [TextRow] = await knex.select().where({email}).table('usuarios');
            const usuario = {...TextRow}
            return usuario;
        } catch (error) {
            return error.sqlMessage;
        }
    }
    async update(id, email, nome, telefone, genero) {
        try {
            let errors =[];
            const atualizacao = {};
            if(!id) {
                errors.push('ID inválido');
                return {errors};
            }
            const emailExists = await this.findByEmail(email);
            
            if(emailExists.email == email) {
                errors.push('E-mail já cadastrado');
                return {errors};
            } else {
                atualizacao.email = email;
            }
            if(nome) {
                atualizacao.nome = nome;
            }
            if(telefone) {
                atualizacao.telefone = telefone;
            }
            if(genero) {
                atualizacao.genero = genero;
            }
         
            await knex.update(atualizacao).where({id}).table('usuarios');
            return await this.usuario(id);
        } catch (error) {
            return error.sqlMessage;
        }
    }
    async delete(id) {
        try {
            let errors =[];
            if(!id) {
                errors.push('ID inválido');
                return {errors};
            } 
            const usuarioExiste = await this.usuario(id);
            if(usuarioExiste.length > 0) {
                await knex.delete().where({id}).table('usuarios');
                const sucesso = "Usuário deletado com sucesso."
                return sucesso;
            } else {
                errors.push('Usuário não existe');
                return {errors};
            }
           
        } catch (error) {
            return error.sqlMessage;
        }
    }

    async passwordIsValid(password, email) {
        const {senha} = await this.findByEmail(email);
        try{
            return await bcrypt.compare(password, senha);
        } catch(err) {
            console.log(err)
        }
    }
}

export default new Usuario();