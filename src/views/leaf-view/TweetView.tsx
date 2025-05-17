import {JSX, useEffect, useMemo, useRef, useState} from "react";
import {Box, Stack, Typography} from "@mui/material";
import {App} from "obsidian";
import {TweetPostView} from "./TweetPostView";
import MyPlugin from "../../main";
import {getDailyNote} from "../../dailyNotes";
import {parseTweetsBlockFromDailyNote} from "./parseTweetsBlockFromDailyNote";
import moment from "moment";

export type WorkspaceOptions = {
	plugin: MyPlugin,
}

export function TweetView(options: WorkspaceOptions): JSX.Element {
	const {plugin} = options;
	const {app} = plugin;
	const today = moment().startOf('day');
	const [tweets, setTweets] = useState<Element[]>([]);
	const dailyNote = useMemo(() => {
		return getDailyNote(app, today);
	}, [app, today]);
	useEffect(() => {
		if (dailyNote && plugin.view) {
			parseTweetsBlockFromDailyNote(dailyNote, app, plugin.view).then(nodes => {
				if(nodes) {
					setTweets(nodes)
				}
			})
		}
		return () => {
		}
	}, [dailyNote, plugin.view]);


	return (
		<Stack
			direction="column"
			spacing={2}
			sx={{
				height: "100%",
				paddingBottom: '12px',
			}}
		>
			<Typography component="h2">Tweet View</Typography>
			<Box
				sx={{
					display: "flex",
					flex: 1,
					flexDirection: "column",
					justifyContent: "flex-end",
				}}
			>
				<Stack direction='column' spacing={2}>
					{tweets.map((tweet, i) => {
						return <div key={i} ref={ref => {
							ref?.appendChild(tweet)
						}}></div>
					})}
					<TweetPostView app={app} dailyNote={dailyNote}/>
				</Stack>
			</Box>
		</Stack>
	)
}
