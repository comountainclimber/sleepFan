import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  DatePickerIOS,
  TextInput,
  Modal,
  TouchableHighlight
} from 'react-native';
import classnames from 'classnames';
const timer = require('react-native-timer');
//let DatePickerIOS = require('react-native-date-time-picker')
// import NumberInput from 'rn-number-input';
let classNames = require('classnames');

var Button = React.createClass({
  getInitialState() {
    return {
      active: false,
    };
  },

  _onHighlight() {
    this.setState({active: true});
  },

  _onUnhighlight() {
    this.setState({active: false});
  },

  render() {
    var colorStyle = {
      color: this.state.active ? '#000' : '#fff',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor={this.props.backgroundColor}>
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
});

var Button2 = React.createClass({
  getInitialState() {
    return {
      active: false,
    };
  },

  _onHighlight() {
    this.setState({active: true});
  },

  _onUnhighlight() {
    this.setState({active: false});
  },

  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor={this.props.backgroundColor}>
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
  }
});


export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      text: "",
      date: (new Date()),
      timeZoneOffset: (-1) * (new Date()).getTimezoneOffset() / 60,
      modalVisible: false,
      transparent: true,
      animated: false

    }
     this._onDateChange = this._onDateChange.bind(this);
     this._setModalVisible = this._setModalVisible.bind(this);
          this._handleTimerInput = this._handleTimerInput.bind(this);

  }

  componentWillMount() {
    // console.log("mount")
  }

  componentWillUpdate() {
    timer.setInterval('foo', () => this.setState({count: this.state.count-1}), 1000);

// state.count is = to 0 when the application loads this is really confusing
// need to figure out how to call out with props to stop the fan noise when count
// is equal to 0
    if (this.state.count === 1) {
      // console.log("about to end")
      // this.props.stopFan
      timer.clearInterval('foo');
    }

    else if (this.state.count === -1) {
      // console.log("about to end")
      this.setState({count:2})
      // this.props.stopFan
      timer.clearInterval('foo');
    }

    // else if (this.state.count === 1) {
    //   timer.clearInterval('foo');
    //   //console.log("asdasd")
    //   // this.props.stopFan
    //   // this.setState({count:0})
    //   // alert("fooblumpkin")

    // }
  }

  // componentWillUnmount() {
  //   timer.clearInterval('foo');
  // }

  _onDateChange(date) {

  
    console.log(date.getHours() + "|" + date.getMinutes())
    console.log(this.state.date.getHours() + "|" + this.state.date.getMinutes())

    let diffInHours = (date.getHours() - this.state.date.getHours())
     let diffInTime = (date.getTime() - this.state.date.getTime())
      // if (diffInHours > 0) {
      //   break
      // }
      // else {diffInHours = undefined}

    //console.log("set timer for " + diffInHours + " hours" + " and" + diffInMinutes )
    let diffInSeconds = (diffInTime / 1000).toFixed()
    if (diffInSeconds > 0 ){
      this.setState({count: diffInSeconds})
    }
    this.setState({date:date})
    // timeEndDate = date
  }

    _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _handleTimerInput() {
    // this.setState({date:timeEndDate})
    // console.log("assds")
  }
  
  render() {
    // if (this.state.count === 0) {
    //   timer.clearInterval('foo');
    //   // this.props.stopFan
    //   //alert("fooblumpkin")

    // }

    var dynamicStyles = StyleSheet.create({
        timerButton: {
        borderColor: this.props.borderColor,
        borderWidth: 5,
        width: 10,
        flex: 1
        },
    })
    let timeEndDate;
    let count = this.state.count
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#e9e9e9', padding: 20}
      : null;

      var hours = parseInt( count / 3600 ) % 24;
      var minutes = parseInt( count / 60 ) % 60;
      var seconds = (count % 60)// + " seconds";


    return (
      <View style={styles.container}>
        <View style={[styles.row,{justifyContent: 'center', alignItems: 'center'}]}>
        <Text style={{width:100, flex:1, textAlign:'center', color:'white', fontSize:30}}> 
        {hours + ":" + minutes + ":" + seconds}
        </Text>

        <Button style={dynamicStyles.timerButton} onPress={this._setModalVisible.bind(this, true)} backgroundColor={this.props.borderColor}>
            SET TIMER
          </Button>
        </View>
        <Modal
          animated={this.state.animated}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          onRequestClose={() => {this._setModalVisible(false)}}
          >
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              <Text style={{textAlign:'center'}}> Enter when you would like sleepFan to turn off... </Text>
              <DatePickerIOS
                date={this.state.date}
                mode="time"
                timeZoneOffsetInMinutes = {this.state.timeZoneOffsetInHours * 60}
                minuteInterval={1}
                onDateChange = {this._onDateChange}
              />
              <View style={styles.row}>
                <Button2
                  onPress={this._setModalVisible.bind(this, false)}
                  style={styles.modalButton}
                  backgroundColor={'#333333'}
                  >
                  Enter
                </Button2>
                <Button2
                  onPress=
                  {

                      this._setModalVisible.bind(this, false)

                  } 
                  style={styles.modalButton}
                  backgroundColor={'#333333'}
                  >
                  Close
                </Button2>
              </View>
            </View>
          </View>
        </Modal>

      </View>
    );
  }
};

export default Timer;