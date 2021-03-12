export function $(selector) {
	return document.querySelector(selector);
}

export function delClass(target, clas) {
	target.classList.remove(clas);
}

export function stopPropagation(e) {
	if (e) e.stopPropagation();
}

export function objectToCSS(obj = {}) {
	return Object
		.entries(obj)
		.map(v => v.join(': '))
		.join(';');
}

function camelToDash(s) {
	return s.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
}

function moveDataFromChildToParent(target) {
	const childData = target.firstElementChild.dataset;

	Object
	  .entries(childData)
	  .forEach(d => target.setAttribute('data-' + camelToDash(d[0]), d[1]));

}

export function wrapper(selector, html) {
	const container = document.createElement(selector);
	container.insertAdjacentHTML('beforeend', html);

	moveDataFromChildToParent(container);

	return container;
}

export function strToArr(str, point) {
	return str.split(point);
}

export function getEventOptions(data) {
	const options = {};
	options.event = data[0];
	options.selector = data[1];

	if (data.length <= 2) return options;

	const keyData = data[2].split('=');

	options.value = keyData;

	return options; 
}

export function eventCondition(e, value) {
	if (!value) return false;

	const key = value[0];

	return handlers[`${key}Handler`](e, value);
}

const handlers = {
	keyHandler(e, value) {
		const val = value[1];

		if (e.key === val) return true;

		return false;
	},
	coordHandler(e, value) {
		const coords = value[1].split(',');
		const x = coords[0].split('-');
		const y = coords[1].split('-');
		const cx = e.clientX;
		const cy = e.clientY;

		if (cx >= x[0] && cx <= x[1] &&
				cy >= y[0] && cy <= y[1]) return true;

		return false;
	}
}