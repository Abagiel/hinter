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