'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Entry = require('../Entry');

var _Entry2 = _interopRequireDefault(_Entry);

var _UtilsReferenceExtractor = require('../Utils/ReferenceExtractor');

var _UtilsReferenceExtractor2 = _interopRequireDefault(_UtilsReferenceExtractor);

var _UtilsObjectProperties = require('../Utils/objectProperties');

var View = (function () {
    function View(name) {
        _classCallCheck(this, View);

        this.entity = null;
        this._actions = null;
        this._title = false;
        this._description = '';
        this._template = null;

        this._enabled = false;
        this._fields = [];
        this._type = null;
        this._name = name;
        this._order = 0;
        this._errorMessage = null;
        this._url = null;
        this._prepare = null;
    }

    _createClass(View, [{
        key: 'title',
        value: function title(_title) {
            if (!arguments.length) return this._title;
            this._title = _title;
            return this;
        }
    }, {
        key: 'description',
        value: function description() {
            if (arguments.length) {
                this._description = arguments[0];
                return this;
            }

            return this._description;
        }
    }, {
        key: 'name',
        value: function name(_name) {
            if (!arguments.length) {
                return this._name || this.entity.name() + '_' + this._type;
            }

            this._name = _name;
            return this;
        }
    }, {
        key: 'disable',
        value: function disable() {
            this._enabled = false;

            return this;
        }
    }, {
        key: 'enable',
        value: function enable() {
            this._enabled = true;

            return this;
        }

        /**
         * @deprecated Use getter "enabled" instead
         */
    }, {
        key: 'isEnabled',
        value: function isEnabled() {
            return this.enabled;
        }

        /**
         * @deprecated Use getter "entity" instead
         */
    }, {
        key: 'getEntity',
        value: function getEntity() {
            return this.entity;
        }

        /**
         * @deprecated Specify entity at view creation or use "entity" setter instead
         */
    }, {
        key: 'setEntity',
        value: function setEntity(entity) {
            this.entity = entity;
            if (!this._name) {
                this._name = entity.name() + '_' + this._type;
            }

            return this;
        }

        /*
         * Supports various syntax
         * fields([ Field1, Field2 ])
         * fields(Field1, Field2)
         * fields([Field1, {Field2, Field3}])
         * fields(Field1, {Field2, Field3})
         * fields({Field2, Field3})
         */
    }, {
        key: 'fields',
        value: function fields() {
            if (!arguments.length) return this._fields;

            [].slice.call(arguments).map(function (argument) {
                var _this = this;

                View.flatten(argument).map(function (arg) {
                    return _this.addField(arg);
                });
            }, this);

            return this;
        }
    }, {
        key: 'hasFields',
        value: function hasFields() {
            return this.fields.length > 0;
        }
    }, {
        key: 'removeFields',
        value: function removeFields() {
            this._fields = [];
            return this;
        }
    }, {
        key: 'getFields',
        value: function getFields() {
            return this._fields;
        }
    }, {
        key: 'getField',
        value: function getField(fieldName) {
            return this._fields.filter(function (f) {
                return f.name() === fieldName;
            })[0];
        }
    }, {
        key: 'getFieldsOfType',
        value: function getFieldsOfType(type) {
            return this._fields.filter(function (f) {
                return f.type() === type;
            });
        }
    }, {
        key: 'addField',
        value: function addField(field) {
            if (field.order() === null) {
                field.order(this._fields.length, true);
            }
            this._fields.push(field);
            this._fields = this._fields.sort(function (a, b) {
                return a.order() - b.order();
            });

            return this;
        }
    }, {
        key: 'order',
        value: function order(_order) {
            if (!arguments.length) return this._order;
            this._order = _order;
            return this;
        }
    }, {
        key: 'getReferences',
        value: function getReferences(withRemoteComplete) {
            return _UtilsReferenceExtractor2['default'].getReferences(this._fields, withRemoteComplete);
        }
    }, {
        key: 'getNonOptimizedReferences',
        value: function getNonOptimizedReferences(withRemoteComplete) {
            return _UtilsReferenceExtractor2['default'].getNonOptimizedReferences(this._fields, withRemoteComplete);
        }
    }, {
        key: 'getOptimizedReferences',
        value: function getOptimizedReferences(withRemoteComplete) {
            return _UtilsReferenceExtractor2['default'].getOptimizedReferences(this._fields, withRemoteComplete);
        }
    }, {
        key: 'getReferencedLists',
        value: function getReferencedLists() {
            return _UtilsReferenceExtractor2['default'].getReferencedLists(this._fields);
        }
    }, {
        key: 'template',
        value: function template(_template) {
            if (!arguments.length) {
                return this._template;
            }

            this._template = _template;

            return this;
        }
    }, {
        key: 'identifier',
        value: function identifier() {
            return this.entity.identifier();
        }
    }, {
        key: 'actions',
        value: function actions(_actions) {
            if (!arguments.length) return this._actions;
            this._actions = _actions;
            return this;
        }
    }, {
        key: 'getErrorMessage',
        value: function getErrorMessage(response) {
            if (typeof this._errorMessage === 'function') {
                return this._errorMessage(response);
            }

            return this._errorMessage;
        }
    }, {
        key: 'errorMessage',
        value: function errorMessage(_errorMessage) {
            if (!arguments.length) return this._errorMessage;
            this._errorMessage = _errorMessage;
            return this;
        }
    }, {
        key: 'url',
        value: function url(_url) {
            if (!arguments.length) return this._url;
            this._url = _url;
            return this;
        }
    }, {
        key: 'getUrl',
        value: function getUrl(identifierValue) {
            if (typeof this._url === 'function') {
                return this._url(identifierValue);
            }

            return this._url;
        }
    }, {
        key: 'validate',
        value: function validate(entry) {
            this._fields.map(function (field) {
                var validation = field.validation();

                if (typeof validation.validator === 'function') {
                    validation.validator(entry.values[field.name()], entry.values);
                }
            });
        }

        /**
         * Map a JS object from the REST API Response to an Entry
         */
    }, {
        key: 'mapEntry',
        value: function mapEntry(restEntry) {
            return _Entry2['default'].createFromRest(restEntry, this._fields, this.entity.name(), this.entity.identifier().name());
        }
    }, {
        key: 'mapEntries',
        value: function mapEntries(restEntries) {
            return _Entry2['default'].createArrayFromRest(restEntries, this._fields, this.entity.name(), this.entity.identifier().name());
        }

        /**
         * Transform an Entry to a JS object for the REST API Request
         */
    }, {
        key: 'transformEntry',
        value: function transformEntry(entry) {
            return entry.transformToRest(this._fields);
        }

        /**
         * Add a function to be executed before the view renders
         *
         * This is the ideal place to prefetch related entities and manipulate
         * the dataStore.
         *
         * The syntax depends on the framework calling the function.
         *
         * With ng-admin, the function can be an angular injectable, listing
         * required dependencies in an array. Among other, the function can receive
         * the following services:
         *  - query: the query object (an object representation of the main request
         *    query string)
         *  - datastore: where the Entries are stored. The dataStore is accessible
         *    during rendering
         *  - view: the current View object
         *  - entry: the current Entry instance (except in listView)
         *  - Entry: the Entry constructor (required to transform an object from
         *    the REST response to an Entry)
         *  - window: the window object. If you need to fetch anything other than an
         *    entry and pass it to the view layer, it's the only way.
         *
         * The function can be asynchronous, in which case it should return
         * a Promise.
         *
         * @example
         *
         *     post.listView().prepare(['datastore', 'view', 'Entry', function(datastore, view, Entry) {
         *       const posts = datastore.getEntries(view.getEntity().uniqueId);
         *       const authorIds = posts.map(post => post.values.authorId).join(',');
         *       return fetch('http://myapi.com/authors?id[]=' + authorIds)
         *          .then(response => response.json())
         *          .then(authors => Entry.createArrayFromRest(
         *              authors,
         *              [new Field('first_name'), new Field('last_name')],
         *              'author'
         *          ))
         *          .then(authorEntries => datastore.setEntries('authors', authorEntries));
         *     }]);
         */
    }, {
        key: 'prepare',
        value: function prepare(_prepare) {
            if (!arguments.length) return this._prepare;
            this._prepare = _prepare;
            return this;
        }
    }, {
        key: 'doPrepare',
        value: function doPrepare() {
            return this._prepare.apply(this, arguments);
        }
    }, {
        key: 'enabled',
        get: function get() {
            return this._enabled || !!this._fields.length;
        }
    }, {
        key: 'type',
        get: function get() {
            return this._type;
        }
    }], [{
        key: 'flatten',
        value: function flatten(arg) {
            if (arg.constructor.name === 'Object') {
                console.warn('Passing literal of Field to fields method is deprecated use array instead');
                var result = [];
                for (var fieldName in arg) {
                    result = result.concat(View.flatten(arg[fieldName]));
                }
                return result;
            }
            if (Array.isArray(arg)) {
                return arg.reduce(function (previous, current) {
                    return previous.concat(View.flatten(current));
                }, []);
            }
            // arg is a scalar
            return [arg];
        }
    }]);

    return View;
})();

exports['default'] = View;
module.exports = exports['default'];
//# sourceMappingURL=View.js.map