import { HintBlock } from './HintBlocks.js';
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
		this.hint.remove();
		this.addTrigger(this.showOption, 'show');
	}
}