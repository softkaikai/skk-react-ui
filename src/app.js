import React, { Component } from 'react';
import styled from 'styled-components';
import { width } from 'styled-system';
import PropTypes from 'prop-types';

import { Slider } from './slider/slider';

const Button = styled('button')({
    color: 'red',
}, width);

/*Button.propTypes = {
    width: PropTypes.symbol,
    name: PropTypes.string
};*/

/*const Button = styled.button`
    color: red;
    ${width}
`*/


export default class App extends Component{

    change = (value) => {
        console.log(value);
    }
    render() {
        return <div>
            <Button width={100} name={123}>123123</Button>
            <div style={{marginTop: '10px', marginLeft: '50px'}}>
                <Slider sliderMoveEnd={this.change}></Slider>
            </div>
        </div>
    }
}
