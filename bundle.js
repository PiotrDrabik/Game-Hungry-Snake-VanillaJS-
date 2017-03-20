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
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(2);

	(function () {
		var snake = [{ 'top': 200, 'left': 400 }],
		    pts = [{ 'top': 100, 'left': 200, 'type': 'green' }],
		    size = 20,
		    points = Number(0),
		    snakebody = document.querySelectorAll(".snakepart"),
		    counter = document.querySelector("#counter"),
		    body = document.querySelector("body"),
		    head = document.querySelector("#bggame>div:first-child"),
		    tleft = document.querySelector("#tleft"),
		    tright = document.querySelector("#tright"),
		    tup = document.querySelector("#up"),
		    tdown = document.querySelector("#down"),
		    snakecolor = '#000000',
		    speed = 100,
		    curtop = 32,
		    curleft = 26,
		    direc = {
			'ver': -1,
			'hor': -1,
			'vertail': 0,
			'hortail': 0
		};
		function wall(top, left, snakepoz) {
			if (snakepoz[0].top <= curtop + 8 || snakepoz[0].top >= curtop + 388) {
				if (snakepoz[0].top <= curtop + 8) {
					snakepoz[0].top = curtop + 387;
				} else if (snakepoz[0].top >= curtop + 388) {
					snakepoz[0].top = curtop + 9;
				}
			};
			if (snakepoz[0].left <= curleft + 8 || snakepoz[0].left >= curleft + 788) {
				if (snakepoz[0].left <= curleft + 8) {
					snakepoz[0].left = curleft + 787;
				}
				if (snakepoz[0].left >= curleft + 788) {
					snakepoz[0].left = curleft + 9;
				}
			};
		}
		function movehead(snake) {
			snake[0].top = snake[0].top - direc.ver * 5;
			snake[0].left = snake[0].left - direc.hor * 5;
			wall(snake[0].top, snake[0].left, snake);
			snakebody[0].style.top = snake[0].top + 'px';
			snakebody[0].style.left = snake[0].left + 'px';
		}
		function snakemove(snake) {
			setInterval(function () {
				for (var i = snake.length - 1; i > 0; i--) {
					snake[i].top = snake[i - 1].top;
					snake[i].left = snake[i - 1].left;
					wall(snake[i].top, snake[i].left, snake);
					snakebody[i].style.top = snake[i].top + 'px';
					snakebody[i].style.left = snake[i].left + 'px';
				}
				movehead(snake);
				checkcoin();
			}, speed);
		}

		function checkarea(top, left, size) {
			var newarray = { 'top': top, 'bottom': top + size, 'left': left, 'right': left + size };
			return newarray;
		}
		function headcolour(colour) {
			head.style.backgroundColor = colour;
			setTimeout(function () {
				head.style.backgroundColor = snakecolor;
			}, 100);
		}
		function removecoin(index, pts) {
			pts.splice(index, 1);
			$(".coin").remove();
			for (var j in pts) {
				$('#bggame').append('<div class="coin" style="top: ' + pts[j].top + 'px; left: ' + pts[j].left + 'px; background-color: ' + pts[j].type + ';"></div>');
			}
			headcolour('lightgreen');
			addtail();
			addtail();
			points += 10;
			//snakemove(snake, size);
			if (points % 100 == 0) {
				speed += 20;
				snakemove(snake, size);
			};
			counter.innerHTML = 'Result: ' + points + ' | speed: ' + Math.floor(speed / 20);
		}
		function checkcoin() {
			var tarray = void 0,
			    temparray2 = void 0;
			tarray = checkarea(snake[0].top, snake[0].left, 20);
			for (var i in pts) {
				temparray2 = checkarea(pts[i].top, pts[i].left, 15);
				if (tarray.top <= temparray2.top && tarray.bottom >= temparray2.top && tarray.left <= temparray2.left && tarray.right >= temparray2.left || tarray.top <= temparray2.bottom && tarray.bottom >= temparray2.bottom && tarray.left <= temparray2.right && tarray.right >= temparray2.right) {
					if (pts[i].type == 'red') {
						points -= 5;
						counter.innerHTML = 'Result: ' + points + ' | speed: ' + Math.floor(speed / 20);
						headcolour('orangered');
						break;
					} else {
						removecoin(i, pts);
					}
				}
			}
		}
		function placecoin() {
			setInterval(function () {
				randomelement();
			}, 4000);
		}
		function randomInteger(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		function randomelement() {
			var top = randomInteger(curtop + 10, curtop + 390);
			var left = randomInteger(curleft + 10, curleft + 790);
			//75% - green coin; 25% - red coin
			if (points != 0 && randomInteger(2, 5) % 5 == 0) {
				pts.push({ 'top': top, 'left': left, 'type': 'red' });
				$('#bggame').append('<div class="coin" style="top: ' + top + 'px; left: ' + left + 'px; background-color: ' + pts[pts.length - 1].type + ';"></div>');
			} else {
				pts.push({ 'top': top, 'left': left, 'type': 'green' });
				$('#bggame').append('<div class="coin" style="top: ' + top + 'px; left: ' + left + 'px; background-color: ' + pts[pts.length - 1].type + ';"></div>');
			}
		}
		function addtail() {
			var atop = snake[snake.length - 1].top + direc.vertail;
			var aleft = snake[snake.length - 1].left + direc.hortail;
			snake.push({ 'top': atop, 'left': aleft });
			$('#bggame').append('<div class="start snakepart" style="top: ' + atop + 'px; left: ' + aleft + 'px;"></div>');
			snakebody = document.querySelectorAll(".snakepart");
		}
		function keypress(ver, hor, vertail, hortail) {
			direc.ver = ver;direc.hor = hor;
			direc.vertail = vertail;direc.hortail = hortail;
		}

		function arrows() {
			var smallertail = 10;
			tleft.addEventListener('touchend', function (e) {
				keypress(0, 1, 0, smallertail);
			}, false);

			tright.addEventListener('touchend', function (e) {
				keypress(0, -1, 0, -smallertail);
			}, false);

			tup.addEventListener('touchend', function (e) {
				keypress(1, 0, smallertail, 0);
			}, false);

			tdown.addEventListener('touchend', function (e) {
				keypress(-1, 0, -smallertail, 0);
			}, false);

			body.addEventListener("keydown", function (e) {
				switch (e.key) {
					case "ArrowUp":
					case "8":
					case "Up":
						//IE + Edge browser
						keypress(1, 0, smallertail, 0);break;
					case "ArrowDown":
					case "2":
					case "Down":
						//IE + Edge browser
						keypress(-1, 0, -smallertail, 0);break;
					case "ArrowLeft":
					case "4":
					case "Left":
						//IE + Edge browser
						keypress(0, 1, 0, smallertail);break;
					case "ArrowRight":
					case "Right": //IE + Edge browser
					case "6":
						keypress(0, -1, 0, -smallertail);break;
					case "3":
						keypress(-1, -1, -smallertail, 0);break;
					case "7":
						keypress(1, 1, smallertail, 0);break;
					case "9":
						keypress(1, -1, smallertail, 0);break;
					case "1":
						keypress(-1, 1, -smallertail, 0);break;
					case "a":
						addtail();
						break;
				}
			});
		};
		window.onload = arrows();
		head.style.backgroundColor = snakecolor;
		snakemove(snake);
		randomelement();
		placecoin();
	})();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./style.scss", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./style.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "#bggame {\n  width: 800px;\n  height: 400px;\n  background-color: #D3D3D3;\n  border-style: solid;\n  border-width: 33px 32px 202px 27px;\n  -moz-border-image: url(/assets/bgimage.png) 33 32 202 27 repeat;\n  -webkit-border-image: url(/assets/bgimage.png) 33 32 202 27 repeat;\n  -o-border-image: url(/assets/bgimage.png) 33 32 202 27 repeat;\n  border-image: url(/assets/bgimage.png) 33 32 202 27 fill repeat; }\n  #bggame > div:first-child {\n    z-index: 2;\n    border-radius: 50% 30%; }\n\n.snakepart {\n  width: 20px;\n  height: 20px;\n  background-color: #8B4513;\n  border: 1px dotted #808080;\n  z-index: 1; }\n\n.start {\n  top: 200px;\n  left: 400px;\n  position: fixed; }\n\n.coin {\n  border-radius: 50%;\n  width: 15px;\n  height: 15px;\n  position: fixed; }\n\n#counter {\n  width: 200px;\n  height: 20px;\n  top: 450px;\n  position: fixed;\n  background-color: #808080; }\n\n#info {\n  width: 200px;\n  height: 140px;\n  top: 480px;\n  left: 620px;\n  position: fixed;\n  background-color: #808080; }\n  #info > p {\n    color: white; }\n\n#author {\n  width: 200px;\n  height: 60px;\n  top: 560px;\n  position: fixed;\n  background-color: #808080;\n  color: #FFFFFF; }\n\nbody {\n  background-color: #D3D3D3;\n  height: 100%;\n  overflow: hidden; }\n\n.touched {\n  background-color: transparent;\n  border-style: none;\n  position: fixed; }\n\n#up {\n  width: 800px;\n  height: 45px;\n  top: 0px;\n  left: 36px; }\n\n#down {\n  width: 800px;\n  height: 45px;\n  top: 440px;\n  left: 36px; }\n\n#tleft {\n  width: 35px;\n  height: 400px;\n  top: 40px;\n  left: 0px; }\n\n#tright {\n  width: 35px;\n  height: 400px;\n  top: 40px;\n  left: 835px; }\n", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);