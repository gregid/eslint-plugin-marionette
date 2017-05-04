'use strict';

import test from 'ava';
import rule from '../../lib/rules/require-guard-in-subapps-only';
import AvaRuleTester from 'eslint-ava-rule-tester';

const ruleTester = new AvaRuleTester(test, {
    env: {
        es6: true
    }
});

test("rule is defined", t => {
    t.truthy(rule);
});

ruleTester.run('require-guard-in-subapps-only', rule, {
    valid: [
        'require(["controller", "jquery"], function (BaseController, $){ return BaseController.extend({ initialize: function () { this.require("something"); }});});'
    ],
    invalid: [
        {
            code: 'require(["controller", "jquery"], function (BaseController, $){ return BaseController.extend({ initialize: function () { require("something"); }});});',
            settings: {"base-controller": {"Object": ["BaseController"]}},
            errors: [{ message: 'Use \'this.require\' instead of global \'require\' in subapps controllers' }]
        }
    ]
});

