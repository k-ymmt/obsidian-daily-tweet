import {JSX, useEffect, useMemo, useRef, useState} from "react";
import {Box, IconButton, Stack, Typography} from "@mui/material";
import {TweetPostView} from "./TweetPostView";
import MyPlugin from "../../main";
import {getDailyNote} from "../../dailyNotes";
import {parseTweetsBlockFromDailyNote} from "./parseTweetsBlockFromDailyNote";
import moment from "moment";
import {Cached} from "@mui/icons-material";

export type WorkspaceOptions = {
    plugin: MyPlugin,
}

export function TweetView(options: WorkspaceOptions): JSX.Element {
    const getToday = () => moment().startOf('day');
    const {plugin} = options;
    const {app} = plugin;
    const [today, setToday] = useState(getToday());
    const [tweets, setTweets] = useState<Element[]>([]);
    const dailyNote = useMemo(() => {
        return getDailyNote(app, today);
    }, [app, today]);
    useEffect(() => {
        if (dailyNote && plugin.view) {
            parseTweetsBlockFromDailyNote(dailyNote, app, plugin.view).then(nodes => {
                if (nodes) {
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
            <Stack
                direction="row"
                alignItems="center"
            >
                <Typography
                    variant="subtitle1"
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    Tweet View
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        paddingRight: '10px',
                    }}
                >
                    {today.format('LL')}
                </Typography>
                <IconButton
                    sx={{
                        width: '32px',
                        height: '32px',
                    }}
                    onClick={() => {
                        setToday(() => getToday());
                    }}
                >
                    <Cached/>
                </IconButton>
            </Stack>
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
