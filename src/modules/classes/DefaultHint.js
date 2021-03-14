import { HintBlock } from './HintBlock.js';
import { objectToCSS, createElement } from '../../utils/functions.js';
import { getDefaultInstructions } from '../../utils/converters.js';

export default class DefaultHint extends HintBlock {
	constructor(option) {
		super(getDefaultInstructions(option));

		this.text = option.text;
		this.styles = option.styles;

		this.init();
	}

	init() {
		this.createHintBlock();
		this.addTrigger(this.showOption, 'show');
	}

	createHintBlock() {
		this.hint = createElement('div', this.text);
		this.hint.setAttribute('style', objectToCSS(this.styles));
	}
}