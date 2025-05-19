import {JSX, useMemo} from "react";
import {parseDailyTweetCodeBlock} from "./parseDailyTweetCodeBlock";
import {Box, Card, CardContent, Stack, Typography} from "@mui/material";
import {createRoot, Root} from "react-dom/client";
import {obsidian} from 'foundations';

export function createDailyTweetCodeBlock(container: HTMLElement, source: string): Root {
	const root = createRoot(container);
	root.render(<DailyTweetCodeBlockView source={source} />)
	return root;
}

export type DailyTweetCodeBlockViewOptions = {
	source: string,
}

export function DailyTweetCodeBlockView(options: DailyTweetCodeBlockViewOptions): JSX.Element {
	const codeBlock = useMemo(() => {
		return parseDailyTweetCodeBlock(options.source);
	}, [options.source]);
	return (
		<Card
			sx={{
				backgroundColor: obsidian.var('--background-modifier-hover'),
			}}
		>
			<CardContent>
				<Typography
					variant='body1'
					gutterBottom
					sx={{
						color: obsidian.var('--text-normal'),
						whiteSpace: 'pre-wrap',
					}}
				>
					{codeBlock.tweet}
				</Typography>
				<Typography
					variant='caption'
					sx={{
						color: obsidian.var('--text-muted'),
					}}
				>
					{codeBlock.date.format('LLLL')}
				</Typography>
			</CardContent>
		</Card>
	)
}
