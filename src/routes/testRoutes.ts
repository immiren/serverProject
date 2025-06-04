import express from 'express';

export const testRouter = express.Router();

testRouter.get('/', (req, res) => {
    console.log('Test successful! Good job :)');
    res.send('Test done!');
})