import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import transfer from '../abis/transfer.json';
import Navbar from './Navbar.js'
import Main from './Main.js'
import SimpleReactFileUpload from './test'

class App extends Component {
  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
 
  async loadWeb3(){
      if(window.ethereum){
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      }
      else if(window.web3){
        window.web3 = new Web3(window.web3.currentProvider)
      }
      else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
  }
  async loadBlockchainData(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
    const networkID = await web3.eth.getId()
    
    const networkData = transfer.networks[networkID]
    if(networkData)
    {
    const address = networkData.address;
    const abi = transfer.abi
    const t = web3.eth.Contract(abi,address)
    this.setState({t})
    this.setState({loading:false})
    const image= await this.state.t.methods.persons(this.state.account).call()
    
    this.setState({imageCount:image.toString()})
    for( var i=1;i<=this.state.imageCount;i++)
    {
      const yy= await this.state.t.methods.Images(this.state.account,i).call();
      this.setState({images : [...this.state.images,yy]})
    }
    }
    
  }
  constructor(props)
  {
    super(props)
    this.state = {
      account:'',
      imageCount: 0,
      images: [],
      loading: true
    }
    this.addImage = this.addImage.bind(this)
    this.transferImage=this.transferImage.bind(this)
  }
  addImage(name){
    this.setState({loading:true})
    this.state.t.methods.addImage(name).send({from:this.state.account,gas:3000000})
    .once('receipt',(receipt) => {
      this.setState({loading:false})
    })
  }

  async transferImage(id,address){
    this.setState({loading:true})
    let done = await this.state.t.methods.transferImage(id,address).send({from:this.state.account,gas:3000000});
    this.setState({loading: false});

  }

  render() {
    return (
      <div>
        <Navbar account = {this.state.account} />
        <div className='container-fluid mt-5'>
          <div id='centre' >
          </div>
        <canvas id="canvas"></canvas>
          <div className='row'>
          <main role='main' className='col-lg-12 d-flex'>
          <SimpleReactFileUpload />
          </main>

            <main role='main' className='col-lg-12 d-flex'>
              
              {this.state.loading ? <p>Loading...</p>: <Main addImage={this.addImage} transferImage={this.transferImage} imageCount={this.state.imageCount } imagearr={this.state.images} address={this.state.address} />}
              
            </main>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
