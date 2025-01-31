/** @format */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Platform,
  FlatList,
  Dimensions,
  InteractionManager,
  Animated,
} from 'react-native';
import { Spinkit, HeaderDetail, ActionsModal, InputComment } from '@components';
import { connect } from 'react-redux';
import PostDetailView from './PostDetail';
import { fetchPostsBookmark } from '@redux/actions';

import styles from './styles';

const { width } = Dimensions.get('window');

class PostDetail extends PureComponent {
  static propTypes = {
    index: PropTypes.number,
    onViewPost: PropTypes.func,
    onBack: PropTypes.func,
    post: PropTypes.object,
    posts: PropTypes.array,
    parentPosts: PropTypes.array,
    navigation: PropTypes.any,
    postsInSearch: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      pageIndex: props.index,
      loaded: false,
      scrollX: new Animated.Value(0),
      isVisible: false,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loaded: true });
    });
  }

  getItemLayout = (data, index) => {
    return {
      length: width,
      offset: width * index,
      index,
    };
  };

  renderItem = ({ item, index }) => {
    const { onViewPost, onBack } = this.props;
    return (
      <PostDetailView
        key={`post${index}`}
        post={item}
        onBack={onBack}
        myIndex={index}
        pageIndex={this.state.pageIndex}
        onViewPost={onViewPost}
        onNext={this.showNextPost}
        onPostComment={() => this.refs.input.show()}
      />
    );
  };

  renderContent = postList => {
    const { onViewPost, onBack, index, post } = this.props;
    const { pageIndex } = this.state;

    if (
      typeof index === 'undefined' ||
      !postList ||
      !postList.length ||
      postList.length == 0 ||
      Platform.OS == 'android'
    ) {
      return (
        <PostDetailView
          post={post}
          onBack={onBack}
          onViewPost={onViewPost}
          onNext={() => {}}
          onPostComment={() => this.refs.input.show()}
        />
      );
    }

    return (
      <FlatList
        ref={flatlist => {
          this.flatlist = flatlist;
        }}
        data={postList}
        renderItem={this.renderItem}
        horizontal
        pagingEnabled
        getItemLayout={this.getItemLayout}
        initialScrollIndex={index}
        keyExtractor={(item, index) => `postDetail-${item.id || index}`}
        removeClippedSubviews
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={10}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }],
          {
            listener: event => {
              const page = Math.round(
                event.nativeEvent.contentOffset.x / width,
              );
              if (page !== pageIndex) {
                this.setState({ pageIndex: page });
              }
            },
          },
        )}
      />
    );
  };

  render() {
    const { navigation, parentPosts } = this.props;

    if (!this.state.loaded) {
      return (
        <View style={styles.loadingContainer}>
          <Spinkit />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <HeaderDetail
          onBack={() => navigation.goBack()}
          parentPosts={parentPosts}
          scrollX={this.state.scrollX}
          onMore={this.showActionsModal}
        />

        {this.renderContent(parentPosts)}

        <InputComment
          ref="input"
          post={parentPosts[this.state.pageIndex]}
          reloadComments={() => this.props.fetchPostsBookmark()}
        />
        <ActionsModal
          isVisible={this.state.isVisible}
          onClose={() => this.setState({ isVisible: false })}
          post={parentPosts[this.state.pageIndex]}
          onPostComment={() => this.refs.input.show()}
        />
      </View>
    );
  }

  // handle for next index from the parents list change post
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.index !== this.props.index) {
      this.flatlist &&
        setTimeout(() => {
          this.flatlist.scrollToOffset({ offset: nextProps.index * width });
        }, 100);
    }
  }

  showNextPost = () => {
    let { parentPosts } = this.props;
    let nextIndex = this.state.pageIndex + 1;
    if (nextIndex < parentPosts.length) {
      this.flatlist &&
        this.flatlist.scrollToOffset({
          offset: nextIndex * width,
          animated: true,
        });
    }
  };

  showActionsModal = () => {
    this.setState({ isVisible: true });
  };
}

PostDetail.defaultProps = {
  parentPosts: [],
};

const mapStateToProps = ({ posts }, ownProps) => {
  let postList = posts;
  if (
    ownProps.route?.params.hasOwnProperty('fromSearch') &&
    ownProps.route?.params.fromSearch === true
  ) {
    postList = ownProps.postsInSearch;
  }
  // for using from parent post list, like the read later list
  if (typeof ownProps.parentPosts !== 'undefined') {
    postList = ownProps.parentPosts;
  }

  return {
    posts: posts.list,
    postsInSearch: posts.postsInSearch,
    parentPosts: postList,
  };
};
export default connect(mapStateToProps, { fetchPostsBookmark })(PostDetail);
