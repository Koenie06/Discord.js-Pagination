const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const pagination = require('@koenie06/discord.js-pagination');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Shows the ping of the bot.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('button')
                .setDescription('Display\'s the help cmd with button paginator'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('emoji')
                .setDescription('Display\'s the help cmd with emoji paginator'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('menu')
                .setDescription('Display\'s the help cmd with menu paginator')),
	async execute(interaction) {
		
        /* Getting the subcommand that has been picked */
        const subcommand = interaction.options.getSubcommand();

        /* Making all help pages (MessageEmbed's) where the paginator will be used for */
        const embed1 = new MessageEmbed().setTitle(`This is the first help page!`);
        const embed2 = new MessageEmbed().setTitle(`This is the second help page!`);
        const embed3 = new MessageEmbed().setTitle(`This is the third help page!`);
        const embeds = [embed1, embed2, embed3];

        /* If the user picked the subcommand 'button', activate the button paginator! */
        if(subcommand === 'button') {

            /* Get more info about how the button paginator works at https://npmjs.com/package/@koenie06/discord.js-pagination */
            pagination.button({
                interaction: interaction,
                pages: embeds,
                timeout: 30000,
                buttons: {
                    previous: {
                        label: 'Click to view the previous page',
                        style: 'SUCCESS',
                        emoji: '⏮'
                    },
                    next: {
                        label: 'Click to view the next page',
                        style: 'SUCCESS',
                        emoji: '⏭'
                    },
                    stop: {
                        label: 'Click here to stop',
                        style: 'DANGER',
                        emoji: '❌'
                    },
                },
            });
            
        } else if(subcommand === 'emoji') {

            /* Get more info about how the emoji paginator works at https://npmjs.com/package/@koenie06/discord.js-pagination */
            pagination.emoji({
                interaction: interaction,
                pages: embeds,
                timeout: 30000,
                emojis: {
                    previous: '⏮',
                    next: '⏭',
                    stop: '❌'
                },
            });

        } else {

            /* Get more info about how the menu paginator works at https://npmjs.com/package/@koenie06/discord.js-pagination */
            pagination.menu({
                interaction: interaction,
                timeout: 30000,
                menus: {
                    placeHolder: 'Click here to select a page!',
                    pages: [{
                        embed: embed1,
                        value: 'Page 1',
                        label: 'Page 1',
                        description: 'Click here to select the first page'
                    },
                    {
                        embed: embed2,
                        value: 'Page 2',
                        label: 'Page 2',
                        description: 'Click here to select the second page'
                    },
                    {
                        embed: embed3,
                        value: 'Page 3',
                        label: 'Page 3',
                        description: 'Click here to select the third page'
                    }],
                },
            });

        };
	},
};