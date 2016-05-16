import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import classnames from 'classnames';
let classNames = require('classnames');


export default class Fans extends React.Component {
  
  render() {

  let showActive;
  let activeColor;

  if (this.props.isActive === false) {
    showActive = 75;
    activeColor = 'transparent'
  }
  else {
    showActive = 90;
    activeColor = this.props.border
  }

  const fanStyles = StyleSheet.create({
    fanImage: {
      width: showActive,
      height: showActive,
      borderColor: activeColor,
    },
    selected: {
      borderRadius: 4,
      width: showActive,
      height: showActive,
      borderColor: activeColor,
      borderWidth: 5,
      borderRadius: 45
    },
    container: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

    return (
      <View style={fanStyles.container}>
        <TouchableOpacity onPress={ (e) => {
              this.props.onPress(this.props.fanNum)
            }}>
          <Image 
            source={this.props.source}
            fanNum={this.props.key} 
            style= {[fanStyles.fanImage, fanStyles.selected]}
          />
        </TouchableOpacity>
      </View>
    );
  }
};

export default Fans;