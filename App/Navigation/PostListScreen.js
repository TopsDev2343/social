/** @format */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Constants } from '@common';
import { PostList } from '@components';
import { ROUTER } from './constants';

export default class PostListScreen extends Component {
  static navigationOptions = ({ route }) => ({
    title: route?.params?.name,
    header: null,
  });

  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    const { navigation, route } = this.props;
    const params = route.params;

    return (
      <PostList
        config={params.config && params.config}
        goBack={() => navigation.goBack()}
        layout={Constants.Layout.twoColumn}
        onViewPost={(item, index, parentPosts) =>
          navigation.navigate(ROUTER.POST_DETAIL_SCREEN, {
            post: item,
            index,
            parentPosts,
            backToRoute: ROUTER.CATEGORY_SCREEN,
          })
        }
      />
    );
  }
}
