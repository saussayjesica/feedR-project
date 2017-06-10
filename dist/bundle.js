/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _state;

	var _math = __webpack_require__(1);

	var _math2 = _interopRequireDefault(_math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	console.log((0, _math.add)(1, 2));
	console.log((0, _math.subtract)(4, 2));
	console.log((0, _math2.default)());

	var app = document.querySelector('#app');

	var state = (_state = {
	  source: 'mashable',
	  loading: false,
	  popup: false,
	  articles: [{
	    image: '',
	    title: '',
	    theme: '',
	    impressions: '',
	    summary: '',
	    link: '',
	    selected: ''
	  }]
	}, _defineProperty(_state, 'source', 'digg'), _defineProperty(_state, 'loading', false), _defineProperty(_state, 'popup', false), _defineProperty(_state, 'articles', [{
	  image: '',
	  title: '',
	  theme: '',
	  impressions: '',
	  summary: '',
	  link: '',
	  selected: ''
	}]), _state);

	function fetchUrl(url) {
	  return fetch('https://accesscontrolalloworiginall.herokuapp.com/' + url);
	}

	function fetchMashableArticles() {
	  state.loading = true;
	  return fetchUrl('http://mashable.com/stories.json').then(function (res) {
	    return res.json();
	  }).then(function (data) {
	    state.loading = false;
	    return data.new.map(function (article) {
	      return {
	        image: article.feature_image,
	        title: article.display_title,
	        theme: article.channel,
	        impressions: article.formatted_shares,
	        summary: article.excerpt,
	        link: article.short_url,
	        selected: false
	      };
	    });
	  });
	}

	function fetchDiggArticles() {
	  state.loading = true;
	  return fetchUrl('http://digg.com/api/news/popular.json').then(function (res) {
	    return res.json();
	  }).then(function (data) {
	    state.loading = false;
	    return data.data.feed.map(function (article) {
	      return {
	        image: article.content.media.images[0].url,
	        title: article.content.title,
	        theme: article.content.tags[0].name,
	        impressions: article.diggs.count,
	        summary: article.content.description,
	        link: article.content.url,
	        selected: false
	      };
	    });
	  });
	}

	function fetchRedditArticles() {
	  state.loading = true;
	  return fetchUrl('https://www.reddit.com/top.json').then(function (res) {
	    return res.json();
	  }).then(function (data) {
	    state.loading = false;
	    return data.data.children.map(function (article) {
	      return {
	        image: article.data.thumbnail,
	        title: article.data.title,
	        theme: article.data.subreddit,
	        impressions: article.data.num_comments,
	        summary: article.data.title,
	        link: article.data.url,
	        selected: false
	      };
	    });
	  });
	}

	function fetchArticles(source) {
	  if (source === 'digg') {
	    return fetchDiggArticles();
	  }
	}

	fetchArticles(state.source).then(function (articles) {
	  return state.articles = articles;
	}).then(function () {
	  return render(app, state);
	});

	function renderLoader() {
	  return '\n    <img src="./images/ajax_loader.gif" />\n  ';
	}

	function renderArticles(articles) {
	  return articles.map(function (article) {
	    return '\n    <article class="article">\n      <section class="featuredImage">\n        <img src="' + article.image + '" alt="" />\n      </section>\n      <section class="articleContent">\n          <a href="#"><h3>' + article.title + '</h3></a>\n          <h6>' + article.theme + '</h6>\n      </section>\n      <section class="impressions">\n        ' + article.impressions + '\n      </section>\n      <div class="clearfix"></div>\n    </article>\n  ';
	  }).join('\n');
	}

	function render(container, data, fn) {
	  container.innerHTML = '\n  <header>\n    <section class="container">\n      <a href="#"><h1>Feedr</h1></a>\n      <nav>\n        <ul>\n          <li><a href="#">News Source: <span>Source Name</span></a>\n            <ul>\n                <li><a href="#">Source 1</a></li>\n                <li><a href="#">Source 2</a></li>\n                <li><a href="#">Source 3</a></li>\n            </ul>\n          </li>\n        </ul>\n        <section id="search">\n          <input type="text" name="name" value="">\n          <a href="#"><img src="images/search.png" alt="" /></a>\n        </section>\n      </nav>\n      <div class="clearfix"></div>\n    </section>\n  </header>\n  <section id="main" class="container">\n    ' + fn + '\n    ' + (data.loading ? renderLoader() : renderArticles(data.articles)) + '\n\n  </section>\n  ';
	}

	function popUpDisplay(article) {
	  return '\n  <div id="popUp" class= ' + (!article.selected ? "loader hidden" : "") + '>\n    <a href="#" class="closePopUp">X</a>\n    <div class="container">\n      <h1>' + article.title + '</h1>\n      <p>\n        ' + article.summary + '\n      </p>\n      <a href="' + article.url + '" class="popUpAction" target="_blank">Read more from source</a>\n    </div>\n  </div>\n  ';
	}

	delegate('body', 'click', '.article', function (event) {
	  state.articles.forEach(function (article) {
	    if (article.title === event.target.innerText) {
	      var popUpArticle = article;
	      !popUpArticle.selected ? popUpArticle.selected = true : popUpArticle.selected = false;
	      render(app, state, popUpDisplay(popUpArticle));
	    }
	    return;
	  });
	});

	delegate('body', 'click', '.closePopUp', function (event) {
	  state.articles.forEach(function (article) {
	    if (article.selected === true) {
	      var closeArticle = article;
	      closeArticle.selected = false;
	      render(app, state, popUpDisplay(closeArticle));
	    }
	    return;
	  });
	});

	render(app, state);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.add = add;
	exports.subtract = subtract;
	exports.default = math;
	function add(x, y) {
	  return x + y;
	}

	function subtract(x, y) {
	  return x - y;
	}

	function math() {
	  console.log('math is fun');
	}

/***/ })
/******/ ]);