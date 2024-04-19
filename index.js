const fs = require('fs');
const readline = require('readline');
const Discord = require('discord.js-selfbot-v13');
const keepAlive = require('./server.js');

keepAlive();

const client = new Discord.Client({
    checkUpdate: false,
});

const tumadre = [
    'edit . link img',
    'edit me',  
    'edit me',
];

const troll = [
    'edit me',
    'edit me',
];

function createConfigFile(token) {
    const configData = {
        token: token
    };
    fs.writeFileSync('./config.json', JSON.stringify(configData, null, 4));
}

function getTokenFromUserInput() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        rl.question('Enter your Discord token: ', (token) => {
            rl.close();
            resolve(token.trim());
        });
    });
}

async function initializeBot() {
    let token;
    try {
        fs.accessSync('./config.json');
        const config = require('./config.json');
        if (config.token) {
            token = config.token;
        } else {
            throw new Error('Token is missing in config.json');
        }
    } catch (error) {
        if (error.code === 'ENOENT' || error.message === 'Token is missing in config.json') {
            console.log('config.json not found or token is missing. Creating...');
            token = await getTokenFromUserInput();
            createConfigFile(token);
        } else {
            console.error('Error accessing config.json:', error);
            process.exit(1);
        }
    }

    client.once('ready', () => {
        console.clear();
        console.log(`Ready, your selfbot is ready in this account ${client.user.tag} | by: igna`);
        console.log(`Selfbot developed by ignaciosv17blessed`);

        const names = ['ignacioonthebeatz'];
        let currentIndex = 0;
        let currentImageIndex = 0;

        function updatePresence() {
            const real = new Discord.RichPresence()
                .setApplicationId('1225814827419697334')
                .setType('STREAMING')
                .setURL('https://www.youtube.com/watch?v=tMlZgwlxB6M')
                .setState('edit')
                .addButton('edit', 'https://www.youtube.com/watch?v=oh0FyZHZST8&t')
                .addButton('edit', 'put your link')
                .setAssetsSmallImage(troll[currentImageIndex])
                .setAssetsLargeImage(tumadre[currentImageIndex]);

            real
                .setName(names[currentIndex])
                .setDetails(names[currentIndex]);

            currentIndex = (currentIndex + 1) % names.length;
            currentImageIndex = (currentImageIndex + 1) % tumadre.length;

            client.user.setPresence({ activities: [real], status: "dnd" });
        }

        setInterval(updatePresence, 2500);
    });

    client.login(token).catch(error => {
        console.error(`Error logging in: ${error.message}`);
    });
}

initializeBot();
