"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Field2 = require("./Field");

var _Field3 = _interopRequireDefault(_Field2);

var NumberField = (function (_Field) {
    _inherits(NumberField, _Field);

    function NumberField(name) {
        _classCallCheck(this, NumberField);

        _get(Object.getPrototypeOf(NumberField.prototype), "constructor", this).call(this, name);
        this._type = "number";
        this._format = undefined;
    }

    /**
     * Specify format pattern for number to string conversion. 
     *
     * Based on NumeralJs, which uses a syntax similar to Excel.
     *
     * {@link} http://numeraljs.com/
     * {@link} https://github.com/baumandm/angular-numeraljs
     * {@example}
     *
     *     nga.field('height', 'number').format('$0,0.00');
     */

    _createClass(NumberField, [{
        key: "format",
        value: function format(value) {
            if (!arguments.length) return this._format;
            this._format = value;
            return this;
        }
    }, {
        key: "fractionSize",
        value: function fractionSize(decimals) {
            console.warn('NumberField.fractionSize() is deprecated, use NumberField.format() instead');
            this.format('0.' + '0'.repeat(decimals));
            return this;
        }
    }]);

    return NumberField;
})(_Field3["default"]);

exports["default"] = NumberField;
module.exports = exports["default"];
//# sourceMappingURL=NumberField.js.map