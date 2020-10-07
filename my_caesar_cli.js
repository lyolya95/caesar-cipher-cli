const {
  pipeline
} = require('stream');
const fs = require('fs');
const path = require('path');
const process = require('process');
const {
  terminalArgs
} = require('../caesar-cipher-cli/caesar-cipher-cli/terminal-command');
const {
  decoder
} = require('./caesar-cipher-cli/function');
const {
  errorHandler
} = require('./caesar-cipher-cli/errorHandler')

process.stdin.setEncoding('utf8');

const inputFile = terminalArgs.input && [path.resolve(__dirname, terminalArgs.input), {
  encoding: "utf8",
  objectMode: true
}];

const outputFile = terminalArgs.output && [path.resolve(__dirname, terminalArgs.output)];

async function streams() {
  if (!(terminalArgs.action === 'encode' || terminalArgs.action === 'decode')) {
    await errorHandler(new Error('Action must be "encode" or "decode"  :('))
  }

  if (terminalArgs.shift < 0) {
    await errorHandler(new Error('Please, enter shift >= 0  :('))
  }

  if (!Number(terminalArgs.shift)) {
    await errorHandler(new Error('Shift should be number :('))
  }

  if (terminalArgs.input) {
    try {
      await fs.promises.access(path.resolve(__dirname, terminalArgs.input))
    } catch (err) {
      errorHandler(new Error('Input file not found :('))
    }
  }

  if (terminalArgs.output) {
    try {
      await fs.promises.access(path.resolve(__dirname, terminalArgs.output))
    } catch (err) {
      errorHandler(new Error('Output file not found :('))
    }
  }

  pipeline(
    terminalArgs.input ?
    fs.createReadStream(...inputFile) :
    process.stdin,
    decoder,
    terminalArgs.output ?
    fs.createWriteStream(...outputFile, {
      flags: 'a',
    }) :
    process.stdout,
    (err) => {
      if (err) {
        console.error('Pipeline failed.', err.name);
      } else {
        console.log('Action complete! See file \'output.txt\'  :)');
      }
    }
  );
}

streams();