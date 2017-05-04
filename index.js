'use strict';

module.exports = {
    rules: {
        'deprecated-marionette-composite-view': require('./lib/rules/deprecated-marionette-composite-view'),
        'no-config-requiring': require('./lib/rules/no-config-requiring'),
        'no-left-out-listeners': require('./lib/rules/no-left-out-listeners'),
        'no-view-onoff-binding': require('./lib/rules/no-view-onoff-binding'),
        'require-guard-in-subapps-only': require('./lib/rules/require-guard-in-subapps-only'),
        'when-guard-in-controller-only': require('./lib/rules/when-guard-in-controller-only')
    },
    configs: {
        recommended: {
            rules: {
                'marionette/deprecated-marionette-composite-view': 1,
                'marionette/no-config-requiring': 0,
                'marionette/no-left-out-listeners': 1,
                'marionette/no-view-onoff-binding': 1,
                'marionette/require-guard-in-subapps-only': 0,
                'marionette/when-guard-in-controller-only': 0
            }
        }
    }
};
