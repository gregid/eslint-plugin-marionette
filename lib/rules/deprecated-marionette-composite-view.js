"use strict";

module.exports = function (context) {
    return {
        Identifier: function (node) {
            if (node.name === "CompositeView") {
                context.report({
                    message: "Marionette.CompositeView is deprecated",
                    node: node
                });
            }
        }
    };
};

module.exports.schema = [];
