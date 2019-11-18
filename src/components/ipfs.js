var IPFS =  require('ipfs-http-client');
var ipfs = IPFS('ipfs.infura.io', '5001', {protocol: 'https'}) 

export default ipfs;