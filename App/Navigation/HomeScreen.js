/** @format */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Style } from '@common';
import { Home } from '@container';
import { ROUTER } from './constants';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
    headerStyle: Style.toolbar,
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Home
        onShowAll={({ index, config }) =>
          navigate(ROUTER.HORIZONTAL_SCREEN, { config, index })
        }
        onViewPost={(item, index, parentPosts) =>
          navigate(ROUTER.POST_DETAIL_SCREEN, {
            post: item,
            index,
            parentPosts,
            backToRoute: ROUTER.HOME_SCREEN,
          })
        }
      />
    );
  }
}
