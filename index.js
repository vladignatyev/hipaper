let crypto = require('crypto')
let bip39 = require('bip39')
let bitcoin = require('bitcoinjs-lib')

let addressCount = 5  // should be enough

let banner = `
██╗  ██╗██╗██████╗  █████╗ ██████╗ ███████╗██████╗
██║  ██║██║██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗
███████║██║██████╔╝███████║██████╔╝█████╗  ██████╔╝
██╔══██║██║██╔═══╝ ██╔══██║██╔═══╝ ██╔══╝  ██╔══██╗
██║  ██║██║██║     ██║  ██║██║     ███████╗██║  ██║
╚═╝  ╚═╝╚═╝╚═╝     ╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝
`;

let instruction = `
* MUST READ *
1. Save securely (write down onto the paper, or engrave it onto a metal
   plate) Mnemonic words exactly in the same order they appeared. Mnemonic
   phrase gives anyone an access to all shown Bitcoin addresses.
2. Save securely Private keys in WIF format.
3. Send Bitcoins to Addresses shown above. You can share *ONLY* addresses
   to anyone, not Private keys or Mnemonic phrase.
4. When you will need your Bitcoins, import Private key in WIF format
   in the wallet application you want to use.
5. Support author if you loved it. This tiny console utility
   based on https://bitcoinjs.org/.
`;


crypto.randomBytes(64, function(err, buffer){
  console.log('\033[2J');
  console.log(banner);
  console.log('Random seed:');
  console.log('=======================');
  console.log(buffer.toString('hex'));

  const mnemonic = bip39.entropyToMnemonic(buffer);

  console.log('\r\nBIP 39 mnemonic phrase:');
  console.log('===============================');
  const words = mnemonic.split(' ');
  let mnemonicStrings = '';
  let columns = 0;
  for (let w = 0; w < words.length; w++) {
    mnemonicStrings = mnemonicStrings + " " + words[w];
    columns++;
    if (columns == 4) {
      console.log(mnemonicStrings);
      mnemonicStrings = '';
      columns = 0;
    }
  }
  console.log('===============================\r\n');
  const seed = bip39.mnemonicToSeed(mnemonic);
  const root = bitcoin.HDNode.fromSeedBuffer(seed);

  let index = 0;
  for (let i = 0; i < addressCount; i++) {
    index = i;
    const derived = root.derivePath("m/0'/0/" + index.toString());
    console.log('Address:                   ' + derived.getAddress());
    console.log('Private key in WIF format: ' + derived.keyPair.toWIF() + '\r\n');
  }

  console.log(instruction);
})
