import knex from "../database/connection";


class DadosProfissional {
    async dadosProfissionais() {
        try {
            const dados = await knex.select('id', 'profissao', 'numero_registro', 'especialidade', 'localidade', 'area_atendimento', 'usuario_id').table('dadosProfissional');
            return dados;
        } catch (error) {
            return error.sqlMessage;
        }
    }
    async dadosProfissional(usuario_id) {
        try {
            let error = []
            if(!usuario_id) {
                error.push('ID inválido')
                return error;
            } else {
                const dados = await knex.select('id', 'profissao', 'numero_registro', 'especialidade', 'localidade', 'area_atendimento', 'usuario_id').where({usuario_id}).table('dadosProfissional');
                console.log(dados)
                if(dados.length == 0) {
                    error.push('Dados não existem');
                    return error;
                } else {
                    return dados;
                }
            }
        } catch (error) {
            return error.sqlMessage;
        }
    }

    async register(profissao, numero_registro, especialidade, localidade, area_atendimento, usuario_id) {
        try{
            let errors = [];
            let checkErrors = false;
            
            if(!profissao) {
                errors.push('Campo profissão é obrigatório');
                checkErrors = true;
                return {errors};
            }
            if(!numero_registro) {
                errors.push('Campo nº registro é obrigatório');
                checkErrors = true;
                return {errors};
            }
            if(!especialidade) {
                errors.push('Campo especialidade é obrigatório');
                checkErrors = true;
                return {errors};
            }
            if(!localidade) {
                errors.push('Campo localidade é obrigatório');
                checkErrors = true;
                return {errors};
            }
            if(!area_atendimento) {
                errors.push('Campo área de atendimento é obrigatório');
                checkErrors = true;
                return {errors};
            }
            if(!usuario_id) {
                errors.push('É necessário fornecer o id do usuário');
                checkErrors = true;
                return {errors};
            }

            if(!checkErrors) {
                const dados = await knex.insert({
                    profissao, 
                    numero_registro, 
                    especialidade, 
                    localidade, 
                    area_atendimento, 
                    usuario_id
    
                }).table('dadosProfissional');
                return dados;
            }
        } catch(error) {
            return error.sqlMessage;
        }
        
    }
    async update(usuario_id, profissao, especialidade, numero_registro, localidade, area_atendimento) {
        try {
            let error = []
            const atualizacao = {};
            if(!usuario_id) {
                errors.push('ID inválido');
                return {errors};
            }
            const dadosProfissional  = await this.dadosProfissional(usuario_id)
            
            if(dadosProfissional.length == 0) {
                error.push('Dados não existem');
               return error;
            } else {
                if(profissao) {
                    atualizacao.profissao = profissao;
                }
                if(especialidade) {
                    atualizacao.especialidade = especialidade;
                }
                if(numero_registro) {
                    atualizacao.numero_registro = numero_registro;
                }
                if(localidade) {
                    atualizacao.localidade = localidade;
                }
                if(area_atendimento) {
                    atualizacao.area_atendimento = area_atendimento;
                }

                console.log(atualizacao)
                const  novosDadosProfissional = await knex.update(atualizacao).where({usuario_id}).table('dadosProfissional')
                
                return novosDadosProfissional;
            }            
        } catch (error) {
            return error.sqlMessage;
        }
    }

    async delete(id) {
        try {
            let error = [];
            if(!id) {
                error.push('ID inválido');
                return error;
            }    
            const dadosProfissional  = await this.dadosProfissional(id)
            if(dadosProfissional.length == 0) {
                error.push('Dados não existem');
               return error;
            } else {
                await knex.delete().where({id}).table('dadosProfissional')
                const sucesso = "Dados deletados com sucesso"
                return sucesso;
            }            
        } catch (error) {
            return error.sqlMessage;
        }
    }
}

export default new DadosProfissional();