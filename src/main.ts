import {Notice, Plugin, View} from 'obsidian';
import {DailyTweetView} from "./DailyTweetView";
import {createDailyTweetCodeBlock} from "./views/codeblock-view/DailyTweetCodeBlockView";
import {DailyTweetSettings, DailyTweetSettingTab, DEFAULT_SETTINGS} from "./settings";

export default class DailyTweetPlugin extends Plugin {
	settings: DailyTweetSettings;
	public view?: DailyTweetView;

	async onload() {
		await this.loadSettings();

		this.registerView(DailyTweetView.VIEW_TYPE, (leaf) => {
			this.view = new DailyTweetView(this, leaf);
			return this.view;
		});

		// This creates an icon in the left ribbon.
		this.addRibbonIcon('pencil', 'Daily Tweet', async (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			await this.openLeaf();
		});

		this.registerMarkdownCodeBlockProcessor('dailyTweet', (source, el) => {
			const div = document.createElement('div');
			createDailyTweetCodeBlock(div, source);
			el.appendChild(div);
		})

		this.addSettingTab(new DailyTweetSettingTab(this));

		if(this.settings.openOnLoad) {
			await this.openLeaf();
		}
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

	async openLeaf() {
		const existed = this.app.workspace.getLeavesOfType(DailyTweetView.VIEW_TYPE).at(0);
		if(existed) {
			await existed.setViewState({ type: DailyTweetView.VIEW_TYPE, active: true });
			return;
		}

		const leaf = (() => {
			const leaf = this.settings.leaf
			switch(leaf) {
				case "right":
					return this.app.workspace.getRightLeaf(false);
				case 'left':
					return this.app.workspace.getLeftLeaf(false);
				case 'current':
					return this.app.workspace.getActiveViewOfType(View)?.leaf
			}
		})()
		if(!leaf) {
			new Notice('Invalid leaf');
			return;
		}

		await leaf.setViewState({
			type: DailyTweetView.VIEW_TYPE,
			active: true,
		})
	}

	renderView() {
		this.view?.updateSettings()
	}
}
