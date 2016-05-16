/**
 * LoadingView
 */
'use strict';

var React = require('react-native');
let fan1Prop = require('../images/animation/3prop.png')

var {
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Image,
  View,
  Easing
} = React;

var TIMES;

var RotatingPropeller = React.createClass({

  getInitialState() {
    return {
      angle: new Animated.Value(0),
    };
  },

  componentDidUpdate() {
    this._animate(this.props.speed);
  },

  _animate(speed) {
    // if (TIMES > 0) {

      console.log(speed)
      if (speed > 0) {
    this.state.angle.setValue(0);
    this._anim = Animated.timing(this.state.angle, {
      toValue: 1000 * speed,
      duration: 1000,
      easing: Easing.linear
    }).start(() => {
    this._animate(this.props.speed);
  })
  }
  },

  render() {
    return (
      <View>
          <Animated.Image
            source={this.props.propImage}
            style={[
              styles.rotateCard,
              {transform: [
                {rotate: this.state.angle.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg']
                })},
              ]}]}>
          </Animated.Image>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  rotateCard: {
      height: 250,
      width: 250,
      position: 'absolute',
      top:50,
    }
});


module.exports = RotatingPropeller;