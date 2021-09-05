# ℹ️ About

Easily create your own Discord.js embed paginator with buttons/emoji's, it is also fully customizable!
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

## 🖱️ Buttons

```js
/* Import all the general stuff, you can't do anything without it.. */
const { Client, Intents, MessageEmbed } = require('discord.js');
const paginator = require('@koenie06/discord.js-pagination');
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

            paginator.button({
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

## 😀 Reactions

```js
/* Import all the general stuff, you can't do anything without it.. */
const { Client, Intents, MessageEmbed } = require('discord.js');
const paginator = require('@koenie06/discord.js-pagination');
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
             * 1) Emoji's. A Object with emoji information to customize the emoji's.
             * 2) Timeout. A Integer of the time when the paginator stops.
            */

            const page1 = new MessageEmbed().setTitle('This is page 1')
            const page2 = new MessageEmbed().setTitle('This is page 2')
            const page3 = new MessageEmbed().setTitle('This is page 3')

            paginator.emoji({
                interaction: interaction,
                pages: [page1, page2, page3],
                emojis: {
                    previous: '12345678910',
                    next: '12345678910',
                    stop: '12345678910'
                },
                timeout: 30000
            });

        };
    };
});

client.login('Client token from https://discord.com/developers/applications')
```

## 📃 Menus

```js
/* Import all the general stuff, you can't do anything without it.. */
const { Client, Intents, MessageEmbed } = require('discord.js');
const paginator = require('@koenie06/discord.js-pagination');
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
             * 1) PlaceHolder. A string with the name of the placeholder.
             * 2) Timeout. A Integer of the time when the paginator stops.
            */

            const page1 = new MessageEmbed().setTitle('This is page 1')
            const page2 = new MessageEmbed().setTitle('This is page 2')
            const page3 = new MessageEmbed().setTitle('This is page 3')

            paginator.menu({
                interaction: interaction,
                menus: {
                    pages: [{
                        embed: page1,
                        value: 'Page 1',
                        label: 'Page 1',
                        description: 'Click here to select the first page'
                    },
                    {
                        embed: page2,
                        value: 'Page 2',
                        label: 'Page 2',
                        description: 'Click here to select the second page'
                    },
                    {
                        embed: page3,
                        value: 'Page 3',
                        label: 'Page 3',
                        description: 'Click here to select the third page'
                    }],
                    placeHolder: 'Click here to select a page!'
                },
                timeout: 30000
            });

        };
    };
});

client.login('Client token from https://discord.com/developers/applications')
```
# 📈 Parameters


## 🖱️ Buttons / 😀 Emoji's
| Parameter        | Description                                                                                                                     | Type                                                                                               | Required |
|------------------|---------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|----------|
| interaction      | The interaction you've received from the interactionCreate event.                                                               | [Interaction](https://discord.js.org/#/docs/main/stable/class/Interaction)                         | true     |
| pages            | A array with all the MessageEmbed's                                                                                             | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)    | true     |
| buttons / emojis | A object with the [buttons / emojis options](https://www.npmjs.com/package/@koenie06/discord.js-pagination#extra-options) in it | [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)  | false    |
| timeout          | The time is milliseconds until the collector stops                                                                              | [Integer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | false    |


## 📃 Menu's
| Parameter   | Description                                                                                                         | Type                                                                                               | Required |
|-------------|---------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|----------|
| interaction | The interaction you've received from the interactionCreate event.                                                   | [Interaction](https://discord.js.org/#/docs/main/stable/class/Interaction)                         | true     |
| menus       | A object with the [menu options](https://www.npmjs.com/package/@koenie06/discord.js-pagination#extra-options) in it | [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)  | true     |
| timeout     | The time is milliseconds until the collector stops                                                                  | [Integer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | false    |


<h1 id="extra-options">➕ Extra Options</h1>

## 🖱️ Buttons

| Parameter | Description                | Content                                                                                                                                                                                                                                                                                                              |
|-----------|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| previous  | The 'previous page' button | label: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)<br>style: [MessageButtonStyleResolvable](https://discord.js.org/#/docs/main/stable/typedef/MessageButtonStyleResolvable)<br>Emoji: [Snowflake](https://discord.js.org/#/docs/main/stable/typedef/Snowflake) |
| next      | The 'next page' button     | label: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)<br>style: [MessageButtonStyleResolvable](https://discord.js.org/#/docs/main/stable/typedef/MessageButtonStyleResolvable)<br>Emoji: [Snowflake](https://discord.js.org/#/docs/main/stable/typedef/Snowflake) |
| stop      | The 'stop' button          | label: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)<br>style: [MessageButtonStyleResolvable](https://discord.js.org/#/docs/main/stable/typedef/MessageButtonStyleResolvable)<br>Emoji: [Snowflake](https://discord.js.org/#/docs/main/stable/typedef/Snowflake) |

## 😀 Emoji's

| Parameter | Description      | Type                                                                     |
|-----------|------------------|--------------------------------------------------------------------------|
| previous  | The '◀' reaction | [Snowflake](https://discord.js.org/#/docs/main/stable/typedef/Snowflake) |
| next      | The '▶' reaction | [Snowflake](https://discord.js.org/#/docs/main/stable/typedef/Snowflake) |
| stop      | The '⛔' reaction | [Snowflake](https://discord.js.org/#/docs/main/stable/typedef/Snowflake) |

## 📃 Menu's

| Parameter   | Description                                                                                                                            | Type                                                                                              | Required |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|----------|
| pages       | A array with objects with the [MenuPage options](https://www.npmjs.com/package/@koenie06/discord.js-pagination#menupage-options) in it | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)   | true     |
| placeHolder | A string with the name of the placeholder                                                                                              | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | false    |

<h1 id="menupage-options">➕➕ MenuPage Options</h1>

| Parameter   | Description                  | Type                                                                                              | Required |
|-------------|------------------------------|---------------------------------------------------------------------------------------------------|----------|
| value       | The custom value of the page | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | true     |
| embed       | The MessageEmbed itself      | [MessageEmbed](https://discord.js.org/#/docs/main/stable/class/MessageEmbed)                      | true     |
| label       | The name of the page         | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | true     |
| description | The description of the page  | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | false    |
| emoji       | The custom emoji of the page | [Snowflake](https://discord.js.org/#/docs/main/stable/typedef/Snowflake)                          | false    |


# ❤ Credits

- RaZegame (RaZe#2841) for adding TS support.
- Iliannnn (Ilian#6635) for finetuning the README.

- Koenie06 (Koenie06#9999) for making the package. 🤫