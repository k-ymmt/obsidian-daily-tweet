import {App, normalizePath, TFile} from "obsidian";
import moment from 'moment'

const DEFAULT_DAILY_NOTE_FORMAT = 'YYYY-MM-DD';
const TWEET_HEADER = '## Tweets\n'

export type DailyNoteOptions = {
	folder: string,
	format: string,
	template?: string,
}

type DailyNotePlugin = {
	instance?: {
		options?: Partial<DailyNoteOptions>
	}
}

type InternalPlugins = {
	getPluginById(id: 'daily-notes'): DailyNotePlugin | undefined
}

export function getDailyNote(app: App, date: moment.Moment): TFile | undefined {
	const options = getDailyNoteOptions(app)
	if(!options) {
		return  undefined;
	}
	const { folder, format } = options;

	const file = (() => {
		const target = date.format(format ?? DEFAULT_DAILY_NOTE_FORMAT);
		const path = normalizePath(`${folder}/${target}.md`);
		const abstractFile = app.vault.getAbstractFileByPath(path);
		if(abstractFile && abstractFile instanceof  TFile) {
			return abstractFile;
		} else {
			return undefined;
		}
	})()
	if(!file) {
		return undefined;
	}

	return file
}

export function getDailyNoteOptions(app: App): DailyNoteOptions | undefined {
	const { internalPlugins } = app as any
	const options = (<InternalPlugins>internalPlugins)
		.getPluginById('daily-notes')
		?.instance
		?.options;

	return {
		folder: '.',
		format: DEFAULT_DAILY_NOTE_FORMAT,
		...options,
	}
}

export async function addTweetToDailyNote(tweet: string, dailyNote: TFile, app: App) {
	let content = await app.vault.adapter.read(dailyNote.path);
	let headerIndex = content.indexOf(TWEET_HEADER);
	if (headerIndex < 0) {
		content = `${content}\n${TWEET_HEADER}\n---\n`;
		headerIndex = content.indexOf(TWEET_HEADER);
	}
	const insertIndex = headerIndex + TWEET_HEADER.length;
	const post = `\n\`\`\`dailyTweet\n${tweet}\n${moment().toISOString()}\n\`\`\`\n`
	content = content.slice(0, insertIndex) + post + content.slice(insertIndex);

	await app.vault.adapter.write(dailyNote.path, content)
}
