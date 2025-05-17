import moment from "moment";

export type DailyTweetCodeBlock = {
	tweet: string,
	date: moment.Moment,
}

export function parseDailyTweetCodeBlock(source: string): DailyTweetCodeBlock {
	const lines = source.split('\n');
	const tweet = lines.slice(0, -1);
	const date = moment(lines[lines.length - 1]);
	return {
		tweet: tweet.join('\n'),
		date,
	}
}
