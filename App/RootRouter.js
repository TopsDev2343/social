/** @format */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Platform,
  StatusBar,
  SafeAreaView,
  I18nManager,
} from 'react-native';
import OneSignal from 'react-native-onesignal';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { Events, Style, Constants, Config, Device } from '@common';
import MenuScale from '@components/LeftMenu/MenuScale';
import MenuOverlay from '@components/LeftMenu/MenuOverlay';
import MenuSmall from '@components/LeftMenu/MenuSmall';
import MenuWide from '@components/LeftMenu/MenuWide';
import MenuAndroid from '@components/LeftMenu/MenuAndroid';

import { AppIntro } from '@components';

// not support from v.3.8.4 due to some latest update from google play service
// import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge'

import { setInitialNotification, fetchPostById } from '@redux/actions';

import MainNavigator, { navigationRef } from './Navigation';

// const tracker = new GoogleAnalyticsTracker(Config.Google.analyticId)

// gets the current screen from navigation state
// function getCurrentRouteName(navigationState) {
//   if (!navigationState) {
//     return null
//   }
//   const route = navigationState.routes[navigationState.index]

//   !Device.isIphoneX && StatusBar.setHidden(true)

//   // dive into nested navigators
//   if (route.routes) {
//     return getCurrentRouteName(route)
//   }
//   return route.routeName
// }

class RootRouter extends Component {
  static propTypes = {
    setInitialNotification: PropTypes.func,
    fetchPostById: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = { menuStyle: 0 };

    !Device.isIphoneX && StatusBar.setHidden(true);
    I18nManager.forceRTL(Constants.RTL);
    // Set Default Language for App
    // Languages.setLanguage(Config.Language);

    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(Config.OneSignal.appId);
  }

  componentDidMount() {
    Events.appChangeMenuStyle(this.changeMenuStyle);

    const { isLoggedIn } = this.props;
    if (!isLoggedIn && Config.RequiredLogin) {
      Events.openUserModal();
    }
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = notification => {
    console.log('Notification received: ', notification);
  };

  onOpened = openResult => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);

    // handle data when click notification banner
    this.handleDeepLink(openResult);
  };

  onRegistered = notifData => {
    console.log(
      'Device had been registered for push notifications!',
      notifData,
    );
  };

  onIds = device => {
    console.log('Device info: ', device);
  };

  changeMenuStyle = data => {
    this.setState({ menuStyle: data.menuId });
  };

  handleDeepLink = openResult => {
    const data = openResult.notification.payload.additionalData;
    this.props.setInitialNotification(openResult);
    if (data && data.id) {
      this.props.fetchPostById(data.id).then(post => {
        this.goToScreen('post', { post });
      });
    } else {
      console.log('notification is invalid data');
    }
  };

  goToScreen = (routeName, params, isReset = true) => {
    console.log(
      '🚀🚀🚀Luyx🚀🚀🚀 ~ file: RootRouter.js ~ line 40 ~ RootRouter ~ routeName',
      routeName,
    );
    // fix the navigation for Custom page
    if (routeName) {
      navigationRef?.current?.navigate(routeName, params);
    }
  };

  renderContent = () => {
    const { isLoggedIn } = this.props;
    return (
      <SafeAreaView style={Style.container}>
        <View style={Style.app}>
          {Device.isIphoneX && (
            <StatusBar backgroundColor="white" barStyle="dark-content" />
          )}
          {(isLoggedIn || !Config.RequiredLogin) && (
            <NavigationContainer ref={navigationRef}>
              <MainNavigator />
            </NavigationContainer>
          )}
        </View>
      </SafeAreaView>
    );
  };

  render() {
    const { small, wide, overlay } = Constants.LeftMenu;

    if (this.props.isFinishedIntro == false && Config.showAppIntro) {
      return <AppIntro />;
    }

    if (Platform.OS === 'android') {
      return (
        <MenuAndroid
          goToScreen={this.goToScreen}
          routes={this.renderContent()}
        />
      );
    }

    switch (Config.LeftMenuStyle) {
      case small:
        return (
          <MenuSmall
            goToScreen={this.goToScreen}
            routes={this.renderContent()}
          />
        );
      case wide:
        return (
          <MenuWide
            goToScreen={this.goToScreen}
            routes={this.renderContent()}
          />
        );
      case overlay:
        return (
          <MenuOverlay
            goToScreen={this.goToScreen}
            routes={this.renderContent()}
          />
        );
      default:
        return (
          <MenuScale
            goToScreen={this.goToScreen}
            routes={this.renderContent()}
          />
        );
    }
  }
}

RootRouter.defaultProps = {
  isFinishedIntro: false,
};

const mapStateToProps = ({ user }, ownProps) => {
  return {
    isFinishedIntro: user.isFinishedIntro,
    isLoggedIn: user && user.data,
  };
};

export default connect(mapStateToProps, {
  setInitialNotification,
  fetchPostById,
})(RootRouter);
