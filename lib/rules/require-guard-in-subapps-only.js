"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var helper = require("./../helpers/helper");

module.exports = {
    meta: {
        docs: {
            description: "Prevent global require function in Subapp controllers, proxy require from BaseController is recommended",
            category: "Best Practices",
            recommended: true
        },
        schema: []
    },
    create: function (context) {

        var objects = [];
        var settings = context.settings || {};

        return {
            "CallExpression": function (node) {
                objects.push(objects[objects.length - 1] || helper.isExtendCallExpression(node, settings["base-controller"]));
                if (objects[objects.length - 1] && node.callee.name === "require") {
                    context.report(node, "Use 'this.require' instead of global 'require' in subapps controllers");
                }
            },
            "CallExpression:exit": function (node) {
                if (helper.isExtendCallExpression(node, settings.backbone)) {
                    objects.pop();
                }
            }
        };
    }
};
