import React from 'react';
import { View, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';

const { width } = Dimensions.get('window');

class Indicator extends React.Component {
  render() {
    let { items, scrollX } = this.props;
    let position = Animated.divide(scrollX, width);

    return (
      <View style={{ flexDirection: 'row' }}>
        {items.map((_, i) => {
          // the _ just means we won't use that parameter
          let opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
            outputRange: [0.3, 1, 0.3], // when position is not i, the opacity of the dot will animate to 0.3
            extrapolate: 'clamp', // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
          });
          return (
            <Animated.View // we will animate the opacity of the dots so use Animated.View instead of View here
              key={i} // we will use i for the key because no two (or more) elements in an array will have the same index
              style={{
                opacity,
                height: 6,
                width: 6,
                backgroundColor: '#595959',
                margin: 5,
                borderRadius: 3,
              }}
            />
          );
        })}
      </View>
    );
  }
}

export default Indicator;
