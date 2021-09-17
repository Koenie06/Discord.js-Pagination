const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client } = require('../index')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Shows the ping of the bot.'),
	async execute(interaction) {
		
        interaction.reply({ content: `Pong! My ping is ${client.ws.ping}ms!` })

	},
};