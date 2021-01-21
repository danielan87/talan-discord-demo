const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class CocktailCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cocktail',
            aliases: ['ct'],
            group: 'advanced',
            memberName: 'cocktail',
            description: 'Search for cocktail recipes.',
            args: [
                {
                    key: 'search',
                    prompt: 'Please provide a search term',
                    type: 'string',
                },
            ]
        });
    }

    async run(message, { search }) {
        const res = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)).json();
        if (!res.drinks || !res.drinks.length) {
            return message.say(`Could not find cocktail recipe ${search}.`);
        }
        const drink = res.drinks[0];
        let description = "```Ingredients:\n";
        let index = 1;
        do {
            description += "- " + drink[`strMeasure${index}`] + " of " + drink[`strIngredient${index}`] + "\n";
            index++;
        } while (drink[`strIngredient${index}`]);
        description += "```\n";
        description += "```\n" + drink.strInstructions + "```";
        const embed = new MessageEmbed()
            .setTitle(drink.strDrink)
            .setURL(drink.strVideo)
            .setColor(0x1c4d91)
            .setThumbnail(drink.strDrinkThumb)
            .setDescription(description);
        message.channel.send(embed);
    }
};