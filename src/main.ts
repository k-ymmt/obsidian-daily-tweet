import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import {DailyTweetView} from "./DailyTweetView";
import {createRoot, Root} from "react-dom/client";
import {createDailyTweetCodeBlock} from "./views/codeblock-view/DailyTweetCodeBlockView";

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;
	public view?: DailyTweetView;

	async onload() {
		await this.loadSettings();

		this.registerView(DailyTweetView.VIEW_TYPE, (leaf) => {
			this.view = new DailyTweetView(this, leaf);
			return this.view;
		});

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('pencil', 'Daily Tweet', async (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			const existed = this.app.workspace.getLeavesOfType(DailyTweetView.VIEW_TYPE).at(0);
			if(existed) {
				await existed.setViewState({ type: DailyTweetView.VIEW_TYPE, active: true });
				return;
			}

			const leaf = this.app.workspace.getRightLeaf(false);
			if(!leaf) {
				new Notice('Invalid leaf');
				return;
			}

			await leaf.setViewState({
				type: DailyTweetView.VIEW_TYPE,
				active: true,
			})
		});

		this.registerMarkdownCodeBlockProcessor('dailyTweet', (source, el) => {
			const div = document.createElement('div');
			createDailyTweetCodeBlock(div, source);
			el.appendChild(div);
		})
	}

	onunload() {
		this.app.workspace.detachLeavesOfType(DailyTweetView.VIEW_TYPE);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}
