/** @format */

import React, { Component } from 'react';
import { Style, Config } from '@common';
import { Category, NewCategory } from '@container';
import Icons from './Icons';
import { ROUTER } from './constants';

export default class CategoryScreen extends Component {
  static navigationOptions = {
    headerLeft: Icons.Home(),
    header: null,
    headerStyle: Style.toolbar,
  };

  render() {
    const { navigate } = this.props.navigation;
    if (Config.showSubCategoryScreen) {
      return (
        <NewCategory
          onViewPost={(item, index, parentPosts) =>
            navigate(ROUTER.POST_DETAIL_SCREEN, {
              post: item,
              index,
              parentPosts,
              backToRoute: ROUTER.CATEGORY_SCREEN,
            })
          }
          onViewCategory={config => navigate(ROUTER.POST_LIST_SCREEN, config)}
        />
      );
    } else {
      return (
        <Category
          onViewPost={(item, index, parentPosts) =>
            navigate(ROUTER.POST_DETAIL_SCREEN, {
              post: item,
              index,
              parentPosts,
              backToRoute: ROUTER.CATEGORY_SCREEN,
            })
          }
          onViewCategory={config => navigate(ROUTER.POST_LIST_SCREEN, config)}
        />
      );
    }
  }
}
