import { Router } from 'express';
import usuarioController from '../Controller/UsuarioController';
import dadosProfissionalController from '../Controller/DadosProfissionalController';
import tokenController from '../Controller/TokenController';
import loginRequired from '../middleware/loginRequired';

const router = new Router();

//usuarios
router.get('/usuario', usuarioController.index);
router.get('/usuario/:id', loginRequired, usuarioController.show);
router.post('/usuario/store', usuarioController.store);
router.put('/usuario/:id', loginRequired, usuarioController.update);
router.delete('/usuario/:id', loginRequired, usuarioController.delete);
router.post('/usuario/validate', loginRequired, usuarioController.validate);

//dadosProfissional
router.get('/dados', dadosProfissionalController.index);
router.get('/dados/:id', loginRequired, dadosProfissionalController.show);
router.post('/dados/store', dadosProfissionalController.store);
router.put('/dados/:id', loginRequired, dadosProfissionalController.update);
router.delete('/dados/:id', loginRequired, dadosProfissionalController.delete);

//token
router.post('/token', tokenController.store);


export default router;