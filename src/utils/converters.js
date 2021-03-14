import { $, strToArr } from './functions.js';
import { BODY_ROOT } from './constants.js';

export function getDefaultInstructions(option) {
	return {
		root: $(option.root) || BODY_ROOT,
		count: option.count,
		show: option.show,
		hide: option.hide,
		start: option.start,
		end: option.end || option.start
	}
}

export function getElementInstructions(element) {
	const dataset = element.dataset;

	return {
		root: $(dataset.hinterRoot) 
			 || element.parentElement 
			 || BODY_ROOT,
		count: dataset.hinterCount,
		hide: strToArr(dataset.hinterHide, ':'),
		show: strToArr(dataset.hinterShow, ':'),
		start: dataset.hinterStart,
		end: dataset.hinterEnd || dataset.hinterStart,
		hint: element
	}
}