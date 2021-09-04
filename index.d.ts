import {
	CommandInteraction,
	Interaction,
	MessageEmbed,
	MessageButtonStyleResolvable,
} from 'discord.js';

interface buttonOptions {
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

interface emojiButtons {
	interaction: Interaction | CommandInteraction;
	pages: MessageEmbed[];
	emojis: {
		previous: string;
		next: string;
		stop: string;
	};
	timeout: number;
}

declare module '@koenie06/discord.js-pagination' {
	declare function button(params: buttonOptions): Promise<void>;
	declare function emoji(params: emojiButtons): Promise<void>;
}
