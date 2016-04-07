import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import classnames from 'classnames';
import Fans from './Fans'
let classNames = require('classnames');
let image1 = require('./src/images/1.png')
let image2 = require('./src/images/2.png')
let image3 = require('./src/images/3.png')
let fan1audio = require('./src/audio/1.mp3')
let fan2audio = require('./src/audio/2.mp3')
let fan3audio = require('./src/audio/3.mp3')
let Sound = require('react-native-sound');

// let whoosh = new Sound('1.mp3', Sound.MAIN_BUNDLE, (error) => {
//   if (error) {
//     console.log('failed to load the sound', error);
//   } else { // loaded successfully 
//     console.log('duration in seconds: ' + whoosh.getDuration() +
//         'number of channels: ' + whoosh.getNumberOfChannels());
//   }
// });



export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    // this.startFan = this.startFan.bind(this)
    this.state = {
      fans:[
        { src: image1,
          fan: 1,
          isActive: false,
          audio: './src/audio/1.mp3'
        },
        { src: image2,
          fan: 2,
          isActive: false,
          audio: './src/audio/2.mp3'
        },
        {
          src: image3,
          fan: 3,
          isActive: false,
          audio: '/src/audio/3.mp3'
        }
      ]
    }
    this.handleTouch = this.handleTouch.bind(this);
    this.playAudio = this.playAudio.bind(this)
  }

  handleTouch(fan) {
    //alert(fan)
    this.playAudio(fan)
    let fansArr = this.state.fans;
    for (var i=0;i<fansArr.length;i++) {
      let active = !fansArr[i].isActive

      if (fan === fansArr[i].fan) {
        fansArr[i].isActive = active;
      }
      else{fansArr[i].isActive = false}
    }

    this.setState({fans : fansArr});
  }

  playAudio(fan) {
   // alert("asdsad")
//    whoosh.play((success) => {
//   if (success) {
//     console.log('successfully finished playing');
//   } else {
//     console.log('playback failed due to audio decoding errors');
//   }
// });
    //fan1Audio.play()
    //console.log(fan)
   // if (!this.state.fans[fan-1].isActive) {
     // player.play(this.state.fans[fan-1].audio);
   // }
   // else {player.pause()}
  }

  render() {
    let fans = this.state.fans.map((fan) => {
      return(<Fans key={fan.fan} 
              fanNum={fan.fan} 
              source={fan.src} 
              onPress={this.handleTouch}
              isActive={fan.isActive} />);
    })

    return (
      <View>
        {fans}
      </View>
    );
  }
};

export default MainComponent;