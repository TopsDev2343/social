/** @format */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Videos } from '@container';
import { ROUTER } from './constants';

export default class VideoScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  render() {
    const { navigate, onBack } = this.props.navigation;
    return (
      <Videos
        onBack={() => onBack()}
        onViewPost={(item, index, parentPosts) =>
          navigate(ROUTER.POST_DETAIL_SCREEN, {
            post: item,
            index,
            parentPosts,
            backToRoute: ROUTER.VIDEO_SCREEN,
          })
        }
      />
    );
  }
}
