import {
	CommandInteraction,
	Interaction,
	MessageEmbed,
	MessageButtonStyleResolvable,
} from 'discord.js';

interface paginationOptions {
	interaction: Interaction | CommandInteraction;
	pages: MessageEmbed[];
	buttons: {
		previous: {
			label: string;
			style: MessageButtonStyleResolvable;
			emoji: Snowflake;
		};
		next: {
			label: string;
			style: MessageButtonStyleResolvable;
			emoji: Snowflake;
		};
		stop: {
			label: string;
			style: MessageButtonStyleResolvable;
			emoji: Snowflake;
		};
	};
	timeout: number;
}

declare module '@koenie06/discord.js-pagination' {
	declare function pagination(params: type): Promise<void>;
}
