import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Slider
} from 'react-native';

export default class VolumeSlider extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {value:0}
    //this.handleChange = this.handleChange.bind(this)
  }

  render() {
    let volume = this.state.value
    return (
      <View>
        <Slider
          onValueChange={(value) => {
            this.setState({value:value})
            // this.props.onChange(value)
          }
          }
          step={.25}
        />
        <Text>
        The volume is set to {volume}
        </Text>
      </View>
    );
  }
};

export default VolumeSlider;