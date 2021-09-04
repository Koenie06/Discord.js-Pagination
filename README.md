# ℹ️ About

Easily create your own Discord.js embed paginator with buttons, it is also fully customizable!
Do you need help? Contact the owner at Discord! Koenie06#9999

<div  align="center">
<p>
<a  href="https://nodei.co/npm/@koenie06/discord-pagination"><img  src="https://nodei.co/npm/@koenie06/discord-pagination.png?downloads=true&stars=true"  alt="NPM info"  /></a>

</p>
</div>

# 📥 Installation

Wait! Before you install, you need..

- Node.js v14+

- Discord.js v13+

After this, you can finally install the package with:
```
$ npm install @koenie06/discord.js-pagination
```

# 📜 Usage

```js
/* Import all the general stuff, you can't do anything without it.. */
const { Client, Intents, MessageEmbed } = require('discord.js');
const pagination = require('@koenie06/discord.js-pagination');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

/* This code will run when the client receives a interaction */
client.on('interactionCreate', async (interaction) => {
    if(interaction.isCommand()) {
        if(interaction.commandName === 'help') {

            /*
             * The function requires atleast 2 items:
             * 1) Interaction. This is used to start the paginator.
             * 2) Pages. A array of all the pages (MessageEmbed's).
             * 
             * There are also some optional items:
             * 1) Buttons. A Object with button information to customize the buttons.
             * 2) Timeout. A Integer of the time when the paginator stops.
            */

            const page1 = new MessageEmbed().setTitle('This is page 1')
            const page2 = new MessageEmbed().setTitle('This is page 2')
            const page3 = new MessageEmbed().setTitle('This is page 3')

            pagination({
                interaction: interaction,
                pages: [page1, page2, page3],
                buttons: {
                    previous: {
                       label: 'Click for previous page',
                       style: 'SUCCES',
                       emoji: '12345678910'
                    },
                    next: {
                        label: 'Click for next page',
                        style: 'SUCCES',
                        emoji: '12345678910'
                    },
                    stop: {
                        label: 'Click to stop',
                        style: 'DANGER',
                        emoji: '12345678910'
                    }
                },
                timeout: 30000
            });

        };
    };
});

client.login('Client token from https://discord.com/developers/applications')
```

# 📈 Parameters

