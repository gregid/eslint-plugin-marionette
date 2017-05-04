'use strict';

import test from 'ava';
import rule from '../../lib/rules/when-guard-in-controller-only';
import AvaRuleTester from 'eslint-ava-rule-tester';

const ruleTester = new AvaRuleTester(test, {
    env: {
        es6: true
    }
});

test("rule is defined", t => {
    t.truthy(rule);
});

ruleTester.run('when-guard-in-subapps-only', rule, {
    valid: [
        'require(["controller", "jquery"], function (Controller, $){ return Controller.extend({ initialize: function () { this.when("something"); }});});'
    ],
    invalid: [
        {
            code: 'require(["controller", "jquery"], function (Controller, $){ return Controller.extend({ initialize: function () { $.when("something"); }});});',
            settings: {"controller": {"Object": ["Controller"]}},
            errors: [{ message: 'Use \'this.when\' instead of global \'$.when\' in region controllers' }]
        }
    ]
});

