import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
//import ReactDOM from 'react-dom';
import MainComponent from './MainComponent';
import Component1 from './Component1'


// ReactDOM.render(<Component1 />, document.getElementById('container'));
//ReactDOM.render(<SliderParent />, document.getElementById('root'));

class sleepFan extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <MainComponent />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#333333',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  fanImage: {
    height: 200
  }
});

AppRegistry.registerComponent('sleepFan', () => sleepFan);
