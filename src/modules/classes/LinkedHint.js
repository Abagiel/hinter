import { HintBlock } from './HintBlock.js';
import { $, objectToCSS, createElement } from '../../utils/functions.js';

export default class LinkedHint extends HintBlock {
	constructor(option) {
		super({
			root: $(option.root) || document.body,
			count: option.count,
			show: option.show,
			hide: option.hide,
			start: option.start,
			end: option.end || option.start
		});
		this.links = option.links;
		this.text = option.text;
		this.styles = option.styles;
		this.mainRoot = $(option.root) || document.body;
		this.mainHide = option.hide;
		this.mainStart = option.start;
		this.mainEnd = option.end || option.start;
		this.current = 0;
		this.countLinksRun = 0;

		this.init();
	}

	init() {
		this.countLinksRun = 1;
		this.createHintBlock(this.text, this.styles);
		this.addTrigger(this.showOption, 'show');
	}

	createHintBlock(text, styles) {
		this.hint = createElement('div', text, 'hinter_hint_block');
		this.hint.setAttribute('style', objectToCSS(styles));
	}

	resetHintBlock() {
		this.current = 0;
		this.countLinksRun++;
		this.hideOption = this.mainHide;
		this.animation.start = this.mainStart;
		this.animation.end = this.mainEnd;
		this.root = this.mainRoot;

		this.createHintBlock(this.text, this.styles);
	}

	isNewRound() {
		if (!this.links[this.current]) {
			this.count = this.countLinksRun;

			if (this.count < this.limit) {
				this.resetHintBlock();
			};
			return false;
		}

		return true;
	}

	hideEnd() {
		if (!this.isNewRound()) return;

		const { text, styles, hide, start, end, root  }  = this.links[this.current];

		this.createHintBlock(text, styles);
		this.hideOption = hide;
		this.animation.start = start;
		this.animation.end = end || start;
		this.root = $(root) || document.body;
		this.addTrigger(0, 'show');
		this.current++;
		this.count = 0;
	}
}