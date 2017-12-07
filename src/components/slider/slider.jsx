import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded',function(){



    //Slider button
    class SliderButton extends React.Component{
        handleClick = () => {
            if(typeof this.props.onClick === 'function'){
                this.props.onClick();
            } else {
                console.log('Error, It is not a function for button click event handler');
            }
        }
        render(){
            return (
                <button className='slider__button' onClick={this.handleClick}>{this.props.text}</button>
            );
        }
    }


    //Single slide
    class SingleSlide extends React.Component{
        render(){
            return(
                <img className='slider__slideContent' src={this.props.path}></img>
            );
        }
    }


    //Main Slider app
    class Slider extends React.Component{
        constructor(props){
            super(props);
            this.state={
                counter:1
            }
        }
        //Handler click event on button next - next slide show
        handleClickNext = () => {
            this.clearTimers();
            this.showNextSlide();
            //start slide show
            this.mainSlideShow = setInterval(()=>{
                this.showNextSlide();
            },1500);
        }
        //Handler click event on button previous - previous slide show
        handleClickPrev = () => {
            this.clearTimers();
            if(this.state.counter===1){
                this.setState({
                    counter:this.props.numberOfImages
                });
            } else {
                this.setState({
                    counter:this.state.counter - 1
                });
            }
            //start slide show
            this.mainSlideShow = setInterval(()=>{
                this.showNextSlide();
            },1500);
        }
        //Method that handle next slide show
        showNextSlide = () => {
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
        //Method that clear all timers in app
        clearTimers = () => {
            clearInterval(this.initSlideShow);
            clearInterval(this.mainSlideShow);
        }
        componentDidMount(){
            //start init slide show
            this.initSlideShow = setInterval(()=>{
                this.showNextSlide();
            },1500);
        }
        componentWillUnmount(){
            this.clearTimers();
        }
        render(){
            let pathToImage=`${this.props.path}${this.state.counter}.${this.props.type}`;
            return(
                <section className='slider'>
                    <div key='slider-container' className='slider__container'>
                        <div key='slider-row' className='slider__row'>
                            <div key='slider-col1' className='slider__col-sm2'>
                                <SliderButton key='buttonPrev' onClick={this.handleClickPrev} text="&lt;"/>
                            </div>
                            <div key='slider-col2' className='slider__col-sm8'>
                                <SingleSlide path={pathToImage}/>
                            </div>
                            <div key='slider-col3' className='slider__col-sm2'>
                                <SliderButton key='buttonNext' onClick={this.handleClickNext} text="&gt;"/>
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
