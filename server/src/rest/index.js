const {web3} = require("../../besu_utils/web3")

var SolidityEvent = require("web3/lib/web3/event.js");
const abi = require("../../contracts/ENSRegistry/abi-ensRegistry").ensRegistry

const {FROM,TO} = require("../../keys")

const fromBlock = parseInt(FROM)
const toBlock = TO == 'latest' ? "latest" : parseInt(TO)

console.log(".....STARTING .....")

const LogParser = function (logs, abi) {
    var decoders = abi.filter(function (json) {
        return json.type === 'event';
    }).map(function(json) {
        return new SolidityEvent(null, json, null);
    });

    return logs.map(function (log) {
        return decoders.find(function(decoder) {
            return (decoder.signature() == log.topics[0].replace("0x",""));
        }).decode(log);
    })
}

const web3filter = web3.eth.filter({
  fromBlock,
  toBlock,
  topics:[[web3.sha3('NewOwner(bytes32,bytes32,address)')]]
})

console.log(`Filtering from block ${fromBlock} to block ${toBlock}`)
//measure time:
const tPrevious=Date.now()
let tFinal
//executing the function
web3filter.get((error, logs) => {  
  if (error){
    console.log(error);
  } else {
    let newLogs = LogParser(logs, abi);
    console.log(newLogs);
  }

  tFinal=Date.now()
  console.log("response time",(tFinal-tPrevious)/1000, "seconds")  
})