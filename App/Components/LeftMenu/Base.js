/** @format */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import User from '@services/User';
import { Events, Config, Languages } from '@common';
import { ROUTER } from '@navigation/constants';

export default class Base extends PureComponent {
  static propTypes = {
    goToScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = { userData: null };

    this.fetchDataUser();
    Events.onSideMenuRefresh(this.fetchDataUser);
  }

  componentDidMount() {
    this.fetchDataUser();
  }

  getSideMenuItems = () => {
    const { userData } = this.state;

    return [
      {
        label: Languages.news,
        icon: 'home',
        onPress: () => this.goToScreen(ROUTER.HOME_SCREEN),
      },
      { label: Languages.contact, icon: 'mail', onPress: this.goToContact },
      { label: Languages.aboutus, icon: 'assignment', onPress: this.goToAbout },
      {
        label: Languages.setting,
        icon: 'settings',
        onPress: () => this.goToScreen(ROUTER.SETTING_SCREEN),
      },
      {
        label: Languages.user,
        icon: 'User',
        onPress: () => {
          if (userData) {
            this.goToScreen(ROUTER.READ_LATER_SCREEN);

            return;
          }
          this.goToScreen(ROUTER.READ_LATER_SCREEN);
          Events.openUserModal();
        },
      },
    ];
  };

  fetchDataUser = () => {
    User.getUser().then(data => {
      this.setState({
        userData: data,
      });
    });
  };

  goToContact = () => {
    this.goToScreen(ROUTER.CUSTOM_PAGE_SCREEN, {
      id: Config.CustomPages.contact_id,
      title: Languages.contact,
    });
  };

  goToAbout = () => {
    this.goToScreen(ROUTER.CUSTOM_PAGE_SCREEN, {
      id: Config.CustomPages.aboutus_id,
      title: Languages.aboutus,
    });
  };

  goToScreen = (routeName, params = {}) => {
    this.props.goToScreen(routeName, params, false);
    Events.closeLeftMenu();
  };

  logout = () => {
    Events.logoutUser();
    this.setState({ userData: undefined });
    Events.closeLeftMenu();
  };

  login() {
    // Actions.login();
  }

  render() {
    return <View />;
  }
}
