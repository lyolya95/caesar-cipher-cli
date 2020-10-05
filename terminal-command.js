const {
  program
} = require('commander');

program.storeOptionsAsProperties(true);

program
  .requiredOption('-s, --shift <number>', 'a shift')
  .option('-i, --input <file>', 'an input file')
  .option('-o, --output <file>', 'an output file')
  .requiredOption('-a, --action [type]', 'an action encode/decode');

exports.terminalArgs = program.parse(process.argv);