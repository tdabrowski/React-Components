import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

document.addEventListener('DOMContentLoaded',function(){

const animals = [
    'Human characterized by erect posture and bipedal locomotion, high manual dexterity and heavy tool use compared to other animals.',
    'Rhinocerotidae one of any five extant species of odd-toed ungulates in the family Rhinocerotidae, as well as any of the numerous extinct species.',
    'Gorillas are ground-dwelling, predominantly herbivorous apes that inhabit the forests of central Sub-Saharan Africa.',
    'Tiger is largest cat species, most recognizable for their pattern of dark vertical stripes on reddish-orange fur with a lighter underside.',
    'They are often called house cats when kept as indoor pets or simply cats when there is no need to distinguish them from other felids and felines.',
    'Leopard  large cat native to the mountain ranges of Central and South Asia. It is listed as Vulnerable on the IUCN Red List of Threatened Species.'

];

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
                <ReactCSSTransitionGroup
                    transitionName="slide"
                    transitionAppear = {true}
                    transitionAppearTimeout = {500}
                    transitionEnterTimeout={500}
                    transitionLeave={false}>
                    <div key={this.props.path} className='slider__slideContent' style={{backgroundImage:`url(${this.props.path})`}}>
                        <h1>INHABITANTS OF THE EARTH</h1>
                        <p>{this.props.text}</p>
                    </div>
                </ReactCSSTransitionGroup>
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
            },2500);
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
            },2500);
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
            },2500);
        }
        componentWillUnmount(){
            this.clearTimers();
        }
        render(){
            let pathToImage=`${this.props.path}${this.state.counter}.${this.props.type}`;
            let text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
            return(
                <section className='slider'>
                    <div key='slider-container' className='slider__container'>
                        <div key='slider-row' className='slider__row'>
                            <div key='slider-col1' className='slider__col-sm2'>
                                <SliderButton key='buttonPrev' onClick={this.handleClickPrev} text="&lt;"/>
                            </div>
                            <div key='slider-col2' className='slider__col-sm8'>
                                <SingleSlide path={pathToImage} text={this.props.slideText[this.state.counter-1]}/>
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
        <Slider numberOfImages={6} path='./images/' type='jpeg' slideText={animals}  / >,
        document.getElementById('app')
    );
});
