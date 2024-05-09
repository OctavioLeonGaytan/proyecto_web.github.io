import express from 'express';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cors from 'cors';

//Routers import
import userRouter from './src/routes/users.routes.js';
import computersRouter from './src/routes/computers.routes.js';
import departamentsRouter from './src/routes/departaments.routes.js';
import branchsRouter from './src/routes/branchs.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

//Settings
app.set('port', 3000);

/**** Middlewares **/
app.use(morgan('dev'));
app.use(express.json());

//Cors management
app.use(cors());

//Routes
app.use('/api/Users', userRouter);
app.use('/api/computers', computersRouter);
app.use('/api/departaments', departamentsRouter);
app.use('/api/branchs', branchsRouter);

//Resources management
app.use(express.static(path.join(__dirname, 'frontend')));

app.use('/resources', express.static(`${__dirname}/public`));

//Web service management
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

export default app;