const process = require('process');

exports.errorHandler = error => {
  process.stderr.write(error.message + '\n')
  process.exit(1)
}