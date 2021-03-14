const elements = Array.from(document.querySelectorAll('[data-hinter-show]'));

export const hints = [
	...elements,
	{
		root: '.con-1',
		count: 2,
		show: ['click', '.cl-5'],
		hide: 1000,
		text: 'Hello, Link',
		start: 'fade',
		styles: {
					background: 'blue',
					left: '10px',
					transform: 'none'
				},
		links: [
			{
				root: '.con-2',
				hide: ['click', '.cl-1'],
				text: 'I am secodn',
				start: 'moveright',
				styles: {
					background: 'tomato',
					left: '20px',
					transform: 'none'
				}
			},
			{
				root: '.con-3',
				hide: ['keydown', 'body', 'key=o'],
				text: 'Previous one is baka!',
				start: 'fade',
				styles: {
					background: 'green',
					top: '10px',
					transform: 'none'
				}
			}
		]
	}
];