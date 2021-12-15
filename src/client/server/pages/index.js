"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Home),\n/* harmony export */   \"getServerSideProps\": () => (/* binding */ getServerSideProps)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction Home({ articles  }) {\n    console.log(articles);\n    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", {\n        __source: {\n            fileName: \"C:\\\\wamp64\\\\www\\\\streamify\\\\client\\\\pages\\\\index.tsx\",\n            lineNumber: 3,\n            columnNumber: 12\n        },\n        __self: this,\n        children: \"Test\"\n    }));\n};\nasync function getServerSideProps() {\n    const response = await fetch(\"https://jsonplaceholder.typicode.com/posts\");\n    const data = await response.json();\n    return {\n        props: {\n            articles: data\n        }\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBZSxRQUFRLENBQUNBLElBQUksQ0FBQyxDQUFDLENBQUNDLFFBQVEsRUFBTSxDQUFDLEVBQUUsQ0FBQztJQUM3Q0MsT0FBTyxDQUFDQyxHQUFHLENBQUNGLFFBQVE7SUFDcEIsTUFBTSxzRUFBRUcsQ0FBRzs7Ozs7OztrQkFBQyxDQUFJOztBQUNwQixDQUFDO0FBRU0sZUFBZUMsa0JBQWtCLEdBQUcsQ0FBQztJQUN4QyxLQUFLLENBQUNDLFFBQVEsR0FBRyxLQUFLLENBQUNDLEtBQUssQ0FBQyxDQUE0QztJQUN6RSxLQUFLLENBQUNDLElBQUksR0FBRyxLQUFLLENBQUNGLFFBQVEsQ0FBQ0csSUFBSTtJQUNoQyxNQUFNLENBQUMsQ0FBQztRQUNKQyxLQUFLLEVBQUUsQ0FBQztZQUFDVCxRQUFRLEVBQUVPLElBQUk7UUFBQyxDQUFDO0lBQzdCLENBQUM7QUFDTCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RyZWFtaWZ5LWNsaWVudC8uL3BhZ2VzL2luZGV4LnRzeD8wN2ZmIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoeyBhcnRpY2xlcyB9OiBhbnkpIHtcbiAgICBjb25zb2xlLmxvZyhhcnRpY2xlcyk7XG4gICAgcmV0dXJuIDxkaXY+VGVzdDwvZGl2Pjtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlcnZlclNpZGVQcm9wcygpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzXCIpO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJvcHM6IHsgYXJ0aWNsZXM6IGRhdGEgfSxcbiAgICB9O1xufVxuIl0sIm5hbWVzIjpbIkhvbWUiLCJhcnRpY2xlcyIsImNvbnNvbGUiLCJsb2ciLCJkaXYiLCJnZXRTZXJ2ZXJTaWRlUHJvcHMiLCJyZXNwb25zZSIsImZldGNoIiwiZGF0YSIsImpzb24iLCJwcm9wcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.tsx\n");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.tsx"));
module.exports = __webpack_exports__;

})();