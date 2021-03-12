import { delClass } from '../../utils/functions.js';

export default class AnimationBlock {
	constructor(startClass, endClass) {
		this.start = startClass;
		this.end = endClass;
	}

	runStart(target) {
		target.style.animationDirection = 'normal';
		target.classList.add(this.start);

		this.observer(target, 'end');
	}

	runEnd(target, callback) {
		if (this.end === this.start) {
			target.style.animationDirection = 'reverse';
		}

		target.classList.add(this.end);

		this.observer(target, 'end', callback);
	}

	observer(target, type, fn) {
		const ev = `animation${type}`;

		target[`on${ev}`] = e => {
			delClass(target, this[type]);

			if (fn) fn();
		}
	}
}