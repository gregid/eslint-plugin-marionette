"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var helper = require("./../helpers/helper");

module.exports = {
    meta: {
        docs: {
            description: "Prevent $.when function in Controller based controllers, proxy 'when' from Controller is recommended as it is guarded from context switch",
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
                objects.push(objects[objects.length - 1] || helper.isExtendCallExpression(node, settings["controller"]));

            },
            "MemberExpression": function (node) {
                if (objects[objects.length - 1] && node.property.name === "when" && node.object.name === "$") {
                    context.report(node, "Use 'this.when' instead of global '$.when' in region controllers");
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
