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
	buttons?: {
		previous?: {
			label?: string;
			style?: MessageButtonStyleResolvable;
			emoji?: string | Snowflake;
		};
		next?: {
			label?: string;
			style?: MessageButtonStyleResolvable;
			emoji?: string | Snowflake;
		};
		stop?: {
			label?: string;
			style?: MessageButtonStyleResolvable;
			emoji?: string | Snowflake;
		};
	};
	timeout?: number;
}

interface emojiOptions {
	interaction: Interaction | CommandInteraction;
	pages: MessageEmbed[];
	emojis?: {
		previous?: string;
		next?: string;
		stop?: string;
	};
	timeout?: number;
}

interface menuPages {
	value: string;
	embed: MessageEmbed;
	label: string;
	description?: string;
	emoji?: string | Snowflake;
}

interface menuOptions {
	interaction: Interaction | CommandInteraction;
	menus: {
		pages: menuPages[],
		placeHolder?: string;
	};
	timeout?: number;	
}

declare module '@koenie06/discord.js-pagination' {
	declare function button(params: buttonOptions): Promise<void>;
	declare function emoji(params: emojiOptions): Promise<void>;
	declare function menu(params: menuOptions): Promise<void>;
}
