/** @format */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import { Images } from '@common';

class LogoSpinner extends PureComponent {
  constructor(props) {
    super(props);

    this.animateValue = new Animated.Value(0);
    this.animatedStyle = {
      transform: [
        {
          rotate: this.animateValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          }),
        },
      ],
    };
  }

  componentDidMount() {
    this.doAnimation();
  }

  doAnimation = () => {
    this.animateValue.setValue(0);
    Animated.sequence([
      Animated.timing(this.animateValue, {
        toValue: 6,
        duration: 3000,
        friction: 0.5,
      }),
    ]).start(() => this.doAnimation());
  };

  render() {
    const { fullStretch, style, logo } = this.props;
    return (
      <View
        style={[
          fullStretch ? styles.container_full_stretch : styles.container,
          style,
        ]}
      >
        <Animated.View style={this.animatedStyle}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height: null,
    width: null,
  },
  container_full_stretch: {
    height: null,
    width: null,
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  logo: {
    height: 50,
    width: 50,
  },
});

LogoSpinner.propTypes = {
  logo: PropTypes.any,
  fullStretch: PropTypes.bool,
  style: PropTypes.any,
};

// noinspection JSUnusedGlobalSymbols
LogoSpinner.defaultProps = {
  logo: Images.logoSpin,
  fullStretch: true,
};

export default LogoSpinner;
