/* Requiring all the needed stuff for the Command-Handler and client to work. */

const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
module.exports.client = client;

/* Setting every command in the 'commands' folder into the client.commands Collection. */

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.data.name, command);
}

/* This code will run when the client has received a Interaction. */

client.on('interactionCreate', async interaction => {

    /* If it isn't a command, return. */
	if (!interaction.isCommand()) return;

    /* Getting all the setted client's commands that has been set in deploy-commands.js. */
	const command = client.commands.get(interaction.commandName);

    /* If there are no commands, return. */
	if (!command) return;

    /* Try executing the command. If this doesn't work, throw a error. */
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

/* Logging the client in */
client.login(token)