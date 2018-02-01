import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded',function(){

    class Hidden extends React.Component {
      render(){
        let hiddenElement;
        if(this.props.control){
          return <div className="container" style={{backgroundColor:'red'}}>
            <h1>Hidden Element</h1>
          </div>
        } else {
          return null;
        }
      }
    }

    class Checkbox extends React.Component {
			constructor(props){
				super(props);
				this.state = {control: false,
				styl:{left:'2px'}}
			}
			inputHandler = () => {
				this.setState({
					control:!this.state.control
				}, ()=>{
				(this.state.control)?this.setState({styl:{left:'20px'}}):this.setState({styl:{left:'2px'}});});
			}
      render(){
        return <div>
					<div className="container">
						<div className="inputDiv">
							<input className="input" style={{opacity:'0.01'}} type="checkbox" onClick={this.inputHandler} value={this.state.control}/>
							<span className="span" style={this.state.styl}></span>
						</div>
					</div>
          <Hidden control={this.state.control}/>
        </div>
      }
    }

    ReactDOM.render(
      <Checkbox/>,
      document.getElementById('app')
    );

  });
