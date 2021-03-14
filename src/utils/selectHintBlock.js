import DefaultHint from '../modules/classes/DefaultHint.js';
import ElementHint from '../modules/classes/ElementHint.js';
import LinkedHint from '../modules/classes/LinkedHint.js';
import { wrapper } from './functions.js';

export function hintBlock(hint) {
	if (hint.links) return new LinkedHint(hint);
	if (typeof hint === 'string') return new ElementHint(wrapper('div', hint));
	if (typeof hint === 'object' && hint.tagName) return new ElementHint(hint);
	if (typeof hint === 'object') return new DefaultHint(hint);
}