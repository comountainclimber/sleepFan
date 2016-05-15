import React, {
  TouchableWithoutFeedback,
  Animated,
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  SliderIOS,
  Image,
  Easing
} from 'react-native';
import classnames from 'classnames';
import Fans from './Fans'
import Timer from './Timer'
import RotatingPropeller from './RotatingPropeller'

let classNames = require('classnames');
let image1 = require('/../src/images/3.png')
let image2 = require('/../src/images/4.png')
let image3 = require('/../src/images/5.png')

//The following are volume controls and the slider images
let trackImage1 = require('/../src/images/rec.png')
let trackImage2 = require('/../src/images/rec2.png')
let trackImage3 = require('/../src/images/rec3.png')
let currentTrackImage = trackImage1
let thumbImage2 = require('/../src/images/volumeslider.png')
let volumeControls = require('/../src/images/volumecontrols.png')
let vol1 = require('/../src/images/vol1.png')
let vol2 = require('/../src/images/vol2.png')
let vol3 = require('/../src/images/vol3.png')

//require react-native-sound and our audio samples which were added in our Xcode project I think?
let Sound = require('react-native-sound');
let fan1Audio = new Sound('/../audio/1.mp3', Sound.MAIN_BUNDLE)
let fan2Audio = new Sound('/../audio/2.mp3', Sound.MAIN_BUNDLE)
let fan3Audio = new Sound('/../audio/3.mp3', Sound.MAIN_BUNDLE)

//for our animations
let fan1Base = require('/../images/animation/3propbase.png')
let fan2Base = require('/../images/animation/4propbase.png')
let fan3Base = require('/../images/animation/5propbase.png')
let fan1Prop = require('/../images/animation/3prop.png')
let fan2Prop = require('/../images/animation/4prop.png')
let fan3Prop = require('/../images/animation/5prop.png')

//let SPEED = 0
let speed;

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 0,
      angle: new Animated.Value(0),
      fans:[
        { src: image1,
          fan: 1,
          isActive: true,
          audio: fan1Audio,
          activeColor: "#b8eef6",
          trackImage: trackImage1,
          fanBase: fan1Base,
          fanProp: fan1Prop
        },
        { src: image2,
          fan: 2,
          isActive: false,
          audio: fan2Audio,
          activeColor: "#69bcf1",
          trackImage: trackImage2,
          fanBase: fan2Base,
          fanProp: fan2Prop
        },
        {
          src: image3,
          fan: 3,
          isActive: false,
          audio: fan3Audio,
          activeColor: "#6b85d0",
          trackImage: trackImage3,
          fanBase: fan3Base,
          fanProp: fan3Prop
        }
      ]
    }

    this.handleTouch = this.handleTouch.bind(this);
    this.handleVolume = this.handleTouch.bind(this);
    this.playAudio = this.playAudio.bind(this)
    this.stopFan = this.stopFan.bind(this)
               this.timerChangeHandler = this.timerChangeHandler.bind(this)
               this.handleSliderChange = this.handleSliderChange.bind(this)
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
  
  if(this.state.volume > 0) {
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
  }

  // handleVolume(value) {
  //   console.log("changing")
  //    // this.setState({volume: value})
  // }

  // _animate(speed) {
  //  // SPEED = speed * 1000
  //  let SPEED = 400
  //   //console.log(this.state.angle)
  //  this.state.angle.setValue(0);
  //   this._anim = Animated.timing(this.state.angle, {
  //     toValue: 360*SPEED,
  //     duration: 800*SPEED,
  //     easing: Easing.linear
  //   }).start(this._animate);
  // }

  timerChangeHandler(count){
    // let countDown = count
    // console.log("it worked")
    // console.log(countDown)
    if (count === 1) {
      this.stopFan()
    }
  }

  stopFan() {
    //this.setState({volume: 0})
    //const NUM_OF_FANS = this.state.fans.length;
    const NUM_OF_FANS = this.state.fans.length;
    for(var i=0; i<NUM_OF_FANS; i++) {
      if (this.state.fans[i].isActive) {
        this.state.fans[i].audio.stop()
         this.setState({volume:0})
       // this.handleTouch(this.state.fans[i].fan)
        //this.handleSliderChange(0)
        //speed = 0
        //this.setState({volume:0})
        //break
      }
    }
  }

  handleSliderChange(value) {
    this.setState({volume: value})
  }

  render() {
  // this._animate();
  //SPEED = this.state.volume
  const NUM_OF_FANS = this.state.fans.length;
  //const NUM_OF_FANS = this.state.fans.length;
  //update the volume everytime render is called
    for (var i=0;i<NUM_OF_FANS;i++){
      this.state.fans[i].audio.setVolume(this.state.volume)
    }

    let selectedFanImage;
    let currentFan;
    let borderColor;
    

    for (var i=0;i<NUM_OF_FANS;i++) {
      if (this.state.fans[i].isActive === true) {
        selectedFanBase = this.state.fans[i].fanBase;
        selectedFanProp = this.state.fans[i].fanProp
        currentFan = this.state.fans[i].fan
        borderColor = this.state.fans[i].activeColor
        break;
      }
    }
    
    //map over our fans array and assign props
    let fans = this.state.fans.map((fan) => {
      return(<Fans key={fan.fan} 
              fanNum={fan.fan} 
              source={fan.src} 
              onPress={this.handleTouch}
              border={fan.activeColor}
              isActive={fan.isActive} />);
    })

    speed = this.state.volume

    return (

      <View>

        <View style={{flex:1, alignItems:'center'}}>
          <View style={fanStyles.selectedFanImageContainer}>
            <RotatingPropeller speed={speed} propImage={selectedFanProp} style={fanStyles.selectedFanProp} />
            
            <Image style={fanStyles.selectedFanBase} source={selectedFanBase} />
          </View>
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
                //this.setState({volume: value})
                this.handleSliderChange(value)
                this.playAudio(currentFan)
              }
            } 
            value={this.state.volume}
            step={.34}
          />
        </View>
         <Timer borderColor={borderColor} timerChange={this.timerChangeHandler} />
        <View style={fanStyles.container}>
          {fans}
        </View>
      </View>
    );
  }
};
const fanStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flex: 1,
    },
    selectedFanBase: {
      height: 250,
      width: 250,
      marginTop: 50,
      position: 'relative'
    },
        selectedFanProp: {
      height: 250,
      width: 250,
      // flex: 1,
      //transform: [{rotate: '360deg'}],
      position: 'absolute',
      top:50,
    },
    // propContainer: {
    //   flex:1,
    //         position: 'absolute'
    // },
    selectedFanImageContainer: {
      //       justifyContent: 'center',
      // alignItems: 'center',
      // textAlign: 'center'
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
          console.ignoredYellowBox = [
      'Warning: Failed propType',
      // Other warnings you don't want like 'jsSchedulingOverhead',
    ]
export default MainComponent;