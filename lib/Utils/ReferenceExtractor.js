'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {

    getReferencedLists: function getReferencedLists(fields) {
        return this.indexByName(fields.filter(function (f) {
            return f.type() === 'referenced_list';
        }));
    },
    getReferences: function getReferences(fields, withRemoteComplete) {
        var optimized = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

        var references = fields.concat(fields.filter(function (f) {
            return f.type() === 'embedded_list';
        }).map(function (f) {
            return f.targetFields();
        }).reduce(function (a, b) {
            return a.concat(b);
        }, [])).filter(function (f) {
            return f.type() === 'reference' || f.type() === 'reference_many';
        });

        if (withRemoteComplete === true) {
            references = references.filter(function (r) {
                return r.remoteComplete();
            });
        } else if (withRemoteComplete === false) {
            references = references.filter(function (r) {
                return !r.remoteComplete();
            });
        }
        if (optimized !== null) {
            references = references.filter(function (r) {
                return r.hasSingleApiCall() === optimized;
            });
        }
        return this.indexByName(references);
    },
    getNonOptimizedReferences: function getNonOptimizedReferences(fields, withRemoteComplete) {
        return this.getReferences(fields, withRemoteComplete, false);
    },
    getOptimizedReferences: function getOptimizedReferences(fields, withRemoteComplete) {
        return this.getReferences(fields, withRemoteComplete, true);
    },
    indexByName: function indexByName(references) {
        return references.reduce(function (referencesByName, reference) {
            referencesByName[reference.name()] = reference;
            return referencesByName;
        }, {});
    }
};
module.exports = exports['default'];
//# sourceMappingURL=ReferenceExtractor.js.map