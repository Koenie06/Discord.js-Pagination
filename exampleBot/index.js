const discord = require("discord.js")
const paginator = require("../index");
const client = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MEMBERS, discord.Intents.FLAGS.GUILD_MESSAGES] });

client.on("ready", () => {
    console.log("Online 😎")
});

client.on("messageCreate", (message) => {
    if (message.content === "!pages") {
        paginator.menuPages(message, [{
            embed: new discord.MessageEmbed().setTitle("First"),
            value: "First",
            label: "First",
            description: "First of embeds",
        },
        {
            embed: new discord.MessageEmbed().setTitle("Second"),
            value: "Second",
            label: "Second",
            description: "Second embed",
        },
        {
            embed: new discord.MessageEmbed().setTitle("Third"),
            value: "Third",
            label: "Third",
            description: "Third embed",
        }
        ], 120 * 1000)
    }
});

client.login("token")