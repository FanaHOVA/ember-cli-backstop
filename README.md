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

The backstop.json will be auto generated as shown below. For information on configuring this file see the [BackstopJS Github] (https://github.com/garris/BackstopJS)

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
```

## Usage

### Creating Reference Files

Run `ember backstop reference`, and image files containing snapshots of your application will be viewable at ```sh root_project/tests/backstop/references ``.

### Testing

Run `ember backstop reference`, navigate to the [BackstopJS Report] (http://localhost:3001/compare) (e.g. localhost:3001/compare).

## License

MIT

