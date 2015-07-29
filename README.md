Ember-cli-backstop
=========

[BackstopJS](http://garris.github.io/BackstopJS/) based CSS regression testing for ember-cli applications.

![Details](https://cloud.githubusercontent.com/assets/8845319/8913489/402c8d4c-3467-11e5-9e32-f07023e57d5d.png)
![Details2](https://cloud.githubusercontent.com/assets/8845319/8913467/3dfb64e4-3467-11e5-9207-1af33e6d59dc.png)

## Installation

Install the addon:
```sh
ember install ember-cli-backstop
# if ember-cli <= 0.2.2
ember install:addon ember-cli-backstop
```

## Dependencies

BackstopJS requires a global install of [CasperJS](https://github.com/n1k0/casperjs) and [PhantomJS](http://phantomjs.org/)

```sh
$ npm install -g phantomjs
$ npm install -g casperjs
```

## Configuration
The ember-cli-backstop generator creates a `tests/backstop` directory containing a backstop.json configuration file and an empty reference images directory. For information on configuring the backstop.json file to collect reference images for testing refer to the [BackstopJS Github](https://github.com/garris/BackstopJS)

## Usage

### Creating Reference Files

`ember backstop reference` will create snapshot reference images in `tests/backstop/references` based on the configuration specified in the backstop.json file.  References images can be committed to version control to view changes during pull requests/code inspections.

Run the reference command whenever you want to update the reference snapshots for your project.

### Executing Backstop Test

`ember backstop test` generates a set of test snapshots based on the current application and compares these snapshots against the reference snapshots.  A report highlighting the differences will be available at [BackstopJS Report](http://localhost:3001/compare) (e.g. localhost:3001/compare).

## Troubleshooting

### Stdout overflow

Logs from the target application may overflow stdout, causing the backstop commands to terminate (issue #4 has been raised against this).  As a workaround backstop commands can be run with `strict` to suppress output.

e.g. `ember backstop reference strict` or `ember backstop test strict`

## License

MIT

