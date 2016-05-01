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

  if (this.props.isActive === false) {
    showActive = 75;
    // sweetTint = '#000000'
  }
  else {
    showActive = 90;
  }

  const fanStyles = StyleSheet.create({
    fanImage: {
      //margin: 10,
      width: showActive,
      height: showActive
    },
    selected: {
      // backgroundColor: showActive,
      borderRadius: 4,
      width: showActive,
      height: showActive
      // tintColor: sweetTint
    },
    container: {
      flexDirection: 'row',
      flex: 1,
      // backgroundColor: '#e7e7e7',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 60

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