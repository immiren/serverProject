import express from 'express';
import {StartGame} from '../game';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('Test successful! Good job :)');
    res.send('Test done!');
})

router.get('/:playerName', async (req, res) => {
    const playerName = req.params.playerName;

    console.log('-----------------------------------------------------');
    console.log(`Logging in as ${playerName}.`);
    await StartGame(playerName);
    console.log('-----------------------------------------------------');
    res.send('gamign');
})

export default router;

// test curls
// curl http://localhost:9000/immiihh