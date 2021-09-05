import {
	CommandInteraction,
	Interaction,
	MessageEmbed,
	MessageButtonStyleResolvable,
	Message,
} from 'discord.js';

interface buttonOptions {
	interaction: Interaction | CommandInteraction;
	pages: MessageEmbed[];
	buttons: {
		previous: {
			label: string;
			style: MessageButtonStyleResolvable;
			emoji: string | Snowflake;
		};
		next: {
			label: string;
			style: MessageButtonStyleResolvable;
			emoji: string | Snowflake;
		};
		stop: {
			label: string;
			style: MessageButtonStyleResolvable;
			emoji: string | Snowflake;
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
interface menuPages {
	value: string;
	embed: MessageEmbed;
	label: string;
	description?: string;
	emoji?: string | Snowflake;
}

declare module '@koenie06/discord.js-pagination' {
	declare function button(params: buttonOptions): Promise<void>;
	declare function emoji(params: emojiButtons): Promise<void>;
	export function menuPages(message: Message, pages: menuPages[], timeout: number, placeHolder?: string): Promise<void>;
}
