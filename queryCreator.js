HTMLElement.prototype.queryCreator = function(query) {
	var presets = {
		a: '<a href="#">',
		table: '<table></table>',
		html: '<html></html>',
		link: '<link>'
	};

	var regClasses = /(\.[\w-]+)/gi,
		regClass = /\.([\w-]+)/gi,
		regId = /#([\w-]+)/i,
		regTag = /(\w+)/i,
		regHTMLContent = /\{(([^\}]|\\})+)\}/;

	var blockTag = "div",
	blockAttr = {};
	if(regId.test(query))
		var blockId = regId.exec(query)[1];
	if(query.charAt(0) != '#' && query.charAt(0) != ".")
		blockTag = regTag.exec(query)[1]
	if(query.search(regClasses) >= 0) {
		var blockClasses = query.match(regClasses),
		blockClass = "";
		blockClasses.forEach(function(elem) {
			blockClass += regClass.exec(elem)[1]
		});
		blockClass = blockClass.trim();
	}
	if(query.search(regHTMLContent) != -1)
		var blockHTML = query.match(regHTMLContent)[1];

	blockAttr = {id: blockId, class: blockClass, html: blockHTML}
	createHTML(this, blockTag, blockAttr);
}

function createHTML(that, tag, attrs) {
	var dom = document.createElement(tag);
	for(var attr in attrs) {
		if (attr == "class") 
			dom.className = attrs[attr]
		else
			if(attr == "html")
				dom.innerHTML = attrs[attr]
		else
			if(dom[attr] != null)
				dom[attr] = attrs[attr]
	}
	that.appendChild(dom);
}

function outerHTML(node) {
	return node.outerHTML || function (n) {
		var div = document.createElement('div');
		div.appendChild(n.cloneNode(true));
		return div;
	}
}
