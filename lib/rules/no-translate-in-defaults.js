'use strict';

const doc = 'docs/async.md',
    message = 'Text translation in Model.defaults (defaults as an Object) is forbidden. Please change defaults type to a Function.';

module.exports = function (context) {

    return {
        'CallExpression': function (node) {
            var settings = context.settings || {};
            if (node.callee.type === 'MemberExpression' &&
                node.callee.object.name === settings.translatorObjectName &&
                node.callee.property.name === settings.translateFunctionName) {
                context.getAncestors().forEach(function (ancestor) {
                    if (ancestor.type === 'Property' && ancestor.key.name === 'defaults' && ancestor.value.type === 'ObjectExpression') {
                        context.report({
                            node: node,
                            message: message
                        });
                    }
                });
            }
        }
    };

};

module.exports.schema = [];
