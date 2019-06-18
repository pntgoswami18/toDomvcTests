let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
let HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  //specs: ['smokeSpec.js', 'anotherSpec.js'],
  suites: ['smokeSpec.js', 'anotherSpec.js'],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['disable-infobars', '--headless', '--window-size=1024,768']
    },
    'loggingPrefs': {
      'performance': 'ALL'
    }
  },
  resultJsonOutputFile: './Report.json',

  onPrepare: () => {

    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({
      suite: {
        displayNumber: true
      },
      spec: {
        displayErrorMessages: true,
        displayStacktrace: false,
        displaySuccessful: true,
        displayFailed: true,
        displayDuration: true
      },
      summary: {
        displayStacktrace: false,
        displaySuccessful: false,
        displayFailed: false,
        displayDuration: true
      }
    }));

  }
};

