import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  SliderIOS
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
        <SliderIOS
          onValueChange={(value) => {
            this.setState({value:value})
            // this.props.onChange(value)
          }
          }
          step={.01}
        />
        <Text>
        The volume is set to {volume}
        </Text>
      </View>
    );
  }
};

export default VolumeSlider;