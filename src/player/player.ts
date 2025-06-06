import path from 'path';
import fs from 'fs';
import { PlayerSchema, PlayerType } from "./playerSchemas";
import { error } from 'console';
import { ZodError } from 'zod';

export function SelectPlayer(playerName:string): PlayerType | null {
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
    if (fs.existsSync(fullDir)){
        console.log(`Player ${playerName}'s directory exists at ${playerDir}.`);
    } else {
        console.log(`No directory found for ${playerName} at ${playerDir}.`);
        fs.mkdirSync(fullDir);
        if(fs.existsSync(fullDir)){
            console.log(`Player ${playerName}'s directory created at ${playerDir}.`);
        } else {
            console.log(`Failed to create directory for ${playerName} at ${playerDir}.`);
        }
    }
    LoadPlayerData(fullDir,playerName);
    return null;
}

async function LoadPlayerData(playerDir: string, playerName:string) : Promise<PlayerType | null> {
    console.log(`Looking for player data for player ${playerName}`);
    const playerFile = path.join(playerDir, 'playerData.json');

    // Check for file
    if(fs.existsSync(playerFile)){
        try {
            // File found
            console.log(`Player data found for ${playerName}.`);

            // Parsing data
            const playerFileData = fs.readFileSync(playerFile);
            const playerData = await PlayerSchema.parseAsync(playerFileData);

            // Check if data was valid
            if (playerData) {
                console.log(`Existing player data validated for ${playerName}`);
                return playerData;
            } else {
                console.log(`Issues validating existing data for ${playerName}`);
                throw error;
            }
        } catch (error) {
            if(error instanceof ZodError){
                console.log('Zod error with existing player data: ' + error);

            } else {
                console.log('Error with existing player data: ' + error);                
            }
            return null;
        }
    } else {
        // File not found
        console.log(`No player data found for ${playerName}`);
        console.log(`Creating player data for ${playerName}`);

        // Add new player Data
        const newPlayerData : PlayerType = {
            playerName: playerName,
        };
        fs.writeFile(playerFile, JSON.stringify(newPlayerData), (err) => {
            if(err instanceof error || err instanceof ZodError){
                console.log(err);
                throw err;
            }
        });
        console.log(playerFile);
        // Check that file creating was successful
        if (fs.existsSync(playerFile)){ // returns false when it shouldnt
            try {
                // File successfully created
                console.log(`New player data created for ${playerName}.`);
                const playerFileData = fs.readFileSync(playerFile);
                const playerData = PlayerSchema.parseAsync(playerFileData);

                // Check if data was valid
                if (playerData) {
                    console.log(`New player data validated for ${playerName}`);
                    return playerData;
                } else {
                    console.log(`Issues validating new data for ${playerName}`);
                    throw error;
                }
            } catch (error) {
                if(error instanceof ZodError){
                    console.log('Zod error with new player data: ' + error);

                } else {
                    console.log('Error with new player data: ' + error);                
                }
                return null;
            }
        } else {
            console.log(`Player file creation for ${playerName} was unsuccessful.`);
        }
        return null;
    }
}