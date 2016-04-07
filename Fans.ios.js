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

  let showActive

  if (this.props.isActive === false) {
    showActive = '#FFFFFF'
    sweetTint = '#000000'
  }
  else {
    showActive = '#003399'
    sweetTint = '#FFFFFF'
  }

  const fanStyles = StyleSheet.create({
    fanImage: {
      margin: 10,
      width: 20,
      height:10
    },
    selected: {
      backgroundColor: showActive,
      borderRadius: 4,
      tintColor: sweetTint
    },
    container: {
      flex: 1,
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
            style= {fanStyles.fanImage, fanStyles.selected}
          />
        </TouchableOpacity>
      </View>
    );
  }
};

export default Fans;