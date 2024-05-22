import React, { Component } from 'react';

import { Constants } from '@common';
import { Setting } from '@container';
import Icons from '@navigation/Icons';

export default class SettingScreen extends Component {
  static navigationOptions = {
    title: 'Setting',
    tabBarLabel: 'Setting',
    tabBarVisible: false,
    headerLeft: Constants.RTL ? null : Icons.Home(),
    headerRight: Constants.RTL ? Icons.Home() : null,
  };

  render = () => <Setting />;
}
