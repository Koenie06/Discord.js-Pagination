const { MessageButton, MessageActionRow } = require('discord.js');

module.exports = async( { interaction, pages, buttons, timeout } = {} ) => {

    // Checks

    if(!interaction || !interaction?.type || interaction?.type !== 'APPLICATION_COMMAND') throw new Error(`INVALID_INTERACTION: There is no valid CommandInteraction provided.`);
    if(!pages || !(pages instanceof Array) || pages?.length <= 1) throw new Error(`INVALID_PAGES: There is no valid pages Array provided, or the Array's length is 0 / 1.`);
    if(!timeout || !Number.isInteger(timeout)) timeout = 60000

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
    .addComponents([previousButton, nextButton, stopButton]);

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
        if(component.user.id !== interaction.user.id) return;

        if(component.customId === 'previous') {

            if(currentPage === 0) currentPage = pages.length - 1;
            else await currentPage--;

            await pages[currentPage].setFooter(`Page ${currentPage + 1}/${pages.length}`);
            interaction.editReply({ embeds: [pages[currentPage]], components: [row] });

        } else if(component.customId === 'next') {

            if(currentPage === pages.length - 1) currentPage = 0;
            else await currentPage++;

            await pages[currentPage].setFooter(`Page ${currentPage + 1}/${pages.length}`);
            await interaction.editReply({ embeds: [pages[currentPage]], components: [row] });

        } else {

            collector.stop();
            stopped = true;

            await pages[currentPage].setFooter(`Page ${currentPage + 1}/${pages.length}`);
            await interaction.editReply({ embeds: [pages[currentPage]] });

        };

    });

    // When the time is up, remove the components

    collector.on('end', async () => {

        if(stopped === true) return;

        await pages[currentPage].setFooter(`Page ${currentPage + 1}/${pages.length}`);
        await interaction.editReply({ embeds: [pages[currentPage]], components: [] });
    
    });

};