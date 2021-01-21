const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class BitcoinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bitcoin',
            aliases: ['btc'],
            group: 'advanced',
            memberName: 'bitcoin',
            description: 'Retrieve Bitcoin rate.'
        });
    }

    async run(message) {
        const res = await (await fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`)).json();
        message.say(`$${res.bpi.USD.rate}`);
    }
};