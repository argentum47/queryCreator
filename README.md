$dom.js
==============
Full implementation for creating html tags with css selector. The sequence for making a valid dom is:

> child-selector tagname number_of_times {content} id class

Example:

```javascript
$dom.create("ul#myid.foo>li*5{foobar}.bar")
```

Would produce

```html
<ul id="myid" class="foo">
  <li class="bar">foobar</li>
  <li class="bar">foobar</li>
  <li class="bar">foobar</li>
  <li class="bar">foobar</li>
  <li class="bar">foobar</li>
</ul>
```


queryCreator.js
============
version 1:
simple functionality, have a tag with a class id and contentt

Example: document.body.queryCreator("div.foobar{hey there!}")
