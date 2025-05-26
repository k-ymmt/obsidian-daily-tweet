import {App, TFile} from "obsidian";
import {JSX, KeyboardEvent, useCallback, useState} from "react";
import {addTweetToDailyNote} from "../../dailyNotes";
import {Box, Button, FormControl} from "@mui/material";
import {Textarea} from "@mui/joy";
import {Send} from "@mui/icons-material";
import {obsidian} from "../../foundations";

export type TweetPostViewOptions = {
    app: App,
    dailyNote: TFile | undefined,
}

export function TweetPostView(options: TweetPostViewOptions): JSX.Element {
    const {app, dailyNote} = options;
    const [tweet, setTweet] = useState<string>('');

    const canTweet = dailyNote !== undefined && tweet.trim() !== ''

    const onClick = useCallback(async () => {
        if (!canTweet || !dailyNote) {
            return;
        }
        await addTweetToDailyNote(tweet, dailyNote, app);
        setTweet('');
    }, [tweet, dailyNote])

    async function onTextAreaKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter' && e.ctrlKey) {
            await onClick()
        }
    }

    return (
        <FormControl>
            <Textarea
                variant='soft'
                onChange={(e) => setTweet(e.target.value)}
                sx={{
                    backgroundColor: obsidian.var('--background-primary'),
                    color: obsidian.var('--text-normal'),
                    boxShadow: 'none',
                }}
                placeholder="What's up..."
                minRows={3}
                value={tweet}
                onKeyDown={async (e) => {
                    await onTextAreaKeyDown(e)

                }}
                endDecorator={
                    <Box
                        sx={{
                            display: 'flex',
                            flex: 'auto',
                            gap: 'var(--Textarea-paddingBlock)',
                            pt: 'var(--Textarea-paddingBlock)',
                            borderTop: '1px solid',
                            borderColor: obsidian.var('--background-modifier-border-focus'),
                        }}
                    >
                        <Button
                            variant="contained"
                            startIcon={<Send/>}
                            onClick={onClick}
                            disabled={!canTweet}
                            sx={{
                                ml: 'auto',
                                backgroundColor: obsidian.var('--interactive-accent'),
                                color: obsidian.var('--text-on-accent'),
                            }}
                        >
                            Tweet
                        </Button>
                    </Box>
                }
            />
        </FormControl>
    )
}
