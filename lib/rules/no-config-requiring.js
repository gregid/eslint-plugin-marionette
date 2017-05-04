/**
 * @fileoverview Rule to warn programmer about explicit config usage
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var _ = require("underscore");

module.exports = function (context) {
    return {
        "CallExpression": function (node) {
            if (node && node.callee && node.callee.name === "require" && node.arguments[0].value === "config") {
                context.report({
                    message: "Explicit config requiring is deprecated. Use config.helper instead",
                    node: node
                });
            } else if(node && node.callee
                && (node.callee.name === "require" || node.callee.name === "define")
                && node.arguments[0].type === "ArrayExpression"
                && _.find(node.arguments[0].elements, function (object) {
                    if (object && object.type === "Literal" && object.value === "config") return true;
                    return false;
                })) {
                context.report({
                    message: "Explicit config requiring is deprecated. Use config.helper instead",
                    node: node
                });
            }
        }
    };
};

module.exports.schema = [];
