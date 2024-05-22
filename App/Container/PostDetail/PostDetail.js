/** @format */

import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Text, Platform, View, InteractionManager } from 'react-native';
import Animated from 'react-native-reanimated';
import TimeAgo from 'react-native-timeago';

import { Config, Constants, Images, Tools } from '@common';
import {
  Comment,
  WebView,
  RelatedPost,
  AdMob,
  Video,
  FooterDetail,
  Spinkit,
} from '@components';
import styles from './styles';

const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 42 : 42;
const HEADER_SCROLL_DISTANCE =
  Constants.Window.headerHeight - HEADER_MIN_HEIGHT;

export default class PostDetail extends Component {
  static propTypes = {
    onViewPost: PropTypes.func,
    pageIndex: PropTypes.number,
    myIndex: PropTypes.number,
    post: PropTypes.object,
  };

  state = { scrollY: new Animated.Value(0), loaded: false };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loaded: true });
    });
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.pageIndex === this.props.myIndex;
  }

  renderBanner = () => {
    if (!this.state.loaded) {
      return (
        <View style={styles.loadingContainer}>
          <Spinkit />
        </View>
      );
    }

    const { post } = this.props;
    const imageURL = Tools.getImage(post, Constants.PostImage.large);
    const videoUrl =
      post.content && post.content.rendered != null
        ? Tools.getLinkVideo(post.content.rendered)
        : '';
    const isVideo = videoUrl.length > 0;

    const animateOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const imageScale = this.state.scrollY.interpolate({
      inputRange: [-100, 0],
      outputRange: [2, 1],
      extrapolate: 'clamp',
    });

    if (isVideo > 0) {
      return (
        <Animated.View
          style={[
            styles.imageBackGround,
            {
              opacity: animateOpacity,
              transform: [
                { translateY: imageTranslate },
                { scale: imageScale },
              ],
            },
          ]}
        >
          <Video imageURL={imageURL} videoUrl={videoUrl} style={styles.video} />
        </Animated.View>
      );
    }

    return (
      <Animated.Image
        source={{ uri: imageURL || Images.placeHolderImage }}
        style={[
          styles.imageBackGround,
          {
            opacity: animateOpacity,
            transform: [{ translateY: imageTranslate }, { scale: imageScale }],
          },
        ]}
      />
    );
  };

  renderContent = () => {
    const { post, myIndex, pageIndex } = this.props;
    const isLoadMoreData = myIndex === pageIndex;
    const postTitle =
      post.title && post.title.rendered ? post.title.rendered : '';
    const postContent =
      !post.content || typeof post.content.rendered === 'undefined'
        ? ''
        : post.content.rendered;
    /** @format */

    return (
      <View style={styles.scrollViewContent}>
        <View style={styles.innerContent}>
          <Text style={styles.detailDesc}>
            {Tools.formatText(postTitle, 300)}
          </Text>
          <Text style={styles.author}>
            <TimeAgo time={post.date} hideAgo />
          </Text>

          <Suspense fallback={<Spinkit />}>
            <WebView html={postContent} />
          </Suspense>

          {isLoadMoreData && (
            <View onLayout={this.onLayoutComments}>
              <Comment post={post} />
            </View>
          )}

          {Config.AdMob.visible && <AdMob />}

          {isLoadMoreData && (
            <RelatedPost post={post} onViewPost={this.props.onViewPost} />
          )}
        </View>
      </View>
    );
  };

  render() {
    const { post } = this.props;

    return (
      <View style={styles.body}>
        <Animated.ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollView}
          ref="scrollRef"
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
        >
          {this.renderBanner()}

          {this.renderContent()}
        </Animated.ScrollView>

        <FooterDetail
          post={post}
          onNext={this.props.onNext}
          onShowComments={this.onShowComments}
          onPostComment={this.props.onPostComment}
        />
      </View>
    );
  }

  onLayoutComments = event => {
    const layout = event.nativeEvent.layout;
    this.commentOffsetY = layout.y + Constants.Window.headerHeight;
  };

  onShowComments = () => {
    if (
      this.commentOffsetY != undefined &&
      typeof this.refs.scrollRef != 'undefined'
    ) {
      this.refs.scrollRef._component.scrollTo({
        y: this.commentOffsetY,
        animated: true,
      });
    }
  };
}
