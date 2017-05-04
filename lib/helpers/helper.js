function isExtendCallExpression(node, settings) {
    var prefixes = settings.Object.map(function (item) {
        return item.prefix;
    });

    return node.type === "CallExpression" &&
        node.callee.type === "MemberExpression" &&
        (
            (node.callee.object.type === "MemberExpression" && prefixes.indexOf(node.callee.object.object.name) > -1) ||
            (node.callee.object.type === "Identifier" && prefixes.indexOf(node.callee.object.name) > -1)
        ) &&
        node.callee.property.name === "extend";
}

function parseSettings(settings) {
    return settings.map(function (setting) {
        var splitValue = setting.split(".");
        return splitValue.length > 1 ? {prefix: splitValue[0], postfix: splitValue[1]} : {prefix: splitValue[0]};
    });
}

function normalizeSettings(originalSettings) {
    originalSettings = originalSettings || {};

    var settings = {};
    settings.Object = originalSettings.Object ? originalSettings.Object.concat("Backbone.View") : ["Backbone.View"];
    settings.Object = parseSettings(settings.Object);
    return settings;
}

function checkForObjectType(settings, object) {
    return settings.some(function (item) {
        return item.postfix && object.property ? item.postfix === object.property.name : item.prefix === object.name;
    });
}

module.exports = {
    isExtendCallExpression: function (node, settings) {
        settings = normalizeSettings(settings);
        return isExtendCallExpression(node, settings) && checkForObjectType(settings.Object, node.callee.object);
    }
};
