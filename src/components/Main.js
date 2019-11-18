import React, { Component } from 'react';
import ipfs from './ipfs.js';
class Main extends Component
{
    constructor(props){
        super(props);

        this.captureFile = this.captureFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.runExample2=this.runExample2.bind(this);
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
    async onSubmit(event){
        event.preventDefault();
        const res = await ipfs.add(this.state.buffer);
        this.runExample2(res[0].hash)
      }
     async runExample2(result){
        this.props.addImage(result)
        var win = window.open("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+result, '_blank');
        win.focus();
      };
        render(){
            return(
                <div id='content'>
                <div className="App">
                    <h1>Upload Image</h1>
                    <form onSubmit ={this.onSubmit}>
                        <input type="file" onChange={this.captureFile}/>
                        <input type="submit" />
                    </form>
                </div>
                <h1> Transfer Image </h1>
                {this.props.imagearr.map((product,key) => {
                    return(
                        <div>
                            {product.owner ? 
                        <form id={key} key={key} onSubmit={ (event) => {
                            event.preventDefault()
                             const id= key+1;
                            const address = this.refs[`addr${key}`].value;
                            this.props.transferImage(id,address)
                        
                        }}>
                            <div className='form-group mr-sm-2' ref={`id${key}`}>
                                <img id= {key} src= {`https://ipfs.io/ipfs/${product.name}`} alt="" width="150px"/>
                            </div>
                            <div className='form-group mr-sm-2'>
                                <input id={product} ref={`addr${key}`} placeholder='Address to Transfer'/>
                            </div>
                            <button id={product.name} type='submit' className='btn btn-primary'>Transfer Image</button>
                        </form>
                        : null}
                        </div>
                    )
                })}
                
             </div>
            );
        }
}
export default Main;