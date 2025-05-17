import {App, IconName, ItemView, WorkspaceLeaf} from 'obsidian';
import { createRoot, Root } from 'react-dom/client'
import {TweetView} from "./views/leaf-view/TweetView";
import MyPlugin from "./main";

export class DailyTweetView extends ItemView {
	static VIEW_TYPE = 'daily-twitter-view';

	private root?: Root;

	constructor(readonly plugin: MyPlugin, leaf: WorkspaceLeaf) {
		super(leaf);
	}

    getIcon(): IconName {
        return 'pencil';
    }

    getViewType(): string {
        return DailyTweetView.VIEW_TYPE;
    }

	getDisplayText(): string {
		return "Daily Tweet";
	}

	async onOpen() {
		this.root = createRoot(this.containerEl.children[1]);
		this.root.render(<TweetView app={this.plugin.app} plugin={this.plugin} />);
	}

	async onClose() {
		this.root?.unmount();
		this.root = undefined;
	}
}
