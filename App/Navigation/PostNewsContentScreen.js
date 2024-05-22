/** @format */

import React, { Component } from 'react';
import { PostNewsContent } from '@container';

export default class PostNewsContentScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;

    return (
      <PostNewsContent
        navigation={navigation}
        onBack={() => navigation.goBack()}
        onClose={() => navigate('mine')}
      />
    );
  }
}
