/** @format */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HorizonList } from '@components';
import { ROUTER } from './constants';

export default class PostListScreen extends PureComponent {
  static navigationOptions = ({ navigation, route }) => ({
    title: route?.params?.name || '',
    header: null,
  });

  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    const { navigation, route } = this.props;
    const params = route.params;
    const index = params.index;

    return (
      <HorizonList
        horizontal={false}
        key={`hlist-${index}`}
        config={params.config}
        index={index}
        goBack={() => navigation.goBack()}
        onViewPost={(item, index, parentPosts) => {
          navigation.navigate(ROUTER.POST_DETAIL_SCREEN, {
            post: item,
            index,
            parentPosts,
          });
        }}
      />
    );
  }
}
