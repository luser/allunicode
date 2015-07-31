/*global React */
var codepoints = [];
var all_cp = [];

function load_codepoints() {
  var req = new XMLHttpRequest();
  codepoints = null;

  req.open('GET', '/codepoints.json', true);
  req.responseType = 'json';
  req.onload = function() {
    codepoints = req.response.codepoints;
    build_cp_index();
  };
  req.send();
}

function build_cp_index() {
  all_cp = [];
  for (var r = 0; r < codepoints.length; r++) {
    var row = codepoints[r];
    for (var c = 0; c < row[1].length; c++) {
      all_cp.push({name: row[1][c], codepoint: row[0] + c});
    }
  }
}

function hex(v) {
  var s = v.toString(16).toUpperCase();
  if (s.length >= 4) {
    return s;
  }
  return ('0000' + s).slice(-4);
}

var slug_re = / /g;
var is_local = window.location.hostname == 'localhost';
var SearchResults = React.createClass({
  displayName: 'SearchResults',
  getInitialState: function() {
    return {results: []};
  },
  setSearchResults: function(results) {
    this.setState({results: results});
  },
  render: function() {
    var result_nodes = this.state.results.map(function (r) {
      var key = hex(r.codepoint);
      var slug = `U${key} ${r.name}`;
      var href = '/c/' + slug.replace(slug_re, '_');
      if (is_local) {
        href += '.html';
      }
      return React.DOM.li({key: key},
                          React.DOM.a({href: href}, `U+${key} ${r.name} ${String.fromCodePoint(r.codepoint)}`));
    });
    return React.DOM.ul(null, result_nodes);
  }
});

var SearchBox = React.createClass({
  displayName: 'SearchBox',
  do_search: function(e) {
    var val = e.target.value;
    if (val.length > 2) {
      val = val.toUpperCase();
      var results = all_cp.filter(function(c) { return c.name.indexOf(val) != -1; });
      this.refs.results.setSearchResults(results);
    } else {
      this.refs.results.setSearchResults([]);
    }
  },
  load_cp: function(e) {
    if (codepoints != null && codepoints.length == 0) {
      load_codepoints();
    }
  },
  render: function() {
      return React.createElement('div', null,
                                 'Search: ',
                                 React.createElement('input',
                                                     {type: 'text',
                                                      onChange: this.do_search,
                                                      onFocus: this.load_cp
                                                     }),
                                 React.createElement(SearchResults, {ref: 'results'})
                                );
    }
});

window.addEventListener('DOMContentLoaded', function() {
  React.render(React.createElement(SearchBox),
               document.getElementById('searchbox'));
});

// Always be ready to search from the homepage.
if (window.location.pathname == '/') {
  load_codepoints();
}

