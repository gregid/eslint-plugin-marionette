'use strict';

import test from 'ava';
import rule from '../../lib/rules/no-view-onoff-binding';
import AvaRuleTester from 'eslint-ava-rule-tester';

const ruleTester = new AvaRuleTester(test, {
    env: {
        es6: true
    }
});

test("rule is defined", t => {
    t.truthy(rule);
});

ruleTester.run('no-view-onoff-binding', rule, {
    valid: [
        '$("document").on("click", function (){}); $("document").off("click");'
    ],
    invalid: [
        {
            code: 'require(["marionette"], function (Marionette){ return Marionette.LayoutView.extend({ initialize: function () { this.model.on("something"); }});});',
            settings: {
                "application": {
                    // names of objects which extends from backbone/marionette objects.
                    "Object": ["Marionette.LayoutView", "Marionette.ItemView", "Marionette.CompositeView", "Marionette.Object",
                        "Marionette.CollectionView", "Controller", "Marionette.Behavior", "ProcessController", "InvestmentsController",
                        "PreModel"]
                }
            },
            errors: [{ message: 'Use listenTo instead of \'on\'.' }]
        },
        {
            code: 'require(["marionette"], function (Marionette){ return Marionette.LayoutView.extend({ onDestroy: function () { this.model.off("something"); }});});',
            settings: {
                "application": {
                    // names of objects which extends from backbone/marionette objects.
                    "Object": ["Marionette.LayoutView", "Marionette.ItemView", "Marionette.CompositeView", "Marionette.Object",
                        "Marionette.CollectionView", "Controller", "Marionette.Behavior", "ProcessController", "InvestmentsController",
                        "PreModel"]
                }
            },
            errors: [{ message: 'Use stopListening instead of \'off\'.' }]
        }
    ]
});

