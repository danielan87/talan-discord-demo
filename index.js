const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const client = new CommandoClient({
    commandPrefix: '!',
    owner: '334754455616618499',
    invite: 'https://discord.gg/bRCvFy9',
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['basic', 'Basic Commands'],
        ['advanced', 'Advanced Commands'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('with Commando');
});

client.on('error', console.error);

client.login('ODAxNjU1NTA3NDU3ODAyMjUw.YAj13w.KxHQ6WWViFxD0qimlZLpdsObqnE');