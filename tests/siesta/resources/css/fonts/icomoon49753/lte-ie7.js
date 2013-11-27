/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-file' : '&#xe000;',
			'icon-screen' : '&#xe001;',
			'icon-bug' : '&#xe002;',
			'icon-search' : '&#xe003;',
			'icon-play' : '&#xe004;',
			'icon-loop' : '&#xe005;',
			'icon-folder' : '&#xe006;',
			'icon-folder-open' : '&#xe007;',
			'icon-close' : '&#xe008;',
			'icon-file-2' : '&#xe009;',
			'icon-checkmark' : '&#xe00a;',
			'icon-busy' : '&#xe00b;',
			'icon-lightning' : '&#xe00c;',
			'icon-flag' : '&#xe00d;',
			'icon-forward' : '&#xe00e;',
			'icon-cog' : '&#xe00f;',
			'icon-bars' : '&#xe010;',
			'icon-bars-2' : '&#xe011;',
			'icon-book' : '&#xe012;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};