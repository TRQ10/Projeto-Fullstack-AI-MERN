import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
import router from './routes/route.js'

dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(morgan('tiny'));
app.disable('x-powered-by') // less hackers know about our stack

// API routes 

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)
app.use('/api/v1', router)


app.get('/', async (req, res) => {
    res.send('Hello from DALL-E!');
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(6969, () => console.log('Server iniciou na porta http://localhost:6969'))
    } catch (error) {
        console.log(error);
    }
}



    

startServer();