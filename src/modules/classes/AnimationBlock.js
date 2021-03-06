import { delClass } from '../../utils/functions.js';

export default class AnimationBlock {
	constructor(startClass, endClass) {
		this.start = startClass;
		this.end = endClass;
	}

	shouldCancelAnimation(callback) {
		if (!this.start) {
			if (callback) callback();

			return true;
		}
	}

	runStart(target) {
		if (this.shouldCancelAnimation()) return;

		target.style.animationDirection = 'normal';
		target.classList.add(this.start);

		this.observer(target, 'start');
	}

	runEnd(target, callback) {
		if (this.shouldCancelAnimation(callback)) return;

		if (this.end === this.start) {
			target.style.animationDirection = 'reverse';
		}

		target.classList.add(this.end);

		this.observer(target, 'end', callback);
	}

	observer(target, type, fn) {
		target.onanimationend = e => {
			delClass(target, this[type]);

			if (fn) fn();
		}
	}
}