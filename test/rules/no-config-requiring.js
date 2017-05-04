'use strict';

import test from 'ava';
import rule from '../../lib/rules/no-config-requiring';
import AvaRuleTester from 'eslint-ava-rule-tester';

const ruleTester = new AvaRuleTester(test, {
    env: {
        es6: true
    }
});

test("rule is defined", t => {
    t.truthy(rule);
});

ruleTester.run('no-config-requiring', rule, {
    valid: [
        'require("config.helper");',
        'require(["config.helper"], function (configHelper) {});'
    ],
    invalid: [
        {
            code: 'require("config");',
            errors: [{ message: 'Explicit config requiring is deprecated. Use config.helper instead' }]
        },
        {
            code: 'require(["config"], function (config) {});',
            errors: [{ message: 'Explicit config requiring is deprecated. Use config.helper instead' }]
        }
    ]
});

