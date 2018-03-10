
module.exports = require('yargs')
    .option('verify', {
        alias: 'v',
        default: false,
        description: 'Forces the re-entry of URI and Master Password for verification'
    })
    .option('length', {
        alias: 'l',
        default: 24,
        description: 'Length of the generated password. Valid lengths are integers between 4 and 24 inclusive. Note that 23- and 24-character MD5-based passwords provide no additional entropy. (The value for those characters will always be A.'
    })
    .option('method', {
        alias: 'm',
        default: 'sha512',
        description: 'The hash algorithm to use, either md5 or sha512'
    })
    .option('rounds', {
        alias: 'r',
        default: false,
        description: 'A boolean value directing whether or not to prompt for the number of hash rounds to be applied.  If not given, the default value of 10 is used.'
    })
    .option('subdomains', {
        default: true,
        description: 'A boolean value directing whether or not to remove subdomains from the hostname before generating the password.'
    })
    .option('secret', {
        alias: 's',
        default: false,
        description: 'A boolean value directing whether or not to prompt for a secret password to be appended to the master password before generating the password. ' +
                     'This option is provided for convenience, as the same output can be produced by manually concatenating the master and secret passwords.'
    })
    .option('clear-after', {
        default: 10,
        description: 'The number of seconds the generated password will reside on the clipboard before being cleared.'
    })
    .option('clear-entries', {
        default: 20,
        description: 'The number of random entries that will be copied to the clipboard before being cleared.'
    })
    .argv;
