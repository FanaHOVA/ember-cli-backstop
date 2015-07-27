Ember-cli-backstop
=========

[Backstop](http://garris.github.io/BackstopJS/) based CSS regression testing for ember-cli applications

## Installation

Install the addon:
```sh
ember install ember-cli-backstop
# if ember-cli <= 0.2.2
ember install:addon ember-cli-backstop
```
## Configuration
Ember install will create a directory at ```sh root_project/tests/backstop `` containing a backstop.json file and an empty references directory.
The backstop.json will be auto generated as shown below. For information on configuring this file see the BackstopJS [github] (https://github.com/garris/BackstopJS)

```js
{
  "viewports": [
    {
      "name": "phone",
      "width": 320,
      "height": 480
    }, {
      "name": "tablet_v",
      "width": 568,
      "height": 1024
    }, {
      "name": "tablet_h",
      "width": 1024,
      "height": 768
    }
  ],
  "scenarios": [
    {
      "label": "http://getbootstrap.com",
      "url": "http://getbootstrap.com",
      "hideSelectors": [],
      "removeSelectors": [
        "#carbonads-container"
      ],
      "selectors": [
        "header",
        "main",
        "body .bs-docs-featurette:nth-of-type(1)",
        "body .bs-docs-featurette:nth-of-type(2)",
        "footer",
        "body"
      ],
      "readyEvent": null,
      "delay": 500
    }
  ]
}
``

## Usage

Run `ember server`, navigate to the application url [/tests](http://localhost:4200/tests) (e.g. localhost:4200/tests) and select the "Enable coverage" checkbox.

A options file is available in tests/blanket-options.js that contains the current regex for data coverage (filter) the regex for exclusion from data coverage (antifilter) and an array of string to exclude from blanket's requirejs loader (loaderExclusions).

As of release 0.2.4 loader exclusions are no longer necessary to fix conflicts with addon modules.  Loader exclusions may still be used to remove data coverage for specific files (e.g. config/environment).

## License

MIT

