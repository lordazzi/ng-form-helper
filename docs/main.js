(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./projects/ng-form-helper/src/lib/field-mask.directive.ts":
/*!*****************************************************************!*\
  !*** ./projects/ng-form-helper/src/lib/field-mask.directive.ts ***!
  \*****************************************************************/
/*! exports provided: FieldMaskDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldMaskDirective", function() { return FieldMaskDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _form_field_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./form-field.directive */ "./projects/ng-form-helper/src/lib/form-field.directive.ts");




var FieldMaskDirective = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](FieldMaskDirective, _super);
    function FieldMaskDirective(element, renderer) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this.renderer = renderer;
        /**
         * The mask can't contain numbers
         */
        _this.MASK_SHOULD_NOT_HAVE_NUMBERS = /[0-8]/gi;
        _this.MASK_MUST_FINISH_WITH_A_NUMBER = /\d$/;
        _this.generatedMaskConfig = {};
        return _this;
    }
    FieldMaskDirective_1 = FieldMaskDirective;
    Object.defineProperty(FieldMaskDirective.prototype, "setFormFieldMask", {
        set: function (formFieldMask) {
            this.generatedMaskConfig = this.generateMaskConfig(formFieldMask);
        },
        enumerable: true,
        configurable: true
    });
    FieldMaskDirective.prototype.generateMaskConfig = function (formFieldMask) {
        if (this.MASK_SHOULD_NOT_HAVE_NUMBERS.test(formFieldMask)) {
            throw new Error("Can't generate mask: \"" + formFieldMask + "\". Invalid charactere found.\n        You should not use numeric character to compose the field mask.");
        }
        if (!this.MASK_MUST_FINISH_WITH_A_NUMBER.test(formFieldMask)) {
            throw new Error("Can't generate mask: \"" + formFieldMask + "\". Invalid format found.\n        The mask must finish with a numeric character (9).");
        }
        var generatedMaskConfig = {};
        var decomposeGivenMask = formFieldMask.match(/(9+|[^9]+)/g);
        if (!decomposeGivenMask) {
            throw new Error("Can't generate mask: \"" + formFieldMask + "\". Invalid format found.\n        You must have at least one 9 character in the mask.");
        }
        var isNumeric = /^\d+$/;
        var composeMask = '';
        var numberMapper = '';
        var numberGroup = 1;
        var numericLength = 0;
        decomposeGivenMask.forEach(function (textGroup) {
            if (isNumeric.test(textGroup)) {
                numericLength += textGroup.length;
                composeMask += "$" + numberGroup++;
                var currentNumberMapper = numberMapper + "([0-9]{1," + textGroup.length + "})";
                numberMapper += "([0-9]{" + textGroup.length + "})";
                generatedMaskConfig[String(numericLength)] = {
                    valueStructure: new RegExp(currentNumberMapper, 'g'),
                    maskStructure: composeMask
                };
                return;
            }
            composeMask += textGroup;
        });
        return generatedMaskConfig;
    };
    FieldMaskDirective.prototype.getPartialMask = function (currentValue) {
        var lengths = Object.keys(this.generatedMaskConfig);
        var length = lengths.find(function (maxLength) { return currentValue.length <= Number(maxLength); });
        length = length || lengths.pop() || '';
        var maskConfig = this.generatedMaskConfig[length];
        return {
            valueStructure: maskConfig.valueStructure,
            maskStructure: maskConfig.maskStructure,
            maxLength: Number(length)
        };
    };
    FieldMaskDirective.prototype.onInput = function (event) {
        var currentMaskedValue = this.getValueFromKeyboardEvent(event);
        var currentValue = currentMaskedValue.replace(/[^0-9]/g, '');
        var maskConfig = this.getPartialMask(currentValue);
        if (currentValue.length > maskConfig.maxLength) {
            this.resetField();
            return;
        }
        var maskedValue = currentValue.replace(maskConfig.valueStructure, maskConfig.maskStructure);
        this.updateFieldValue(maskedValue);
    };
    var FieldMaskDirective_1;
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('formFieldMask'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [String])
    ], FieldMaskDirective.prototype, "setFormFieldMask", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('input', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [KeyboardEvent]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], FieldMaskDirective.prototype, "onInput", null);
    FieldMaskDirective = FieldMaskDirective_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[formFieldMask]',
            providers: [
                {
                    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALUE_ACCESSOR"],
                    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () { return FieldMaskDirective_1; }),
                    multi: true
                }
            ]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], FieldMaskDirective);
    return FieldMaskDirective;
}(_form_field_directive__WEBPACK_IMPORTED_MODULE_3__["FormFieldDirective"]));



/***/ }),

/***/ "./projects/ng-form-helper/src/lib/form-field.directive.ts":
/*!*****************************************************************!*\
  !*** ./projects/ng-form-helper/src/lib/form-field.directive.ts ***!
  \*****************************************************************/
/*! exports provided: FormFieldDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormFieldDirective", function() { return FormFieldDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var FormFieldDirective = /** @class */ (function () {
    function FormFieldDirective() {
        this.oldState = {
            cursorStart: 0,
            cursorEnd: 0,
            value: ''
        };
        //  These are for angular use
        this.isDisabled = false;
        this.onChange = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            return void (0);
        };
        this.onTouch = function () { return void (0); };
    }
    FormFieldDirective.prototype.ngOnInit = function () {
        this.oldState.value = this.element.nativeElement.value;
    };
    FormFieldDirective.prototype.onKeyDown = function () {
        this.oldState.cursorStart = this.element.nativeElement.selectionStart;
        this.oldState.cursorEnd = this.element.nativeElement.selectionEnd;
    };
    FormFieldDirective.prototype.onBlur = function () {
        this.onTouch();
    };
    FormFieldDirective.prototype.writeValue = function (value) {
        var normalizedValue = value == null ? '' : value;
        this.oldState.value = normalizedValue;
        this.onChange(value);
        this.renderer.setProperty(this.element.nativeElement, 'value', normalizedValue);
    };
    FormFieldDirective.prototype.setDisabledState = function (isDisabled) {
        this.renderer.setProperty(this.element.nativeElement, 'disabled', isDisabled);
        this.isDisabled = isDisabled;
    };
    FormFieldDirective.prototype.getValueFromKeyboardEvent = function (event) {
        var el = event.target && event.target || null;
        return el && el.value || '';
    };
    FormFieldDirective.prototype.setCursorPosition = function (start, end) {
        if (end === void 0) { end = start; }
        this.element.nativeElement.selectionStart = start;
        this.element.nativeElement.selectionEnd = end;
    };
    FormFieldDirective.prototype.resetField = function () {
        this.onChange(this.oldState.value);
        this.writeValue(this.oldState.value);
        this.setCursorPosition(this.oldState.cursorStart, this.oldState.cursorEnd);
    };
    FormFieldDirective.prototype.updateFieldValue = function (value) {
        this.writeValue(value);
        this.oldState.value = value;
    };
    FormFieldDirective.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    FormFieldDirective.prototype.registerOnTouched = function (fn) {
        this.onTouch = fn;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('keydown'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", []),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], FormFieldDirective.prototype, "onKeyDown", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('blur'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", []),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], FormFieldDirective.prototype, "onBlur", null);
    return FormFieldDirective;
}());



/***/ }),

/***/ "./projects/ng-form-helper/src/lib/form-helper.module.ts":
/*!***************************************************************!*\
  !*** ./projects/ng-form-helper/src/lib/form-helper.module.ts ***!
  \***************************************************************/
/*! exports provided: FormHelperModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormHelperModule", function() { return FormHelperModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _field_mask_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./field-mask.directive */ "./projects/ng-form-helper/src/lib/field-mask.directive.ts");
/* harmony import */ var _input_regex_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./input-regex.directive */ "./projects/ng-form-helper/src/lib/input-regex.directive.ts");





var FormHelperModule = /** @class */ (function () {
    function FormHelperModule() {
    }
    FormHelperModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"]
            ],
            declarations: [
                _field_mask_directive__WEBPACK_IMPORTED_MODULE_3__["FieldMaskDirective"],
                _input_regex_directive__WEBPACK_IMPORTED_MODULE_4__["InputRegexDirective"]
            ],
            exports: [
                _field_mask_directive__WEBPACK_IMPORTED_MODULE_3__["FieldMaskDirective"],
                _input_regex_directive__WEBPACK_IMPORTED_MODULE_4__["InputRegexDirective"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"]
            ]
        })
    ], FormHelperModule);
    return FormHelperModule;
}());



/***/ }),

/***/ "./projects/ng-form-helper/src/lib/input-regex.directive.ts":
/*!******************************************************************!*\
  !*** ./projects/ng-form-helper/src/lib/input-regex.directive.ts ***!
  \******************************************************************/
/*! exports provided: InputRegexDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputRegexDirective", function() { return InputRegexDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _form_field_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./form-field.directive */ "./projects/ng-form-helper/src/lib/form-field.directive.ts");




var InputRegexDirective = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](InputRegexDirective, _super);
    function InputRegexDirective(element, renderer) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this.renderer = renderer;
        _this.regexRule = /(?:)/;
        return _this;
    }
    InputRegexDirective_1 = InputRegexDirective;
    Object.defineProperty(InputRegexDirective.prototype, "setRegex", {
        set: function (regex) {
            this.regexRule = new RegExp(regex);
        },
        enumerable: true,
        configurable: true
    });
    InputRegexDirective.prototype.onInput = function (event) {
        var value = this.getValueFromKeyboardEvent(event);
        if (this.regexRule.test(value)) {
            var cursorInitialPosition = this.element.nativeElement.selectionStart;
            this.updateFieldValue(value);
            this.setCursorPosition(cursorInitialPosition);
            return;
        }
        this.resetField();
    };
    var InputRegexDirective_1;
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('formRegexedField'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [String])
    ], InputRegexDirective.prototype, "setRegex", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('input', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [KeyboardEvent]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], InputRegexDirective.prototype, "onInput", null);
    InputRegexDirective = InputRegexDirective_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[formRegexedField]',
            providers: [
                {
                    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALUE_ACCESSOR"],
                    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () { return InputRegexDirective_1; }),
                    multi: true
                }
            ]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], InputRegexDirective);
    return InputRegexDirective;
}(_form_field_directive__WEBPACK_IMPORTED_MODULE_3__["FormFieldDirective"]));



/***/ }),

/***/ "./projects/ng-form-helper/src/public-api.ts":
/*!***************************************************!*\
  !*** ./projects/ng-form-helper/src/public-api.ts ***!
  \***************************************************/
/*! exports provided: FieldMaskDirective, FormHelperModule, InputRegexDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_field_mask_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/field-mask.directive */ "./projects/ng-form-helper/src/lib/field-mask.directive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FieldMaskDirective", function() { return _lib_field_mask_directive__WEBPACK_IMPORTED_MODULE_0__["FieldMaskDirective"]; });

/* harmony import */ var _lib_form_helper_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/form-helper.module */ "./projects/ng-form-helper/src/lib/form-helper.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormHelperModule", function() { return _lib_form_helper_module__WEBPACK_IMPORTED_MODULE_1__["FormHelperModule"]; });

/* harmony import */ var _lib_input_regex_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/input-regex.directive */ "./projects/ng-form-helper/src/lib/input-regex.directive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InputRegexDirective", function() { return _lib_input_regex_directive__WEBPACK_IMPORTED_MODULE_2__["InputRegexDirective"]; });






/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "body {\r\n  font-family: arial;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0I7QUFDcEIiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImJvZHkge1xyXG4gIGZvbnQtZmFtaWx5OiBhcmlhbDtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2>formFieldMask with the value: (99) 9999-9999</h2>\n\n<input\n  type=\"text\"\n  formFieldMask=\"(99) 9999-9999\"\n  [(ngModel)]=\"masked\"\n/>\n\n\"{{masked}}\"\n\n<h2>formRegexedField with the value: ^\\d{{0,3}$</h2>\n\n<input\n  type=\"text\"\n  formRegexedField=\"^\\d{0,3}$\"\n  [(ngModel)]=\"regexed\"\n/>\n\"{{regexed}}\"\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.masked = '';
        this.regexed = '';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var projects_ng_form_helper_src_public_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! projects/ng-form-helper/src/public-api */ "./projects/ng-form-helper/src/public-api.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");






var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                projects_ng_form_helper_src_public_api__WEBPACK_IMPORTED_MODULE_4__["FormHelperModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\workspace\angular-libs\ng-form-helper\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map