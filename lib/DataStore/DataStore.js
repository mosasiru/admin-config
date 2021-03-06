'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DataStore = (function () {
    function DataStore() {
        _classCallCheck(this, DataStore);

        this._entries = {};
    }

    _createClass(DataStore, [{
        key: 'setEntries',
        value: function setEntries(name, entries) {
            this._entries[name] = entries;

            return this;
        }
    }, {
        key: 'addEntry',
        value: function addEntry(name, entry) {
            if (!(name in this._entries)) {
                this._entries[name] = [];
            }

            this._entries[name].push(entry);
        }
    }, {
        key: 'getEntries',
        value: function getEntries(name) {
            return this._entries[name] || [];
        }

        /**
         * Get first entry satisfying a filter function
         *
         * @example datastore.getEntry('books', book => book.title === 'War and Peace');
         */
    }, {
        key: 'getFirstEntry',
        value: function getFirstEntry(name) {
            var filter = arguments.length <= 1 || arguments[1] === undefined ? function () {
                return true;
            } : arguments[1];

            return this.getEntries(name).filter(filter).shift();
        }
    }, {
        key: 'getChoices',
        value: function getChoices(field) {
            var identifier = field.targetEntity().identifier().name();
            var name = field.targetField().name();

            return this.getEntries(field.targetEntity().uniqueId + '_choices').map(function (entry) {
                return {
                    value: entry.values[identifier],
                    label: entry.values[name]
                };
            });
        }
    }, {
        key: 'fillReferencesValuesFromCollection',
        value: function fillReferencesValuesFromCollection(collection, referencedValues, fillSimpleReference) {
            fillSimpleReference = typeof fillSimpleReference === 'undefined' ? false : fillSimpleReference;

            for (var i = 0, l = collection.length; i < l; i++) {
                collection[i] = this.fillReferencesValuesFromEntry(collection[i], referencedValues, fillSimpleReference);
            }

            return collection;
        }
    }, {
        key: 'fillReferencesValuesFromEntry',
        value: function fillReferencesValuesFromEntry(entry, referencedValues, fillSimpleReference) {
            for (var referenceField in referencedValues) {
                var reference = referencedValues[referenceField],
                    choices = this.getReferenceChoicesById(reference),
                    entries = [],
                    identifier = reference.getMappedValue(entry.values[referenceField], entry.values);

                if (reference.type() === 'reference_many') {
                    for (var i in identifier) {
                        var id = identifier[i];
                        entries.push(choices[id]);
                    }

                    entry.listValues[referenceField] = entries;
                } else if (fillSimpleReference && identifier != null && identifier in choices) {
                    entry.listValues[referenceField] = reference.getMappedValue(choices[identifier], entry.values);
                }
            }

            return entry;
        }
    }, {
        key: 'getReferenceChoicesById',
        value: function getReferenceChoicesById(field) {
            var result = {},
                targetField = field.targetField().name(),
                targetIdentifier = field.targetEntity().identifier().name(),
                entries = this.getEntries(field.targetEntity().uniqueId + '_values');

            for (var i = 0, l = entries.length; i < l; i++) {
                var entry = entries[i];
                result[entry.values[targetIdentifier]] = entry.values[targetField];
            }

            return result;
        }
    }]);

    return DataStore;
})();

exports['default'] = DataStore;
module.exports = exports['default'];
//# sourceMappingURL=DataStore.js.map