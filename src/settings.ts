import {PluginSettingTab, Setting} from "obsidian";
import DailyTweetPlugin from "./main";

const LEAFS = ['left', 'right', 'current'] as const;
type LeafCategory = typeof LEAFS[number];

export type DailyTweetSettings = {
	leaf: LeafCategory,
}

export const DEFAULT_SETTINGS: DailyTweetSettings = {
	leaf: 'right',
}

export class DailyTweetSettingTab extends PluginSettingTab{
	constructor(readonly plugin: DailyTweetPlugin) {
		super(plugin.app, plugin);
	}

	display() {
		const { containerEl } = this;

		containerEl.empty();
		containerEl.createEl('h2', { text: '🕊️ Daily Tweet Settings' });

		new Setting(containerEl)
			.setName('Leaf')
			.setDesc('Show view in leaf')
			.addDropdown(component => {
				component
					.addOptions(Object.fromEntries(LEAFS.map(leaf => [leaf, leaf])))
					.setValue(this.plugin.settings.leaf)
					.onChange(async value => {
						this.plugin.settings.leaf = value as LeafCategory;
						await this.plugin.saveSettings();
						this.plugin.renderView();
					})
			})
	}
}
