import test from 'ava';
import rule from '../../lib/rules/translate-in-defaults-forbidden';
import AvaRuleTester from 'eslint-ava-rule-tester';

const ruleTester = new AvaRuleTester(test, {
    env: {
        es6: true
    }
});

test('rule is defined', t => {
    t.truthy(rule);
});

ruleTester.run('translate-in-defaults-forbidden', rule, {
    valid: [
        {
            code: 'Model.extend({defaults:function(){return {dropdown:{label:textHelper.t("investments.quotes.chart.labelType")}};}});',
            settings: {translatorObjectName: 'textHelper', translateFunctionName: 't'}
        },
    ],
    invalid: [
        {
            code: 'Model.extend({defaults:{dropdown:{label:textHelper.t("investments.quotes.chart.labelType")}}});',
            settings: {translatorObjectName: 'textHelper', translateFunctionName: 't'},
            errors: [{message: 'Text translation in Model.defaults (defaults as an Object) is forbidden. Please change defaults type to a Function.'}]
        }
    ]
});

