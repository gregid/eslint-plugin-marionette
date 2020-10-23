"use strict";

module.exports = function (context) {

    var nodes = {},
        anyOffUnbindsAll = context.options[0] === "any-off-unbinds-all",
        foundOff = false;

    var getTopObject = function (object) {
        if (object.callee) {
            if (object.callee.name === "$") {
                return object.arguments[0];
            }
            if (object.callee.type == "MemberExpression") {
                return getTopObject(object.callee.object);
            }
        }
        return null;
    };

    return {
        CallExpression: function (expression) {
            var listenerNode,
                name,
                isListenerOn,
                object,
                objectID,
                listenerID;

            if (expression.callee.type !== "MemberExpression") return;
            listenerNode = expression.callee.property;
            name = listenerNode.name;
            if (name !== "on" && name !== "off") return;

            isListenerOn = name === "on";
            object = getTopObject(expression.callee.object);
            if (!object) return;

            // objectID = context.eslint.getSource(object);
            objectID = context.getSource(object);
            if (!nodes[objectID]) {
                nodes[objectID] = {};
            }
            if (expression.arguments[0]) {
                // listenerID = context.eslint.getSource(expression.arguments[0]);
                listenerID = context.getSource(expression.arguments[0]);
            } else {
                listenerID = 0;
            }
            if (anyOffUnbindsAll && !isListenerOn) {
                foundOff = true;
            }
            if (nodes[objectID][listenerID]) {
                // State of the existing listener can be changed only to off, because unbinding can be defined before binding in source code
                if (!isListenerOn) {
                    nodes[objectID][listenerID].isOn = false;
                }
            } else {
                nodes[objectID][listenerID] = {
                    isOn: isListenerOn,
                    node: listenerNode
                };
            }
        },

        "Program:exit": function () {
            if (foundOff) {
                return;
            }
            for (var objectID in nodes) {
                var object = nodes[objectID];
                if (object[0] && !object[0].isOn) {
                    // There is an off for all listeners
                    continue;
                }
                for (var listenerID in object) {
                    if (object[listenerID].isOn) {
                        context.report({
                            message: "Unbind listener " + listenerID + " on " + objectID,
                            node: object[listenerID].node
                        });
                    }
                }
            }
        }
    };
};

module.exports.schema = [
    {
        "enum": ["any-off-unbinds-all"]
    }
];
