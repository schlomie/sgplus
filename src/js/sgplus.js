#!/usr/bin/env node

const sgp = require('supergenpass-lib');
const args = require('./args');
const Prompt = require('./prompt');
const Clipboard = require('./clipboard');
const spawn = require('child_process').spawn;


Prompt.ask(args.verify === true, args.secret === true, args.rounds === true, (err, uri, mp, sec, rounds) => {

    if (err) {
        console.error(err);
        process.exit(1);
    }

    let opts = {
        length: args.length,
        method: args.method,
        removeSubdomains: false === args.subdomains ? false : true,
        hashRounds: 10
    };

    if (sec && 'string' == typeof sec) {
        opts.secret = sec;
    }

    if (rounds) {
        opts.hashRounds = rounds;
    }

    if ('string' != typeof uri || 'string' != typeof mp || 0 == uri.length || 0 == mp.length) {
        console.error('The URI and Master Password must be non-empty strings');
        process.exit(1);
    }

    sgp.generate(mp, uri, opts, (pw) => {
        Clipboard.copyToClipboard(pw);

        let clearInSeconds = args.clearAfter;
        let clearEntries = args.clearEntries;

        console.log('Copied the password to the clipboard. Will clear in %d seconds.', clearInSeconds);
        spawn('node', [__dirname + '/timed_clipboard', '--clear-after='+clearInSeconds, '--clear-entries='+clearEntries], {detached: true, stdio: 'inherit'})

        process.exit();
    });
});


