"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var helper = require("../helpers/helper");

module.exports = {
    meta: {
        docs: {
            description: "Prevent using on/off bindings inside views",
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
                objects.push(objects[objects.length - 1] || helper.isExtendCallExpression(node, settings.application));
            },
            "CallExpression:exit": function (node) {
                if (helper.isExtendCallExpression(node, settings.application)) {
                    objects.pop();
                }
            },
            "MemberExpression": function (node) {
                if (objects[objects.length - 1] &&
                    node.object.type === "MemberExpression" &&
                    (/.*[Mm]odel$/.test(node.object.property.name) || node.object.property.name === "collection")) {
                    if (node.property.name === "on") {
                        context.report(node, "Use listenTo instead of 'on'.");
                    } else if (node.property.name === "off") {
                        context.report(node, "Use stopListening instead of 'off'.");
                    }
                }
            }
        };
    }
};
