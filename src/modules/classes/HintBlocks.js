import AnimationBlock from './AnimationBlock.js';
import { $, stopPropagation, objectToCSS } from '../../utils/functions.js';

export class HintBlock {
	constructor(option) {
		this.root = option.root;
		this.hideOption = option.hide;
		this.showOption = option.show;
		this.animation = new AnimationBlock(option.start, option.end);
		this.hint = option.hint;
		this.limit = option.count || Infinity;
		this.count = 0;
		this.isVisible = false;
		this.hideEvent = null;
		this.showEvent = null;
	}

	show = (e) => {
		stopPropagation(e);

		if (this.isVisible) return;

		this.root.append(this.hint);
		this.animation.runStart(this.hint);
		this.isVisible = true;
		++this.count;

		this.addTrigger(this.hideOption, 'hide');
	}

	hide = (e) => {
		stopPropagation(e);

		this.animation.runEnd(this.hint, () => this.hint.remove());
		this.isVisible = false;
		
		if (this.hideEvent) this.hideEvent();
		if (this.showEvent && this.count >= this.limit) {
			this.showEvent();
		}
	}

	addTrigger(type, method) {
		type = isNaN(+type) ? type : +type;

		if (typeof type === 'number') {
			this.actionByTime(this[method], type);
		}
		if (typeof type === 'string') {
			const ev = type.split(':')[0];
			const selector = type.split(':')[1];

			this.addEvent(ev, selector, this[method], method);
		}
		if (typeof type === 'object') {
			this.addEvent(type[0], type[1], this[method], method);
		}
	}

	actionByTime(fn, time) {
		setTimeout(fn, time);
	}

	addEvent(ev, selector, fn, type) {
		const target = document.querySelector(selector);

		this[`${type}Event`] = () => target.removeEventListener(ev, fn);
		target.addEventListener(ev, fn);
	}
}