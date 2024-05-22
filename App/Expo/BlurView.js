import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import { BlurView } from 'react-native-blur';

export default class Blur extends Component {
  render() {
    const { tint, style, intensity, children } = this.props;

    if (Platform.OS == 'android') {
      return <View style={style}>{children}</View>;
    }

    return (
      <BlurView blurType={tint} style={style} blurAmount={intensity}>
        {children}
      </BlurView>
    );
  }
}
