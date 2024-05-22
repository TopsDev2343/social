/** @format */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WebView, View } from 'react-native';
import Icons from '@navigation/Icons';
import { Languages } from '@common';
import { CustomPage } from '@container';

export default class CustomPageScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: Languages.AppName,
    headerLeft: Icons.Home(),
  });

  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    const { route } = this.props;

    if (typeof route.params === 'undefined') {
      return <View />;
    }

    if (typeof route.params.url !== 'undefined') {
      return <WebView source={{ url: route.params.url }} />;
    }
    return <CustomPage id={route.params.id} />;
  }
}
