import { HintBlock } from './HintBlock.js';
import { getElementInstructions } from '../../utils/converters.js';
import { DEFAULT_CLASS } from '../../utils/constants.js';

export default class ElementHint extends HintBlock {
	constructor(element) {
		super(getElementInstructions(element));
		
		this.init();
	}

	init() {
		this.removeHintTemplateFromHTML();
		this.addDefaultClass();
		this.addTrigger(this.showOption, 'show');
	}

	addDefaultClass() {
		!this.hint.className && this.hint.classList.add(DEFAULT_CLASS);
	}

	removeHintTemplateFromHTML() {
		this.hint.remove();
	}
}