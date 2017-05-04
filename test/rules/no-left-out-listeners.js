'use strict';

import test from 'ava';
import rule from '../../lib/rules/no-left-out-listeners';
import AvaRuleTester from 'eslint-ava-rule-tester';

const ruleTester = new AvaRuleTester(test, {
    env: {
        es6: true
    }
});

test("rule is defined", t => {
    t.truthy(rule);
});

ruleTester.run('no-left-out-listeners', rule, {
    valid: [
        '$("document").on("click", function (){}); $("document").off("click");'
    ],
    invalid: [
        {
            code: '$("document").on("click", function (){});',
            errors: [{ message: 'Unbind listener "click" on "document"' }]
        },
        {
            code: '$("#div-id").on("event", function (){});',
            errors: [{ message: 'Unbind listener "event" on "#div-id"' }]
        }
    ]
});

