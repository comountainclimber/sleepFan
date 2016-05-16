import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MainComponent from './src/components/MainComponent';
import {AdMobBanner, AdMobInterstitial} from 'react-native-admob'

class sleepFan extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <MainComponent />
        <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
          <AdMobBanner
            bannerSize={"smartBannerPortrait"}
            adUnitID={"ca-app-pub-3940256099942544/6300978111"}
            didFailToReceiveAdWithError={this.bannerError} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  }
});

AppRegistry.registerComponent('sleepFan', () => sleepFan);
