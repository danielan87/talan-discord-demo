const { Command } = require('discord.js-commando');

module.exports = class HelloCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hello',
            aliases: ['hey'],
            group: 'basic',
            memberName: 'hello',
            description: 'Replies with a hello.'
        });
    }

    run(message) {
        return message.say(`Hello ${message.author}!!`);
    }
};