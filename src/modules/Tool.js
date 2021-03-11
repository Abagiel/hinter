import { hintBlock } from '../utils/selectHintBlock.js';

export default class Tool {
	constructor(hints) {
		this.hints = hints;

		this.init();
	}

	init() {
		this.hints.map(hintBlock);
	}
}