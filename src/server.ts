import express from 'express';
import {testRouter} from './routes/testRoutes';

const app = express();
const port = 9000;

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});

app.use('/test', testRouter
)