import React, { Component } from 'react';
import { TextField, RadioGroup, SelectField } from '../../components';
import {
  SPORTS,
  CRICKETOPTIONS,
  FOOTBALLOPTIONS,
  CRICKET,
  FOOTBALL,
} from '../../configs/constants';

class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      Sport: '',
      Cricket: '',
      Football: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  handleSportsChange = (event) => {
    this.setState({
      Sport: event.nativeEvent.target.value,
      Cricket: '',
      Football: '',
    });
  }

  handlePositionChange = (event) => {
    const { Sport } = this.state;
    this.setState({
      Cricket: (Sport === CRICKET) ? event.nativeEvent.target.value : '',
      Football: (Sport === FOOTBALL) ? event.nativeEvent.target.value : '',
    });
  }

  renderCricket = () => {
    const { Sport, Cricket } = this.state;
    if (Sport !== CRICKET) {
      return null;
    }
    return (
      <div>
        <h4>What you do?</h4>
        <RadioGroup
          value={Cricket}
          options={CRICKETOPTIONS}
          onChange={this.handlePositionChange}
        />
      </div>
    );
  }

  renderFootball = () => {
    const { Sport, Football } = this.state;
    if (Sport !== FOOTBALL) {
      return null;
    }
    return (
      <div>
        <h4>What you do?</h4>
        <RadioGroup
          value={Football}
          options={FOOTBALLOPTIONS}
          onChange={this.handlePositionChange}
        />
      </div>
    );
  }

  render() {
    const { value, Sport } = this.state;
    console.log(this.state);
    return (
      <>
        <h3>Name</h3>
        <TextField value={value} onChange={this.handleNameChange} />
        <h3>Select the game you play?</h3>
        <SelectField
          value={Sport}
          onChange={this.handleSportsChange}
          options={SPORTS}
        />
        {this.renderCricket()}
        {this.renderFootball()}
      </>
    );
  }
}
export default InputDemo;
