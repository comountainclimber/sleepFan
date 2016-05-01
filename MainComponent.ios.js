import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  SliderIOS,
  Image,
} from 'react-native';
import classnames from 'classnames';
import Fans from './Fans'
// import VolumeSlider from './VolumeSlider'
let classNames = require('classnames');
let image1 = require('./src/images/3.png')
let image2 = require('./src/images/4.png')
let image3 = require('./src/images/5.png')

let trackImage1 = require('./src/images/rec.png')
// let thumbImage2 = require('./src/images/volume-slide.png')
let thumbImage2 = require('./src/images/volumeslider.png')
let volumeControls = require('./src/images/volumecontrols.png')

let Sound = require('react-native-sound');
let fan1Audio= new Sound('./audio/1.mp3', Sound.MAIN_BUNDLE)
let fan2Audio= new Sound('./audio/2.mp3', Sound.MAIN_BUNDLE)
let fan3Audio= new Sound('./audio/3.mp3', Sound.MAIN_BUNDLE)

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    // this.startFan = this.startFan.bind(this)
    this.state = {
      volume: 0,
      fans:[
        { src: image1,
          fan: 1,
          isActive: true,
          audio: fan1Audio,
          activeColor: "#b8eef6"
        },
        { src: image2,
          fan: 2,
          isActive: false,
          audio: fan2Audio,
          activeColor: "#69bcf1"
        },
        {
          src: image3,
          fan: 3,
          isActive: false,
          audio: fan3Audio,
          activeColor: "#6b85d0"
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
    // for (var i=0;i<fansArr.length;i++) {
    //   let active = !fansArr[i].isActive

    //   if (fan === fansArr[i].fan) {
    //     fansArr[i].isActive = active;
    //   }
    //   else{fansArr[i].isActive = false}
    // }
    for (var i=0; i<fansArr.length; i++) {
      if (fan === fansArr[i].fan) {
        fansArr[i].isActive = true
      }
      else {
        fansArr[i].isActive = false
      }
    }

    this.setState({fans : fansArr});
    //this.playAudio(fan)
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
  const NUM_OF_FANS = this.state.fans.length;

  const fanStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flex: 1,
      // backgroundColor: '#e7e7e7',
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    selectedFanImage: {
      height: 250,
      width: 250,
      marginTop: 50
    },
    selectedFanImageContainer: {
            justifyContent: 'center',
      alignItems: 'center'
    },
    sliderView: {
      paddingRight: 20,
      paddingLeft: 20,
      marginTop: 15
    },
    volumeSettings: {
                  justifyContent: 'center',
      alignItems: 'center',
            paddingRight: 40,
      paddingLeft: 20,
      marginTop:40,
      alignItems: 'stretch',
      flex:1
    },
    // offSetting: {
    //   fontSize: 30,
    //   color: '#D8D8D8'
    // }

  });

    for (var i=0;i<NUM_OF_FANS;i++){
      this.state.fans[i].audio.setVolume(this.state.volume)
    }

    let selectedFanImage;

    for (var i=0;i<NUM_OF_FANS;i++) {
      if (this.state.fans[i].isActive === true) {
        selectedFanImage = this.state.fans[i].src;
        break;
      }
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
        <View style={fanStyles.selectedFanImageContainer}>
          <Image style={fanStyles.selectedFanImage} source={selectedFanImage} />
        </View>
        <View style={fanStyles.container}>
          {fans}
        </View>
        <View style={[fanStyles.volumeSettings]}>

          <Image resizeMode="contain" style={{width:350, height:27}} source={volumeControls}/>

        </View>
        <View style={fanStyles.sliderView}>
          <SliderIOS
             trackImage = {trackImage1}
             thumbImage = {thumbImage2}

            onValueChange={
              (value) => {
                this.setState({volume: value})
                // this.playAudio()
              }
            }
                value={this.state.volume}
                step={.34}
          
          />
        </View>
      </View>

    );
  }
};

export default MainComponent;