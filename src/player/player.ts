import path from 'path';
import fs from 'fs';
import { PlayerSchema, PlayerType } from "./playerSchemas";
import { ZodError } from 'zod';

export async function SelectPlayer(playerName: string): Promise<PlayerType | null> {
    const playerDir = path.join(
        'players',
        playerName
    )
    const fullDir = path.join(
        __dirname,
        '..',
        '..',
        playerDir
    );

    // Check for directory
    try {
        fs.accessSync(fullDir);
        console.log(`Player ${playerName}'s directory exists at ${playerDir}.`);
    } catch (error) {
        console.log(`No directory found for ${playerName} at ${playerDir}.`);
        try {
            fs.mkdirSync(fullDir, { recursive: true });
            console.log(`Player ${playerName}'s directory created at ${playerDir}.`);
        } catch (error) {
            console.log(`   Failed to create directory for ${playerName} at ${playerDir}.`);
        }
    }

    const newPlayer = await LoadPlayerData(fullDir, playerName);
    return newPlayer;
}

async function LoadPlayerData(playerDir: string, playerName: string): Promise<PlayerType | null> {
    const playerFile = path.join(playerDir, 'playerData.json');
    console.log(`Looking for player data for player ${playerName}.`);

    // Check for file
    try {
        fs.accessSync(playerFile);
        try {
            const filecontent = fs.readFileSync(playerFile, 'utf-8');
            console.log(`Player data found for ${playerName}.`);
            const playerData = PlayerSchema.parse(JSON.parse(filecontent));
            console.log(`Existing player data validated for ${playerName}`);
            return playerData;
        } catch (error) {
            if (error instanceof ZodError) {
                console.warn(`   Zod validation error with existing player data for ${playerName}:`, error.message);
            } else if (error instanceof SyntaxError) {
                console.warn(`   SyntaxError parsing existing player data for ${playerName}:`, error.message);
            } else {
                console.warn(`   Unknown error with existing player data for ${playerName}:`, error);
            }
            console.log(`Attempting to create new player data for ${playerName} due to issues with existing file.`);
            const newPlayerData = await CreatePlayer(playerName, playerFile);
            console.log('New player data: ' + newPlayerData);
            return newPlayerData;
        }
    } catch (error) {
        // failure at fs.accessSync
        console.log(`No player data file found for ${playerName}. Creating new one.`);
        const newPlayerData = await CreatePlayer(playerName, playerFile);
        return newPlayerData;
    }
}

async function CreatePlayer(playerName: string, playerFile: string): Promise<PlayerType | null> {
    // Add new player
    const newPlayerData: PlayerType = {
        playerName: playerName,
    };

    try {
        const playerData = PlayerSchema.parse(newPlayerData);
    } catch (validationError) {
        return null;
    }
    const jsonData = JSON.stringify(newPlayerData, null, 2);
    try {
        await fs.writeFileSync(playerFile, jsonData);
        console.log(`New player data created for ${playerName} and saved to ${playerFile}.`);
        return newPlayerData;
    } catch (error) {
        console.error(`   Failed to write player data for ${playerName} to ${playerFile}:`, error);
        return null;
    }
}