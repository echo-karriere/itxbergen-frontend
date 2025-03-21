"use strict";

var React = require('react');
var fract = require('refractor/core.js');
var mapChildren = require('./mapChildren');
var addMarkers = require('./addMarkers');

// eslint-disable-next-line id-length
var h = React.createElement;
function Refractor(props) {
  if (process.env.NODE_ENV !== 'production') {
    if (!fract.registered(props.language)) {
      // eslint-disable-next-line no-console
      console.warn("No language definitions for \"".concat(props.language, "\" seems to be registered, did you forget to call `Refractor.registerLanguage()`?"));
    }
  }
  var langClassName = "language-".concat(props.language);
  var codeProps = {
    className: langClassName
  };
  var preProps = {
    className: [props.className || 'refractor', langClassName].filter(Boolean).join(' ')
  };
  if (props.inline) {
    codeProps.style = {
      display: 'inline'
    };
    codeProps.className = props.className || 'refractor';
  }
  var ast = fract.highlight(props.value, props.language);
  if (props.markers && props.markers.length > 0) {
    ast = addMarkers(ast, {
      markers: props.markers
    });
  }
  var value = ast.length === 0 ? props.value : ast.map(mapChildren.depth(0));
  var code = h('code', codeProps, value);
  return props.inline ? code : h('pre', preProps, code);
}
Refractor.registerLanguage = function (lang) {
  return fract.register(lang);
};
Refractor.hasLanguage = function (lang) {
  return fract.registered(lang);
};
module.exports = Refractor;
//# sourceMappingURL=Refractor.js.map