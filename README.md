Ember-cli-backstop
=========

[Backstop](http://garris.github.io/BackstopJS/) based CSS regression testing for ember-cli applications.

![Details](https://cloud.githubusercontent.com/assets/8845319/8913489/402c8d4c-3467-11e5-9e32-f07023e57d5d.png)
![Details2](https://cloud.githubusercontent.com/assets/8845319/8913467/3dfb64e4-3467-11e5-9207-1af33e6d59dc.png)

## Installation

Install the addon:
```sh
ember install ember-cli-backstop
# if ember-cli <= 0.2.2
ember install:addon ember-cli-backstop
```

FYI: [CasperJS](https://github.com/n1k0/casperjs) will be installed globally with installation. 

## Configuration
The ember-cli-backstop generator will create a directory at `/tests/backstop ` containing a backstop.json file and an empty references directory.

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

Run `ember backstop reference`, and image files containing snapshots of your application will be viewable at `/tests/backstop/references `.

### Executing Backstop Test

Run `ember backstop test`, navigate to the [BackstopJS Report] (http://localhost:3001/compare) (e.g. localhost:3001/compare) to view the report.

### Strict Command

Postfix `ember backstop test` or `ember backstop reference` with `strict` to supress CasperJS stdout. 

e.g. `ember backstop test strict` 

## License

MIT

