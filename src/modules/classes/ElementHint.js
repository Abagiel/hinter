import { HintBlock } from './HintBlock.js';
import { $, strToArr } from '../../utils/functions.js';

export default class ElementHint extends HintBlock {
	constructor(element) {
		super({
			root: $(element.dataset.hinterRoot) || element.parentElement || document.body,
			count: element.dataset.hinterCount,
			hide: strToArr(element.dataset.hinterHide, ':'),
			show: strToArr(element.dataset.hinterShow, ':'),
			start: element.dataset.hinterStart,
			end: element.dataset.hinterEnd || element.dataset.hinterStart,
			hint: element
		});
		
		this.init();
	}

	init() {
		this.removeBlockFromHTML();
		this.addDefaultClass();
		this.addTrigger(this.showOption, 'show');
	}

	addDefaultClass() {
		!this.hint.className && this.hint.classList.add('hinter_hint_block');
	}

	removeBlockFromHTML() {
		this.hint.remove();
	}
}