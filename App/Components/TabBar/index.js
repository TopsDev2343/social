/** @format */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';

import { Color } from '@common';
import { setActiveCategory, initPosts } from '@redux/actions';
import styles from './styles';

class TabBar extends PureComponent {
  onPress = (route, index) => {
    const { navigation } = this.props;

    navigation.jumpTo(route.name);

    // this is important to reset the list and trigger function when click home menu
    if (index === 0) {
      this.props.setActiveCategory();
      // this.props.initPosts()
    }
  };

  render() {
    const { state, descriptors } = this.props;

    const { routes } = state;

    const hiddenMenu = [
      'customPage',
      'setting',
      'postDetail',
      'postNews',
      'postNewsContent',
    ];

    return (
      <View style={styles.tabbar}>
        {routes &&
          routes.map((route, index) => {
            const focused = index === state.index;
            const tintColor = focused ? Color.tabbarTint : Color.tabbarColor;
            if (hiddenMenu.indexOf(route.key) > -1) {
              return <View key={route.key} />;
            }

            const tabOptions = descriptors[route.key]?.options;

            return (
              <TouchableWithoutFeedback
                key={route.key}
                onPress={() => this.onPress(route, index)}
              >
                <Animatable.View ref={`tabItem${index}`} style={styles.tab}>
                  {tabOptions?.tabBarIcon &&
                    tabOptions.tabBarIcon({ route, index, focused, tintColor })}
                </Animatable.View>
              </TouchableWithoutFeedback>
            );
          })}
      </View>
    );
  }
}

TabBar.propTypes = {
  setActiveCategory: PropTypes.func,
  navigation: PropTypes.object,
  renderIcon: PropTypes.any,
  activeTintColor: PropTypes.string,
  inactiveTintColor: PropTypes.string,
  jumpTo: PropTypes.func,
};

export default connect(null, { setActiveCategory, initPosts })(TabBar);
