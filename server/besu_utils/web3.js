const Web3 = require('web3')
const {RPC_URL} =  require('../keys')
const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))

module.exports = {web3}