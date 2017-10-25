# Hipaper
Bitcoin Paper HD Wallet generator for people

# Usage
1. Clone the repository
2. Run `npm install`
3. Run `npm start`

TODO: Turn all this stuff into the wallet that can be used from within the browser.

# How this works 
Hipaper based on the bulletproof library called `bitcoinjs-lib`. It uses `crypto` for generating random seed. 
Then from the random seed according to BIP 39 spec the mnemonic phrase build and then the HD Wallet generated based on the seed (see corresponding https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki).

Additionally, Hipaper shows you private keys for first 5 derived Bitcoin addresses.

# What's the chip?
1. You can safely store all of your Bitcoin addresses using mnemonic phrase.
2. The wallet shows to you the private keys for derived addresses, so you can freely use them as usual.
3. In the case one of your private keys compromissed, you can freely generate then next Bitcoin address based on the mnemonic,
because you really kept safely the mnemonic phrase and you love Bitcoin.
4. I gonna build something that your granny could use, not all that ugly buggy wallets. 
I am unbeliever and I can't trust to something that looks and works ugly. Probably this thing works the same way, so I highly
recommend to be sceptical and use it at your own risk, until the more proven solution will be built.

# Motivation
Everyone could tell you about storing your Bitcoins: use hardware wallets, use bitaddress or whatever. 
All this stuff is great, it's built by smart people and so on. We have to respect makers of this stuff, 
at least because it is hard to build something from the ground up, even with billions of cash in your pocket 
and great co-workers.
But hardware could be stolen and you can get a bunch of problems from customs traveling across the borders 
of the country staying against the cryptocurrencies and people.
Private keys are good, when you have only one. Otherwise, you will become a paranoid and the human factor 
will catch his steak over your human's essence and imperfection.
We need less clever but better secured and transparent tools to store and use Bitcoins. 
Nothing better than offline wallets has been created.

This little utility is a first step to turn this resentment into better way to store and manage 
Bitcoins and to generate paper wallets. 

# Thanks
Many thanks to people behind https://bitcoinjs.org

# Plans
I'm going to make 'yet another Bitcoin wallet' which will try again to overcome Zooco's triangle.
This version of Hipaper is far from perfect: it requires from you installing of potentially insecure software; 
it has no features, just generating wallets. I believe that this message will find you and you start following this repo for new updates.

Consider a little donation or at least create an issue in the tracker if you caught up!

BTC for donations: 18cqdgBAQoQpskvx2s1oE4b7yuzHA2faRv
