type ObsidianBaseColorVariable = '--color-base-00'
    | '--color-base-05'
    | '--color-base-10'
    | '--color-base-20'
    | '--color-base-25'
    | '--color-base-30'
    | '--color-base-35'
    | '--color-base-40'
    | '--color-base-50'
    | '--color-base-60'
    | '--color-base-70'
    | '--color-base-100'

type ObsidianAccentColorVariable = '--accent-h' | '--accent-s' | '--accent-l'

type ObsidianTextColorVariable = '--text-normal'
    | '--text-muted'
    | '--text-faint'
    | '--text-on-accent'
    | '--text-on-accent-inverted'
    | '--text-success'
    | '--text-warning'
    | '--text-error'
    | '--text-accent'
    | '--text-accent-hover'

type ObsidianBackgroundColorVariable =
    | '--background-primary'
    | '--background-primary-alt'
    | '--background-secondary'
    | '--background-secondary-alt'
    | '--background-modifier-hover'
    | '--background-modifier-active-hover'
    | '--background-modifier-border'
    | '--background-modifier-border-hover'
    | '--background-modifier-border-focus'
    | '--background-modifier-error-rgb'
    | '--background-modifier-error'
    | '--background-modifier-error-hover'
    | '--background-modifier-success-rgb'
    | '--background-modifier-success'
    | '--background-modifier-message'
    | '--background-modifier-form-field';

type ObsidianInteractiveColorVariable =
    | '--interactive-normal'
    | '--interactive-hover'
    | '--interactive-accent'
    | '--interactive-accent-hsl'
    | '--interactive-accent-hover'

type ObsidianTextBackgroundColorVariable =
    | '--text-selection'
    | '--text-highlight-bg'

type ObsidianColorVariable = ObsidianBaseColorVariable
    | ObsidianAccentColorVariable
    | ObsidianTextColorVariable
    | ObsidianBackgroundColorVariable
    | ObsidianInteractiveColorVariable
    | ObsidianTextBackgroundColorVariable;

export const obsidian = {
    var(variable: ObsidianColorVariable): string {
        return `var(${variable})`;
    }
}
