import AnimationBlock from './AnimationBlock.js';
import { $, stopPropagation, objectToCSS, getEventOptions, eventCondition } from '../../utils/functions.js';

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

	show = (value, e) => {
		stopPropagation(e);

		if (this.isVisible) return;
		if (value && !eventCondition(e, value)) return;

		this.root.append(this.hint);
		this.isVisible = true;
		++this.count;
		this.animation.runStart(this.hint);

		this.addTrigger(this.hideOption, 'hide');
	}

	hide = (value, e) => {
		stopPropagation(e);

		if (value && !eventCondition(e, value)) return;

		this.animation.runEnd(this.hint, () => this.hint.remove());
		this.isVisible = false;
		
		this.removeEvents();
	}

	removeEvents() {
		if (this.hideEvent) this.hideEvent();
		if (this.showEvent && this.count >= this.limit) {
			this.showEvent();
		}
	}

	addTrigger(type, method) {
		if (typeof type === 'number') {
			this.actionByTime(this[method], type);
		}

		if (typeof type === 'object') {
			const options = getEventOptions(type);

			this.addEvent(options, this[method], method);
		}
	}

	actionByTime(fn, time) {
		setTimeout(fn, time);
	}

	addEvent({event, selector, value}, fn, type) {
		const target = document.querySelector(selector);

		this[`${type}Event`] = () => target.removeEventListener(event, fn.bind(this, value));
		target.addEventListener(event, fn.bind(this, value));
	}
}