'use strict';

import test from 'ava';
import rule from '../../lib/rules/deprecated-marionette-composite-view';
import AvaRuleTester from 'eslint-ava-rule-tester';

const ruleTester = new AvaRuleTester(test, {
    env: {
        es6: true
    }
});

test("rule is defined", t => {
    t.truthy(rule);
});

ruleTester.run('deprecated-marionette-composite-view', rule, {
    valid: [
        'Marionette.View',
        'View'
    ],
    invalid: [
        {
            code: 'Marionette.CompositeView',
            errors: [{ message: 'Marionette.CompositeView is deprecated' }]
        }
    ]
});

