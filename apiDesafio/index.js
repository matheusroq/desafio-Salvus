import express from 'express';
import cors from 'cors';
import router from './routes/routes';

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(router);

app.listen(8080, () => console.log('Rodando'));