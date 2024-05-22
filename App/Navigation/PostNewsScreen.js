/** @format */

import React, { Component } from 'react';
import { PostNews } from '@container';
import { ROUTER } from './constants';

export default class PostNewsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;

    return (
      <PostNews
        onBack={() => navigation.goBack()}
        next={post => navigate(ROUTER.POST_NEWS_CONTENT_SCREEN, { post })}
      />
    );
  }
}
