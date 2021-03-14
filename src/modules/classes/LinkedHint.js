import { HintBlock } from './HintBlock.js';
import { $, objectToCSS, createElement } from '../../utils/functions.js';
import { getDefaultInstructions } from '../../utils/converters.js';
import { BODY_ROOT } from '../../utils/constants.js';

export default class LinkedHint extends HintBlock {
	constructor(option) {
		super(getDefaultInstructions(option));

		this.links = option.links;
		this.text = option.text;
		this.styles = option.styles;
		this.mainRoot = $(option.root) || BODY_ROOT;
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
		this.hint = createElement('div', text);
		this.hint.setAttribute('style', objectToCSS(styles));
	}

	resetHintBlock() {
		this.current = 0;
		this.countLinksRun++;

		this.changeParentProp('hideOption', this.mainHide)
			  .changeParentProp('root', this.mainRoot)
				.changeAnimationProp('start', this.mainStart)
				.changeAnimationProp('end', this.mainEnd);

		this.createHintBlock(this.text, this.styles);
	}

	isNewRound() {
		if (!this.links[this.current]) {
			this.changeParentProp('count', this.countLinksRun);

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
		this.changeParentProp('hideOption', hide)
				.changeParentProp('root', $(root) || BODY_ROOT)
				.changeAnimationProp('start', start)
				.changeAnimationProp('end', end || start);		
		this.addTrigger(0, 'show');
		
		this.current++;
		this.count = 0;
	}

	changeParentProp(prop, value) {
		this[prop] = value;

		return this;
	}

	changeAnimationProp(prop, value) {
		this.animation[prop] = value;

		return this;
	}
}