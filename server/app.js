import express from 'express';
import authRouter from './routers/authRouter.js';
import schoolRouter from './routers/schoolRouter.js';
import categoryRouter from './routers/categoryRouter.js';
import postRouter from './routers/postRouter.js';

const app = express();
const PORT = 5001;

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/school', schoolRouter);
app.use('/api/category', categoryRouter);
app.use('/api/post', postRouter);

app.get('/', (req, res) => {
    res.send('Teleghnosis Backend Running!');
});

app.listen(PORT, () => {
    console.log(`Server is started on http://localhost:${PORT}`);
});