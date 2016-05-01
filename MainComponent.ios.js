import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  SliderIOS
} from 'react-native';
import classnames from 'classnames';
import Fans from './Fans'
import VolumeSlider from './VolumeSlider'
let classNames = require('classnames');
let image1 = require('./src/images/3.png')
let image2 = require('./src/images/4.png')
let image3 = require('./src/images/5.png')

let Sound = require('react-native-sound');
let fan1Audio= new Sound('./audio/1.mp3', Sound.MAIN_BUNDLE)
let fan2Audio= new Sound('./audio/2.mp3', Sound.MAIN_BUNDLE)
let fan3Audio= new Sound('./audio/3.mp3', Sound.MAIN_BUNDLE)

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    // this.startFan = this.startFan.bind(this)
    this.state = {
      volume: 1.0,
      fans:[
        { src: image1,
          fan: 1,
          isActive: false,
          audio: fan1Audio
        },
        { src: image2,
          fan: 2,
          isActive: false,
          audio: fan2Audio
        },
        {
          src: image3,
          fan: 3,
          isActive: false,
          audio: fan3Audio
        }
      ]
    }
    this.handleTouch = this.handleTouch.bind(this);
    this.handleVolume = this.handleTouch.bind(this);
    this.playAudio = this.playAudio.bind(this)
  }

  handleTouch(fan) {
    //alert(fan)
    let fansArr = this.state.fans;
    for (var i=0;i<fansArr.length;i++) {
      let active = !fansArr[i].isActive

      if (fan === fansArr[i].fan) {
        fansArr[i].isActive = active;
      }
      else{fansArr[i].isActive = false}
    }
    this.setState({fans : fansArr});
    this.playAudio(fan)
  }

  playAudio(fan) {
  let currentFan = this.state.fans[fan-1]
  if (currentFan.isActive) {
      for(var i=0;i<this.state.fans.length; i++) {
        this.state.fans[i].audio.stop()
      }
      //currentFan.audio.setVolume(this.state.volume)
      currentFan.audio.setNumberOfLoops(-1)
      currentFan.audio.play()
    }
    else {
      currentFan.audio.stop()
    }
  }

  handleVolume(value) {
    console.log("changing")
     // this.setState({volume: value})
  }

  render() {

  const fanStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flex: 1,
      // backgroundColor: '#e7e7e7',
      // justifyContent: 'center',
      // alignItems: 'center',
    }
  });

    for (var i=0;i<this.state.fans.length;i++){
      this.state.fans[i].audio.setVolume(this.state.volume)
    }
    
    let fans = this.state.fans.map((fan) => {
      return(<Fans key={fan.fan} 
              fanNum={fan.fan} 
              source={fan.src} 
              onPress={this.handleTouch}
              isActive={fan.isActive} />);
    })

    let volume = this.state.volume
    return (
      <View>
        <View style={fanStyles.container}>
          {fans}
        </View>
        <SliderIOS

          onValueChange={
            (value) => {
              this.setState({volume: value})
              // this.playAudio()
            }
          }
              value={this.state.volume}
              step={.1}
        
        />
        <Text>
        The volume is set to {volume}
        </Text>
      </View>

    );
  }
};

export default MainComponent;