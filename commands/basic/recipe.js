const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class RecipeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'recipe',
            aliases: ['r'],
            group: 'basic',
            memberName: 'recipe',
            description: 'Search for recipes.',
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
        const res = await (await fetch(`https://api.edamam.com/search?q=${search}&app_id=d6f1385f&app_key=8bad6a76df3a71d7717bc9e0cc285d9e&from=0&to=3`)).json();
        for (const hit of res.hits) {
            const recipe = hit.recipe;
            const embed = new MessageEmbed()
                .setTitle(recipe.label)
                .setURL(recipe.url)
                .setColor(0x1c4d91)
                .setThumbnail(recipe.image)
                .setDescription(`
                **For ${recipe.yield} person(s):**
                ${recipe.ingredientLines.join("\n")}`)
                .setFooter("Talan's awesome bot!", "https://media-exp1.licdn.com/dms/image/C560BAQE0N4qKJB0n6A/company-logo_200_200/0/1519856624233?e=2159024400&v=beta&t=fyhExF3lVtUVF9Gmen3xC-GxaZDa1eVWBJsz__45dAE");
            message.channel.send(embed);
            console.log(recipe.ingredients);
        }
    }
};