const Discord = require('discord.js-selfbot-v13');
const config = require('./config.json');

config.tokens.forEach(token => {
    const clientInstance = new Discord.Client({
        checkUpdate: false,
    });

    clientInstance.once('ready', () => {
        console.log(`Ready, your selfbot is ready in this account "${clientInstance.user.tag}" | by: vitinnzcx`);

        const names = ['put', 'something', 'here', 'https://github.com/vitinnzcx'];
        let currentIndex = 0;

        const richPresence = new Discord.RichPresence()
            .setApplicationId('PUT YOUR APPLICATION ID HERE')
            .setType('STREAMING')
            .setURL('https://twitch.tv/discord')
            .addButton('Github Developer', 'https://github.com/vitinnzcx')
            .addButton('EDIT THIS', 'https://github.com/vitinnzcx');

        function updatePresence() {
            richPresence
                .setName(names[currentIndex])
                .setDetails(names[currentIndex]);

            currentIndex = (currentIndex + 1) % names.length;

            clientInstance.user.setPresence({ activities: [richPresence] });
        }

        setInterval(updatePresence, 5000);

    });

    clientInstance.login(token).catch(error => {
        console.error(`Error logging in: ${error.message}`);
    });
});
