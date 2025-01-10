import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js'

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect('mongodb+srv://santiang:0304@cluster0.8clbd.mongodb.net/Adoptme?retryWrites=true&w=majority&appName=Cluster0')

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mocksRouter)

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))


import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express'

const swaggerOptions = {
    definition:{
        openapi: '3.0.1',
        info: {
            title: 'Documentacion de la app Adoptame',
            description: 'Me esta costando mucho hacer esto en enero',
        },
    },
    apis: ['./src/docs/**/*.yaml']
}

const specs = swaggerJSDoc(swaggerOptions)

app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))