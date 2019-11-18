import React from 'react'
import axios, { post } from 'axios';
import ipfs from './ipfs.js';

class SimpleReactFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file1:null,
      file2:null,
      hash:""
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.captureFile = this.captureFile.bind(this)
  }
  async onFormSubmit(e){
    e.preventDefault() // Stop form submit
    await this.fileUpload(this.state.file1).then((response)=>{
      this.setState({resp: response.data[0].symbol[0].data});
    })
    await ipfs.add(this.state.buffer).then((res)=>{
    this.setState({hash:res[0].hash});
    })
    if(this.state.hash == this.state.resp)
    alert("true")
    else
    alert("false")
    console.log(this.state.hash)
    console.log(this.state.resp)
  }
  onChange(e) {
    this.setState({file1:e.target.files[0]})
  }
  fileUpload(file){
    const url = 'http://api.qrserver.com/v1/read-qr-code/';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
  }
  captureFile(event){
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () =>{
     this.setState({buffer:Buffer(reader.result)})
    }
  }

  render() {
    return (
      <div id='content'>
      <div className="App">
      <form onSubmit={this.onFormSubmit}>
        <h1>Compare</h1>
        <h6>Upload Qrcode:</h6>
        <input type="file" onChange={this.onChange} />
        <br />
        <h6>Upload Image:</h6>
        <input type="file" onChange={this.captureFile} />
        <button type="submit">Upload</button>
      </form>
      </div>
      </div>
   )
  }
}
export default SimpleReactFileUpload;