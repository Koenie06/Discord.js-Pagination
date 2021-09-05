const { MessageButton, MessageActionRow, Message, MessageSelectMenu } = require('discord.js');
exports.button = async (options = {}) => {

    // Checks

    let { interaction, pages, buttons, timeout } = options;
    if (!interaction || !interaction?.type || interaction?.type !== 'APPLICATION_COMMAND') throw new Error(`INVALID_INTERACTION: There is no valid CommandInteraction provided.`);
    if (!pages || !(pages instanceof Array) || pages?.length <= 1) throw new Error(`INVALID_PAGES: There is no valid pages Array provided, or the Array's length is 0 / 1.`);
    if (!timeout || !Number.isInteger(timeout)) timeout = 60000;

    // Buttons

    const previousButton = new MessageButton()
        .setCustomId('previous')
        .setLabel(buttons?.previous?.label ? buttons?.previous?.label : 'Previous')
        .setStyle(buttons?.previous?.style ? buttons?.previous?.style : 'PRIMARY')
        .setEmoji(buttons?.previous?.emoji ? buttons?.previous?.emoji : '◀');

    const nextButton = new MessageButton()
        .setCustomId('next')
        .setLabel(buttons?.next?.label ? buttons?.next?.label : 'Next')
        .setStyle(buttons?.next?.style ? buttons?.next?.style : 'PRIMARY')
        .setEmoji(buttons?.next?.emoji ? buttons?.next?.emoji : '▶');

    const stopButton = new MessageButton()
        .setCustomId('stop')
        .setLabel(buttons?.stop?.label ? buttons?.stop?.label : 'Stop')
        .setStyle(buttons?.stop?.style ? buttons?.stop?.style : 'DANGER')
        .setEmoji(buttons?.stop?.emoji ? buttons?.stop?.emoji : '⛔');

    const row = new MessageActionRow()
        .addComponents(previousButton, nextButton, stopButton);

    // Starting the paginator

    await pages[0].setFooter(`Page 1/${pages.length}`);
    await interaction.reply({ embeds: [pages[0]], components: [row] });

    const msg = await interaction.fetchReply();

    const filter = m => m;
    const collector = msg.createMessageComponentCollector({ filter, time: timeout });

    // Changing page when button clicked

    let currentPage = 0;
    let stopped = false;

    collector.on('collect', async component => {

        component.deferUpdate();
        if (component.user.id !== interaction.user.id) return;

        if (component.customId === 'previous') {

            if (currentPage === 0) currentPage = pages.length - 1;
            else await currentPage--;

            await pages[currentPage].setFooter(`Page ${currentPage + 1}/${pages.length}`);
            interaction.editReply({ embeds: [pages[currentPage]], components: [row] });

        } else if (component.customId === 'next') {

            if (currentPage === pages.length - 1) currentPage = 0;
            else await currentPage++;

            await pages[currentPage].setFooter(`Page ${currentPage + 1}/${pages.length}`);
            await interaction.editReply({ embeds: [pages[currentPage]], components: [row] });

        } else {

            collector.stop();
            stopped = true;

            await pages[currentPage].setFooter(`Page ${currentPage + 1}/${pages.length}`);
            await interaction.editReply({ embeds: [pages[currentPage]], components: [row.components[0].setDisabled(true), row.components[1].setDisabled(true), row.components[2].setDisabled(true)] });

        };

    });

    // When the time is up, disable the buttons

    collector.on('end', async () => {

        if (stopped === true) return;

        await pages[currentPage].setFooter(`Page ${currentPage + 1}/${pages.length}`);
        await interaction.editReply({ embeds: [pages[currentPage]], components: [row.components[0].setDisabled(true), row.components[1].setDisabled(true), row.components[2].setDisabled(true)] });

    });
};

exports.emoji = async (options = {}) => {

    // Checks

    let { interaction, pages, emojis, timeout } = options;
    return console.log(interaction, pages, emojis, timeout)
    if (!interaction || !interaction?.type || interaction?.type !== 'APPLICATION_COMMAND') throw new Error(`INVALID_INTERACTION: There is no valid CommandInteraction provided.`);
    if (!pages || !(pages instanceof Array) || pages?.length <= 1) throw new Error(`INVALID_PAGES: There is no valid pages Array provided, or the Array's length is 0 / 1.`);
    if (!timeout || !Number.isInteger(timeout)) timeout = 60000;

    // Starting the paginator

    await pages[0].setFooter(`Page 1/${pages.length}`);
    await interaction.reply({ embeds: [pages[0]] });

    const msg = await interaction.fetchReply();

    await msg.react(emojis?.previous ? emojis?.previous : '◀');
    await msg.react(emojis?.next ? emojis?.next : '▶');
    await msg.react(emojis?.stop ? emojis?.stop : '⛔');

    const filter = reaction => [emojis?.previous ? emojis?.previous : '◀', emojis?.next ? emojis?.next : '▶', emojis?.stop ? emojis?.stop : '⛔'].includes(reaction.emoji.name)
    const collector = msg.createReactionCollector({ filter, time: timeout });

    // Changing page when reaction clicked

    let currentPage = 0;

    collector.on('collect', async (reaction, user) => {

        await reaction.message.resolve(reaction.emoji.id).users.remove(user.id);
        if (user.id !== interaction.user.id) return;

        if (reaction.emoji.name === emojis?.previous ? emojis?.previous : '◀') {

            if (currentPage === 0) currentPage = pages.length - 1;
            else await currentPage--;

            await pages[currentPage].setFooter(`Page ${currentPage + 1}/${pages.length}`);
            interaction.editReply({ embeds: [pages[currentPage]] });

        } else if (reaction.emoji.name === emojis?.next ? emojis?.next : '▶') {

            if (currentPage === pages.length - 1) currentPage = 0;
            else await currentPage++;

            await pages[currentPage].setFooter(`Page ${currentPage + 1}/${pages.length}`);
            await interaction.editReply({ embeds: [pages[currentPage]] });

        } else {

            collector.stop();

            await pages[currentPage].setFooter(`Page ${currentPage + 1}/${pages.length}`);
            await interaction.editReply({ embeds: [pages[currentPage]] });

        };

    });
};

exports.menuPages = async (/** @type {Message} */ message, pages, timeout, placeHolder) => {

    const Menu = new MessageSelectMenu()
        .setCustomId("sel_menu_pages")
        .setPlaceholder((placeHolder) ? placeHolder : "Select something!")
        .addOptions(pages);

    const msg = await message.channel.send({ embeds: [pages[0].embed], components: [new MessageActionRow().addComponents(Menu)] }).catch(() => {})
    if(!msg) {
        throw new Error("Sent message was deleted or not sent, or there were duplicate values on some embed pages. No possibility to collect.");
    }
    const col = message.channel.createMessageComponentCollector({ componentType: "SELECT_MENU", filter: (int) => int.user.id === message.author.id, dispose: true, time: timeout, idle: timeout / 2 });
    col.on("collect", async (int) => {
        if (int.isSelectMenu()) {
            for await (const value of int.values) {
                for (const page of pages) {
                    if (page.value === value) {
                        await int.deferUpdate().catch(() => { });
                        await msg.edit({ embeds: [page.embed] });
                        return;
                    } else {
                        continue;
                    }
                }
            }
        }
    });
    col.once("end", async () => {
        const disabledActionrow = new MessageActionRow().addComponents(Menu.setDisabled(true));
        await msg.edit({ embeds: [pages[0].embed], components: [disabledActionrow] }).catch(() => { });
    });
};
