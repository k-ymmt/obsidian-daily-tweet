import {App, MarkdownRenderer, TFile} from "obsidian";
import {DailyTweetView} from "../../DailyTweetView";
import {TWEET_FOOTER, TWEET_HEADER} from "../../dailyNotes";

export async function parseTweetsBlockFromDailyNote(dailyNote: TFile, app: App, tweetView: DailyTweetView): Promise<Element[] | undefined> {
    const content = await app.vault.adapter.read(dailyNote.path)
    const match = content.match(new RegExp(`${TWEET_HEADER}\s*([\s\S]*?)^${TWEET_FOOTER}`, 'm'));
    if (!match) {
        return undefined;
    }
    const tweetsSection = match[1].trim();
    const div = document.createElement('div');
    await MarkdownRenderer.render(app, tweetsSection, div, dailyNote.path, tweetView)
    const nodes = div.querySelectorAll('.block-language-dailyTweet')
    const result: Element[] = []
    for (let i = nodes.length - 1; i >= 0; i--) {
        result.push(nodes.item(i))
    }
    return result;
}
