var $dom = {};
$dom.create = (function(w, doc) {
  function cfrag ()  { return doc.createDocumentFragment() }
  function celem (a) { return doc.createElement(a); }

  // for any selector the sequence is tag*times.class#id > or + tag*times{content}.class#id
  function sel (se) {
    var r,
        out = [],
        rex = /^\s*([>+])?\s*([*\w-]+)?(?:\{(.+)})?(?:#([\w-]+))?(?:\.([\w.-]+))?\s*/;
    for(;se;) {
      r = se.match(rex);
      r[2] = r[2] || "div"
      if(r[2].indexOf("*") > -1) {
        ftag = r[2].split("*")[0];
        n = r[2].split("*")[1];
        while(n) {
          out.push({
            src: r[0],
            rel: r[1],
            tag: ftag,
            txt: r[3],
            id: r[4],
            klaz: r[5] ? r[5].split(".") : ""
          });
          n -= 1;
        }
      } else {
        out.push({
          src: r[0], // the original match
          rel: r[1], // > or +
          tag: r[2], // tagName
          txt: r[3], // innerHTML
          id:  r[4], // id
          klaz: r[5] ? r[5].split(".") : "" // class
        });
      }
      se = se.substr(r[0].length)
    }
    return out;
  }

  //prepare the element with its properties
  function make(props, res) {
    if(props.tag) {
      res = celem(props.tag)
      if (props.klaz) res.className = props.klaz.join(" ")
      if(props.id) res.id = props.id
      if(props.txt) res.innerHTML = props.txt
    }
    return res;
  }

  //create a document fragment , prepare the structure and then add it to the body or any selector
  function dC(se, ct) {
    var selectors = sel(se), elem, frag, n = 1, docfrag = cfrag();
    for(var s in selectors) {
      elem = make(frag = selectors[s])
      switch(frag.rel) {
        case ">" :
          docfrag.lastChild.appendChild(elem);
          break;
        case "+" :
        default  :
          docfrag.appendChild(elem);
          break;
      }
    }
    (doc.querySelector(ct)||doc.body).appendChild(docfrag);
  }
  return dC;
})(window, document);
