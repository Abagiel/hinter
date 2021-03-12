import { HintBlock } from './HintBlocks.js';
import { $, objectToCSS } from '../../utils/functions.js';

export default class DefaultHint extends HintBlock {
	constructor(option) {
		super({
			root: $(option.root) || document.body,
			count: option.count,
			show: option.show,
			hide: option.hide,
			start: option.start,
			end: option.end || option.start
		});

		this.text = option.text;
		this.styles = option.styles;

		this.init();
	}

	init() {
		this.createHintBlock();
		this.addTrigger(this.showOption, 'show');
	}

	createHintBlock() {
		this.hint = document.createElement('div');
		this.hint.textContent = this.text;
		this.hint.className = 'hinter_hint_block';
		this.hint.setAttribute('style', objectToCSS(this.styles));
	}
}