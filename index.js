'use strict';

module.exports = {
    rules: {
        'deprecated-marionette-composite-view': require('./lib/rules/deprecated-marionette-composite-view'),
        'no-config-requiring': require('./lib/rules/no-config-requiring'),
        'no-left-out-listeners': require('./lib/rules/no-left-out-listeners'),
        'no-view-onoff-binding': require('./lib/rules/no-view-onoff-binding'),
        'require-guard-in-subapps-only': require('./lib/rules/require-guard-in-subapps-only'),
        'when-guard-in-controller-only': require('./lib/rules/when-guard-in-controller-only'),
        'no-translate-in-defaults': require('./lib/rules/no-translate-in-defaults')
    },
    configs: {
        recommended: {
            rules: {
                '@silesia-corporation/marionette/deprecated-marionette-composite-view': 1,
                '@silesia-corporation/marionette/no-config-requiring': 0,
                '@silesia-corporation/marionette/no-left-out-listeners': 1,
                '@silesia-corporation/marionette/no-view-onoff-binding': 1,
                '@silesia-corporation/marionette/require-guard-in-subapps-only': 0,
                '@silesia-corporation/marionette/when-guard-in-controller-only': 0,
                '@silesia-corporation/marionette/no-translate-in-defaults': 0
            }
        }
    }
};
