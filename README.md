# eslint-plugin-marionette

> ESLint rules for marionette

## Usage

1. Install `eslint-plugin-marionette` as a dev-dependency:

    ```shell
    npm install --save-dev @silesia-corporation/eslint-plugin-marionette
    ```

2. Enable the plugin by adding it to your `.eslintrc`:

    ```yaml
    plugins:
      - marionette
    ```

## Configuration

This plugin exports a `recommended` configuration that enforces good practices.

To enable this configuration, use the `extends` property in your `.eslintrc`
config file:

```yaml
plugins:
  - marionette
extends: 'plugin:marionette/recommended'
```

See the [ESLint config docs][] for more information about extending
configuration files.

[eslint config docs]: http://eslint.org/docs/user-guide/configuring#extending-configuration-files

### Rules

Rule                                  | Recommended      | Options
----                                  | -----------      | -------
deprecated-marionette-composite-view  | 1                |
no-config-requiring                   | 0                |
no-left-out-listeners                 | 1                |
no-view-onoff-binding                 | 1                |
require-guard-in-subapps-only         | 0                |
when-guard-in-controller-only         | 0                |
no-translate-in-defaults              | 0                |

For example, using the recommended configuration, the `deprecated-marionette-composite-view` rule
is enabled and will cause ESLint to throw an error (with an exit code of `1`)
when triggered.

You may customise each rule by adding a value in your `.eslintrc` `rules`
property:

```yaml
plugins:
  - marionette
rules:
  marionette/deprecated-marionette-composite-view: 1,
  marionette/no-config-requiring: 0,
  marionette/no-left-out-listeners: 1,
  marionette/no-view-onoff-binding: 1,
  marionette/require-guard-in-subapps-only: 0,
  marionette/when-guard-in-controller-only: 0
```

See [configuring rules][] for more information.

[configuring rules]: http://eslint.org/docs/user-guide/configuring#configuring-rules

## Author

© 2017 Silesia Corporation and [contributors][].

[contributors]: https://github.com/silesia-corporation/eslint-plugin-marionette/graphs/contributors
