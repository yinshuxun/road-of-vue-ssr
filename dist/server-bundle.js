module.exports =
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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = options.computed || (options.computed = {})
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_create_api__ = __webpack_require__(10);
/* harmony export (immutable) */ __webpack_exports__["a"] = fetchIdsByType;
/* unused harmony export fetchItem */
/* harmony export (immutable) */ __webpack_exports__["b"] = fetchItems;
/* harmony export (immutable) */ __webpack_exports__["c"] = fetchUser;
/* unused harmony export watchList */
// this is aliased in webpack config based on server/client build


// warm the front page cache every 15 min
// make sure to do this only once across all requests
if (__WEBPACK_IMPORTED_MODULE_0_create_api__["a" /* default */].onServer && !__WEBPACK_IMPORTED_MODULE_0_create_api__["a" /* default */].warmCacheStarted) {
  __WEBPACK_IMPORTED_MODULE_0_create_api__["a" /* default */].warmCacheStarted = true
  warmCache()
}

function warmCache () {
  fetchItems((__WEBPACK_IMPORTED_MODULE_0_create_api__["a" /* default */].cachedIds.top || []).slice(0, 30))
  setTimeout(warmCache, 1000 * 60 * 15)
}

function fetch (child) {
  var cache = __WEBPACK_IMPORTED_MODULE_0_create_api__["a" /* default */].cachedItems
  if (cache && cache.has(child)) {
    return Promise.resolve(cache.get(child))
  } else {
    return new Promise(function (resolve, reject) {
      __WEBPACK_IMPORTED_MODULE_0_create_api__["a" /* default */].child(child).once('value', function (snapshot) {
        var val = snapshot.val()
        // mark the timestamp when this item is cached
        if (val) { val.__lastUpdated = Date.now() }
        cache && cache.set(child, val)
        resolve(val)
      }, reject)
    })
  }
}

function fetchIdsByType (type) {
  return __WEBPACK_IMPORTED_MODULE_0_create_api__["a" /* default */].cachedIds && __WEBPACK_IMPORTED_MODULE_0_create_api__["a" /* default */].cachedIds[type]
    ? Promise.resolve(__WEBPACK_IMPORTED_MODULE_0_create_api__["a" /* default */].cachedIds[type])
    : fetch((type + "stories"))
}

function fetchItem (id) {
  return fetch(("item/" + id))
}

function fetchItems (ids) {
  return Promise.all(ids.map(function (id) { return fetchItem(id); }))
}

function fetchUser (id) {
  return fetch(("user/" + id))
}

function watchList (type, cb) {
  var first = true
  var ref = __WEBPACK_IMPORTED_MODULE_0_create_api__["a" /* default */].child((type + "stories"))
  var handler = function (snapshot) {
    if (first) {
      first = false
    } else {
      cb(snapshot.val())
    }
  }
  ref.on('value', handler)
  return function () {
    ref.off('value', handler)
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex_router_sync___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__filters__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__router__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__store__["a"]; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return app; });







// sync the router with the vuex store.
// this registers `store.state.route`
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__["sync"])(__WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__router__["a" /* default */])

// register global utility filters.
Object.keys(__WEBPACK_IMPORTED_MODULE_5__filters__).forEach(function (key) {
  __WEBPACK_IMPORTED_MODULE_0_vue___default.a.filter(key, __WEBPACK_IMPORTED_MODULE_5__filters__[key])
})

// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(Object.assign({}, {router: __WEBPACK_IMPORTED_MODULE_3__router__["a" /* default */],
  store: __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */]},
  __WEBPACK_IMPORTED_MODULE_1__App_vue___default.a))

// expose the app, the router and the store.
// note we are not mounting the app here, since bootstrapping will be
// different depending on whether we are in a browser or on the server.



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__region_1_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__region_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__region_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__region_2_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__region_2_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__region_2_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__region_3_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__region_3_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__region_3_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = {
  data: function data() {
    return {
      msg: 'hello vue',
      currentView: 'region_1'
    }
  },
  methods: {
    choose: function choose(path, event) {
      this.currentView = path
    }
  },
  components: {
    region1: __WEBPACK_IMPORTED_MODULE_0__region_1_vue___default.a,
    region2: __WEBPACK_IMPORTED_MODULE_1__region_2_vue___default.a,
    region3: __WEBPACK_IMPORTED_MODULE_2__region_3_vue___default.a
  }
};


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = {
  data: function data() {
    return {
      msg: 'hello vue'
    }
  }
};


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = {
  data: function data() {
    return {
      msg: 'hello vue'
    }
  }
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = {
  data: function data() {
    return {
      msg: 'hello vue'
    }
  }
};


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["host"] = host;
/* harmony export (immutable) */ __webpack_exports__["timeAgo"] = timeAgo;
function host (url) {
  var host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  var parts = host.split('.').slice(-3)
  if (parts[0] === 'www') { parts.shift() }
  return parts.join('.')
}

function timeAgo (time) {
  var between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_blog_index_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_blog_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__views_blog_index_vue__);




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router___default.a)

/* harmony default export */ __webpack_exports__["a"] = new __WEBPACK_IMPORTED_MODULE_1_vue_router___default.a({
  mode: 'history',
  scrollBehavior: function () { return ({y: 0}); },
  routes: [
    {
      path: '/',
      component: __WEBPACK_IMPORTED_MODULE_2__views_blog_index_vue___default.a
    }
  ]
});


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lru_cache__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lru_cache___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lru_cache__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(2);




var api
var config = {
  databaseURL: 'https://hacker-news.firebaseio.com'
}
var version = '/v0'

if (process.__API__) {
  api = process.__API__
} else {
  __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.initializeApp(config)
  api = process.__API__ = __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.database().ref(version)
  api.onServer = true

  // fetched item cache
  api.cachedItems = __WEBPACK_IMPORTED_MODULE_1_lru_cache___default()({
    max: 1000,
    maxAge: 1000 * 60 * 15 // 15 min cache
  })

  // cache the latest story ids
  api.cachedIds = {}
  ;['top', 'new', 'show', 'ask', 'job'].forEach(function (type) {
    api.child((type + "stories")).on('value', function (snapshot) {
      api.cachedIds[type] = snapshot.val()
    })
  })
}

/* harmony default export */ __webpack_exports__["a"] = api;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(2);




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex___default.a)

var store = new __WEBPACK_IMPORTED_MODULE_1_vuex___default.a.Store({
  state: {
    activeType: null,
    itemsPerPage: 20,
    items: {/* [id: number]: Item */},
    users: {/* [id: string]: User */},
    lists: {
      top: [/* number */],
      new: [],
      show: [],
      ask: [],
      job: []
    }
  },

  actions: {
    // ensure data for rendering given list type
    FETCH_LIST_DATA: function (ref, ref$1) {
      var commit = ref.commit;
      var dispatch = ref.dispatch;
      var state = ref.state;
      var type = ref$1.type;

      commit('SET_ACTIVE_TYPE', { type: type })
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api__["a" /* fetchIdsByType */])(type)
        .then(function (ids) { return commit('SET_LIST', { type: type, ids: ids }); })
        .then(function () { return dispatch('ENSURE_ACTIVE_ITEMS'); })
    },

    // ensure all active items are fetched
    ENSURE_ACTIVE_ITEMS: function (ref) {
      var dispatch = ref.dispatch;
      var getters = ref.getters;

      return dispatch('FETCH_ITEMS', {
        ids: getters.activeIds
      })
    },

    FETCH_ITEMS: function (ref, ref$1) {
      var commit = ref.commit;
      var state = ref.state;
      var ids = ref$1.ids;

      // on the client, the store itself serves as a cache.
      // only fetch items that we do not already have, or has expired (3 minutes)
      var now = Date.now()
      ids = ids.filter(function (id) {
        var item = state.items[id]
        if (!item) {
          return true
        }
        if (now - item.__lastUpdated > 1000 * 60 * 3) {
          return true
        }
        return false
      })
      if (ids.length) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api__["b" /* fetchItems */])(ids).then(function (items) { return commit('SET_ITEMS', { items: items }); })
      } else {
        return Promise.resolve()
      }
    },

    FETCH_USER: function (ref, ref$1) {
      var commit = ref.commit;
      var state = ref.state;
      var id = ref$1.id;

      return state.users[id]
        ? Promise.resolve(state.users[id])
        : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api__["c" /* fetchUser */])(id).then(function (user) { return commit('SET_USER', { user: user }); })
    }
  },

  mutations: {
    SET_ACTIVE_TYPE: function (state, ref) {
      var type = ref.type;

      state.activeType = type
    },

    SET_LIST: function (state, ref) {
      var type = ref.type;
      var ids = ref.ids;

      state.lists[type] = ids
    },

    SET_ITEMS: function (state, ref) {
      var items = ref.items;

      items.forEach(function (item) {
        if (item) {
          __WEBPACK_IMPORTED_MODULE_0_vue___default.a.set(state.items, item.id, item)
        }
      })
    },

    SET_USER: function (state, ref) {
      var user = ref.user;

      __WEBPACK_IMPORTED_MODULE_0_vue___default.a.set(state.users, user.id, user)
    }
  },

  getters: {
    // ids of the items that should be currently displayed based on
    // current list type and current pagination
    activeIds: function activeIds (state) {
      var activeType = state.activeType;
      var itemsPerPage = state.itemsPerPage;
      var lists = state.lists;
      var page = Number(state.route.params.page) || 1
      if (activeType) {
        var start = (page - 1) * itemsPerPage
        var end = page * itemsPerPage
        return lists[activeType].slice(start, end)
      } else {
        return []
      }
    },

    // items that should be currently displayed.
    // this Array may not be fully fetched.
    activeItems: function activeItems (state, getters) {
      return getters.activeIds.map(function (id) { return state.items[id]; }).filter(function (_) { return _; })
    }
  }
})

/* harmony default export */ __webpack_exports__["a"] = store;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(13)();
// imports


// module
exports.push([module.i, ".blog{font-size:.875rem;background-color:#00c4b9;width:100%;min-height:100%;top:0;left:0;position:absolute;color:#fff}.blog .navigation{z-index:100;position:fixed}.blog .content{position:fixed;width:100%;height:100%;top:0;left:0;min-height:100%;padding:1.875rem 1.875rem 3.75rem 5rem;color:#fff}.blog .content .view-description{position:relative;font-size:.875rem;line-height:1rem;text-align:justify}.blog .content .view-title{position:relative;font-weight:500;text-transform:uppercase;display:inline-block;margin:0 1.25rem 0 0}.blog .content .view-description{display:inline-block;font-size:.875rem}@media (min-width:640px){.blog{height:100%}.navigation{top:50%;left:2.5rem;height:5.625rem;width:1.25rem;-ms-transform:translateY(-50%);transform:translateY(-50%)}.navigation .dot{position:relative;display:block;width:1.25rem;height:1.25rem;margin:.625rem 0;border-radius:100%;background-color:#fff;opacity:.65;transition:all .3s ease;cursor:pointer}.content{box-sizing:border-box}.content .view-header{font-size:1.125rem;height:6.25rem;position:relative;white-space:nowrap}.content .view-header .view-title{font-size:3.75rem;height:6.25rem;line-height:6.25rem}.content .region-view{height:100%}.content .view-content{width:100%;height:100%;position:relative;overflow:hidden;padding:110px 0 0;top:-110px;box-sizing:border-box}.content .view-content .view-container{height:100%;overflow-x:scroll;-moz-column-count:100;column-count:100;-moz-column-width:16.25rem;column-width:16.25rem;-moz-column-gap:1.25rem;column-gap:1.25rem}.content .view-content .view-container::-webkit-scrollbar-thumb{border-radius:.625rem;background:currentColor}.content .view-content .view-container::-webkit-scrollbar{width:.375rem;height:.375rem}.content .view-content .view-container::-webkit-scrollbar-track{background:linear-gradient(180deg,transparent,transparent 30%,currentColor 50%,transparent 70%,transparent)}.profile{position:fixed;top:0;width:20rem;padding:1.875rem;box-sizing:border-box;height:100%;right:-11rem;z-index:99}.profile .header{position:relative;height:5.25rem;pointer-events:auto}.profile .header .cover{position:relative;width:5.25rem;height:5.25rem;border-radius:50%;float:left;overflow:hidden;margin:0 1.25rem 0 0}.profile .header .cover img{width:100%;height:100%;-ms-transform:scale(.8);transform:scale(.8);border-radius:100%;transition:all .5s ease;cursor:pointer}.profile .header .cover imghover{-ms-transform:scale(1);transform:scale(1)}.profile .header .cover .cover-background{opacity:.6;background:#fff;border-radius:100%;animation:glow 3s ease infinite;width:100%;height:100%;position:absolute;top:0;z-index:-1}.profile .about{width:5.25rem;text-align:center;font-size:.75rem}}@keyframes glow{0%{transform:scale(.9) opacity(.3)}60%{transform:scale(1) opacity 1}to{transform:scale(.9) opacity(.3)}}", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  null,
  /* template */
  __webpack_require__(20),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(24)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(4),
  /* template */
  __webpack_require__(19),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(5),
  /* template */
  __webpack_require__(23),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(22),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(7),
  /* template */
  __webpack_require__(21),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "blog"
  }, [_c('div', {
    class: {
      'navigation': true
    }
  }, [_c('a', {
    staticClass: "dot",
    on: {
      "click": function($event) {
        _vm.choose('region1', $event)
      }
    }
  }), _c('a', {
    staticClass: "dot",
    on: {
      "click": function($event) {
        _vm.choose('region2', $event)
      }
    }
  }), _c('a', {
    staticClass: "dot",
    on: {
      "click": function($event) {
        _vm.choose('region3', $event)
      }
    }
  })]), _c('div', {
    class: {
      'content': true
    }
  }, [_c(_vm.currentView, {
    tag: "component"
  })], 1), _c('div', {
    class: {
      'profile': true
    }
  }, [_vm._m(0), _vm._m(1)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "header"
  }, [_c('div', {
    staticClass: "cover"
  }, [_c('img', {
    attrs: {
      "src": "data:image/jpeg;base64,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"
    }
  }), _c('div', {
    staticClass: "cover-background"
  })])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "about"
  }, [_c('span', [_vm._v("profile")])])
}]}

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('header', {
    staticClass: "header"
  }), _c('transition', {
    attrs: {
      "name": "fade",
      "mode": "out-in"
    }
  }, [_c('router-view', {
    staticClass: "view"
  })], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "region-view"
  }, [_c('div', {
    staticClass: "view-header"
  }, [_c('div', {
    staticClass: "view-title"
  }, [_vm._v("WORKS")])]), _c('div', {
    staticClass: "view-content"
  }, [_c('div', {
    staticClass: "view-container"
  }, [_c('h1', [_vm._v("Not finished yet :)")])])])])
}]}

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "region-view"
  }, [_c('div', {
    staticClass: "view-header"
  }, [_c('div', {
    staticClass: "view-title"
  }, [_vm._v("Project")])]), _c('div', {
    staticClass: "view-content"
  }, [_c('div', {
    staticClass: "view-container"
  }, [_c('h1', [_vm._v("Not finished yet :)")])])])])
}]}

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "region-view resume-view"
  }, [_c('div', {
    staticClass: "view-header"
  }, [_c('div', {
    staticClass: "view-title"
  }, [_vm._v("yin shuxun (印书勋)")]), _c('span', {
    staticClass: "view-description"
  }, [_vm._v("\n\t\t\t        developer "), _c('br'), _vm._v("\n\t\t\t        Web Developer\n                ")])]), _c('div', {
    staticClass: "view-content"
  }, [_c('div', {
    staticClass: "view-container"
  }, [_c('h1', [_vm._v("姓名")]), _c('h2', [_vm._v("印书勋 ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")]), _c('h1', [_vm._v("Education")]), _c('h2', [_vm._v("suzhou ")]), _c('h2', [_vm._v("Information Science & Electronic Engineering ")]), _c('h3', [_vm._v("2011-2015")])])])])
}]}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(25)("6ba54531", content, true);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var listToStyles = __webpack_require__(26)

module.exports = function (parentId, list, isProduction) {
  if (typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
    var context = __VUE_SSR_CONTEXT__
    var styles = context._styles

    if (!styles) {
      styles = context._styles = {}
      Object.defineProperty(context, 'styles', {
        enumberable: true,
        get () {
          return (
            context._renderedStyles ||
            (context._renderedStyles = renderStyles(styles))
          )
        }
      })
    }

    list = listToStyles(parentId, list)
    if (isProduction) {
      addStyleProd(styles, list)
    } else {
      addStyleDev(styles, list)
    }
  }
}

// In production, render as few style tags as possible.
// (mostly because IE9 has a limit on number of style tags)
function addStyleProd (styles, list) {
  for (var i = 0; i < list.length; i++) {
    var parts = list[i].parts
    for (var j = 0; j < parts.length; j++) {
      var part = parts[j]
      // group style tags by media types.
      var id = part.media || 'default'
      var style = styles[id]
      if (style) {
        style.ids.push(part.id)
        style.css += '\n' + part.css
      } else {
        styles[id] = {
          ids: [part.id],
          css: part.css,
          media: part.media
        }
      }
    }
  }
}

// In dev we use individual style tag for each module for hot-reload
// and source maps.
function addStyleDev (styles, list) {
  for (var i = 0; i < list.length; i++) {
    var parts = list[i].parts
    for (var j = 0; j < parts.length; j++) {
      var part = parts[j]
      styles[part.id] = {
        ids: [part.id],
        css: part.css,
        media: part.media
      }
    }
  }
}

function renderStyles (styles) {
  var css = ''
  for (var key in styles) {
    var style = styles[key]
    css += `<style data-vue-ssr-id="${
      style.ids.join(' ')
    }"${
      style.media ? ` media="${style.media}"` : ''
    }>${style.css}</style>`
  }
  return css
}


/***/ }),
/* 26 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("firebase");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("lru-cache");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("vue-router");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("vuex");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("vuex-router-sync");

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(3);


var isDev = "production" !== 'production'

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
/* harmony default export */ __webpack_exports__["default"] = function (context) {
  var s = isDev && Date.now()

  // set router's location
  __WEBPACK_IMPORTED_MODULE_0__app__["a" /* router */].push(context.url)
  var matchedComponents = __WEBPACK_IMPORTED_MODULE_0__app__["a" /* router */].getMatchedComponents()

  // no matched routes
  if (!matchedComponents.length) {
    return Promise.reject({ code: '404' })
  }

  // Call preFetch hooks on components matched by the route.
  // A preFetch hook dispatches a store action and returns a Promise,
  // which is resolved when the action is complete and store state has been
  // updated.
  return Promise.all(matchedComponents.map(function (component) {
    if (component.preFetch) {
      return component.preFetch(__WEBPACK_IMPORTED_MODULE_0__app__["b" /* store */])
    }
  })).then(function () {
    isDev && console.log(("data pre-fetch: " + (Date.now() - s) + "ms"))
    // After all preFetch hooks are resolved, our store is now
    // filled with the state needed to render the app.
    // Expose the state on the render context, and let the request handler
    // inline the state in the HTML response. This allows the client-side
    // store to pick-up the server-side state without having to duplicate
    // the initial data fetching on the client.
    context.initialState = __WEBPACK_IMPORTED_MODULE_0__app__["b" /* store */].state
    return __WEBPACK_IMPORTED_MODULE_0__app__["c" /* app */]
  })
};


/***/ })
/******/ ]);