const NodeRSA = require('node-rsa');
const fs = require('fs')
require('dotenv/config')

function verifyEntry(item, signature) {
    const keystring = fs.readFileSync('./mainKey').toString()
    const key = new NodeRSA()
    key.importKey(keystring)
    return key.verify(item, signature, 'utf-8', process.env.SIGNATURE_SCHEME)
}

export default verifyEntry;