import DadosProfissional from "../Model/DadosProfissional";

class DadosProfissionalController {
    async index(req, res) {
        try {
            const dados = await DadosProfissional.dadosProfissionais();
            return res.json(dados);
        } catch (error) {
           
            return res.status(400).json({
                error
            })
        }
    }
    async show(req, res) {
        try{
            const {id} = req.params;
            const dados = await DadosProfissional.dadosProfissional(id);
            return res.json(dados);
        } catch(error) {
            return res.status(400).json({
               error
            })
        }
    }
    async store(req, res) {
        try {
            const { profissao, numero_registro, especialidade, localidade, area_atendimento, usuario_id } = req.body;
                           
                const dadosProfissionais = await DadosProfissional.register(profissao, numero_registro, especialidade, localidade, area_atendimento, usuario_id);
                
                return res.json(dadosProfissionais);
        } catch(error) {
            return res.status(400).json({
                error
            })
        }
    }
    async update(req, res) {
        try {
            const {id} = req.params;
            const {profissao, especialidade, numero_registro, localidade, area_atendimento} = req.body
            const dados = await DadosProfissional.update(id, profissao, especialidade, numero_registro, localidade, area_atendimento);
            console.log('cont',dados)
            return res.json(dados)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
    async delete(req, res) {
        try {
            const {id} = req.params;
            const dados = await DadosProfissional.delete(id);
            return res.json(dados)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}

export default new DadosProfissionalController();