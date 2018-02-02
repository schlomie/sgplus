
const Clipboard = require('./clipboard');
const args = require('./args');

function timedClear(numSeconds, numEntries) {

    if (0 == numSeconds) {
        return Clipboard.clearClipboard(numEntries);
    }

    setTimeout(timedClear.bind(null, numSeconds -1, numEntries), 1000);
}

timedClear(args.clearAfter, args.clearEntries);
