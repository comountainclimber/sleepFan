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

let classNames = require('classnames');
let image1 = require('./src/images/3.png')
let image2 = require('./src/images/4.png')
let image3 = require('./src/images/5.png')
let trackImage1 = require('./src/images/rec.png')
let trackImage2 = require('./src/images/rec2.png')
let trackImage3 = require('./src/images/rec3.png')
let currentTrackImage = trackImage1
let thumbImage2 = require('./src/images/volumeslider.png')
let volumeControls = require('./src/images/volumecontrols.png')
let vol1 = require('./src/images/vol1.png')
let vol2 = require('./src/images/vol2.png')
let vol3 = require('./src/images/vol3.png')
let Sound = require('react-native-sound');
let fan1Audio = new Sound('./audio/1.mp3', Sound.MAIN_BUNDLE)
let fan2Audio = new Sound('./audio/2.mp3', Sound.MAIN_BUNDLE)
let fan3Audio = new Sound('./audio/3.mp3', Sound.MAIN_BUNDLE)

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 0,
      fans:[
        { src: image1,
          fan: 1,
          isActive: true,
          audio: fan1Audio,
          activeColor: "#b8eef6",
          trackImage: trackImage1
        },
        { src: image2,
          fan: 2,
          isActive: false,
          audio: fan2Audio,
          activeColor: "#69bcf1",
          trackImage: trackImage2
        },
        {
          src: image3,
          fan: 3,
          isActive: false,
          audio: fan3Audio,
          activeColor: "#6b85d0",
          trackImage: trackImage3
        }
      ]
    }
    this.handleTouch = this.handleTouch.bind(this);
    this.handleVolume = this.handleTouch.bind(this);
    this.playAudio = this.playAudio.bind(this)
  }

  handleTouch(fan) {
    let fansArr = this.state.fans;
    this.setState({volume: 0})
    for (var i=0; i<fansArr.length; i++) {
      if (fan === fansArr[i].fan) {
        fansArr[i].isActive = true
        currentTrackImage = fansArr[i].trackImage
      }
      else {
        fansArr[i].isActive = false
      }
    }
    this.setState({fans : fansArr});
  }

  playAudio(fan) {
    console.log(fan)
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
      marginTop: 15,
    },
    volumeSettings: {
      flex:1,
      flexDirection: 'row',
      marginTop:40,
    },
    offSetting: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 30,
      color: '#D8D8D8',
      flex: 1
    },
    volumeIcon: {
      height:36,
      width: 55,
      flex: 1
    }

  });


  //update the volume everytime render is called
    for (var i=0;i<NUM_OF_FANS;i++){
      this.state.fans[i].audio.setVolume(this.state.volume)
    }

    let selectedFanImage;
    let currentFan;

    for (var i=0;i<NUM_OF_FANS;i++) {
      if (this.state.fans[i].isActive === true) {
        selectedFanImage = this.state.fans[i].src;
        currentFan = this.state.fans[i].fan
        break;
      }
    }
    
    //map over our fans array and assign props
    let fans = this.state.fans.map((fan) => {
      return(<Fans key={fan.fan} 
              fanNum={fan.fan} 
              source={fan.src} 
              onPress={this.handleTouch}
              isActive={fan.isActive} />);
    })

    return (
      <View>
        <View style={fanStyles.selectedFanImageContainer}>
          <Image style={fanStyles.selectedFanImage} source={selectedFanImage} />
        </View>
        <View style={[fanStyles.volumeSettings]}>
          <Text style={fanStyles.offSetting}>
            OFF 
          </Text>
          <Image style={fanStyles.volumeIcon} resizeMode="contain" source={vol1}/>
          <Image style={fanStyles.volumeIcon} resizeMode="contain" source={vol2}/>
          <Image style={fanStyles.volumeIcon} resizeMode="contain" source={vol3}/>
        </View>
        <View style={fanStyles.sliderView}>
          <SliderIOS
            trackImage = {currentTrackImage}
            thumbImage = {thumbImage2}
            onValueChange={
              (value) => {
                this.setState({volume: value})
                this.playAudio(currentFan)
              }
            } 
            value={this.state.volume}
            step={.34}
          />
        </View>
        <View style={fanStyles.container}>
          {fans}
        </View>
      </View>
    );
  }
};

export default MainComponent;