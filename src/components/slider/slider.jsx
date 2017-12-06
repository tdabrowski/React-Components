import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded',function(){


    class Slider extends React.Component{
        constructor(props){
            super(props);
            this.state={
                counter:1
            }

        }

        handleClickNext = () => {
            if(this.state.counter===this.props.numberOfImages){
                this.setState({
                    counter:1
                });
            } else {
                this.setState({
                    counter:this.state.counter + 1
                });
            }
        }

        handleClickPrev = () => {
            if(this.state.counter===1){
                this.setState({
                    counter:this.props.numberOfImages
                });
            } else {
                this.setState({
                    counter:this.state.counter - 1
                });
            }
        }

        render(){
            let items = [];
            for(let i=1; i <= this.props.numberOfImages; i++){
                let path=`${this.props.path}${i}.${this.props.type}`;
                if(i===this.state.counter){
                    items.push(
                        <li key={i} className='slider__item' style={{display:'flex'}}>
                            <img key={i} src={path}></img>
                        </li>
                    );
                } else {items.push(
                    <li key={i} className='slider__item'>
                        <img key={i} src={path}></img>
                    </li>
                    );
                }

            }
            return(
                <section className='slider'>
                    <div className='slider__container'>
                        <div className='slider__row'>
                            <div className='slider__col-sm2'>
                                <button className='slider__button' key={1} onClick={this.handleClickPrev}>&lt;</button>
                            </div>
                            <div className='slider__col-sm8'>
                                <ul className='slider__list'>
                                    {items}
                                </ul>
                            </div>
                            <div className='slider__col-sm2'>
                                <button className='slider__button' key={2} onClick={this.handleClickNext}>&gt;</button>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
    }

    ReactDOM.render(
        <Slider numberOfImages={6} path='./images/' type='jpeg'/>,
        document.getElementById('app')
    );
});
