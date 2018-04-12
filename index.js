let crypto = require('crypto')
let bip39 = require('bip39')
let bitcoin = require('bitcoinjs-lib')

let startAddressIdx = 0
let addressCount = 10  // should be enough

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


function printPaperWalletBasedOnEntropy(buffer, startAddressIdx, addressCount) {
  console.log('\033[2J');  // clear terminal

  console.log(banner);  // show beautiful banner

  if (buffer) {
    console.log('Random seed:');
    console.log('=======================');
    console.log(buffer.toString('hex'));
  }

  let mnemonic = bip39.entropyToMnemonic(buffer);  // get mnemonic phrase

  if (!bip39.validateMnemonic(mnemonic)) {
    console.log('Invalid mnemonic pass phrase!');
    process.exit(1);
  }

  console.log('\r\nBIP 39 mnemonic phrase:');
  console.log('===============================');

  // beautiful output for mnemonic phrase
  const words = mnemonic.split(' ');
  let mnemonicStrings = '';
  let columns = 0;
  for (let w = 0; w < words.length; w++) {
    mnemonicStrings = mnemonicStrings + " " + words[w];
    columns++;
    if (columns == 6) {
      console.log(mnemonicStrings);
      mnemonicStrings = '';
      columns = 0;
    }
  }

  console.log('===============================\r\n');

  // generate HD Wallet root based on seed, extracted from mnemonic phrase
  const seed = bip39.mnemonicToSeed(mnemonic);
  const root = bitcoin.HDNode.fromSeedBuffer(seed);

  // derive addressCount addresses and print out them along
  // with private keys in WIF format

  for (let i = 0; i < addressCount; i++) {
    let index = startAddressIdx + i;
    const derived = root.derivePath("m/0'/0/" + index.toString());
    console.log('Address #' + index + ':                 ' + derived.getAddress());
    console.log('Private key in WIF format: ' + derived.keyPair.toWIF() + '\r\n');
  }

  // how to instruction
  console.log(instruction);
}



if (process.argv.indexOf('open') >= 0) { // open wallet instead of generation
  let argCount = parseInt(process.argv[process.argv.indexOf('open') + 1])
  let argStartAddressIdx = parseInt(process.argv[process.argv.indexOf('open') + 2])

  console.log('\033[2J');  // clear terminal
  console.log('Type down your mnemonic phrase, word-by-word and then press Enter:');
  process.stdin.on('data', function(data){
    const userInput = data.toString();
    const sanedInput = userInput.replace('\n', '').replace('\r','').split(' ').join(' ');
    try {
      printPaperWalletBasedOnEntropy(bip39.mnemonicToEntropy(sanedInput), argStartAddressIdx || startAddressIdx, argCount || addressCount);
    } catch (error) {
      console.log('[ERR] Invalid mnemonic. Try re-check all words in mnemonic phrase and type them again!');
    }
  });
} else {
  let argCount = parseInt(process.argv[process.argv.length - 1])
  crypto.randomBytes(32, function(err, buffer){
    printPaperWalletBasedOnEntropy(buffer, 0, argCount || addressCount);
  })
}
