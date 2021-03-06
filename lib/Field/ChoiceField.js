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

var ChoiceField = (function (_Field) {
    _inherits(ChoiceField, _Field);

    function ChoiceField(name) {
        _classCallCheck(this, ChoiceField);

        _get(Object.getPrototypeOf(ChoiceField.prototype), "constructor", this).call(this, name);
        this._type = "choice";
        this._choices = [];
    }

    _createClass(ChoiceField, [{
        key: "choices",
        value: function choices(_choices) {
            if (!arguments.length) return this._choices;
            this._choices = _choices;

            return this;
        }
    }, {
        key: "getLabelForChoice",
        value: function getLabelForChoice(value, entry) {
            var choices = typeof this._choices === 'function' ? this._choices(entry) : this._choices;
            var choice = choices.filter(function (c) {
                return c.value == value;
            }).pop();
            return choice ? choice.label : null;
        }
    }]);

    return ChoiceField;
})(_Field3["default"]);

exports["default"] = ChoiceField;
module.exports = exports["default"];
//# sourceMappingURL=ChoiceField.js.map