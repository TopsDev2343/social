/** @format */

import Constants from './Constants';

export default {
  /**
   * The detail document from: https://beonews.inspireui.com
   * Step 1: Moved to AppConfig.json
   */
  // IsRequiredLogin:true,
  Banner: {
    visible: true,
    sticky: true,
    tag: [],
    categories: [],
  },

  /**
   * Advance config
   * CategoryVideo: config the category id for video page
   *
   * */
  // Category video id from the menu
  CategoryVideo: 34,

  imageCategories: {
    drink: require('@images/category/cate1.jpg'),
    foods: require('@images/category/cate2.jpg'),
    salads: require('@images/category/cate4.jpg'),
    smoothies: require('@images/category/cate5.jpg'),
    pasta: require('@images/category/cate6.jpg'),
    'health-care': require('@images/category/cate7.jpg'),
    'kids-menu': require('@images/category/cate8.jpg'),
    'quick-recipes': require('@images/category/cate9.jpg'),
    deserts: require('@images/category/cate10.jpg'),
    recipes: require('@images/category/cate11.jpg'),
    video: require('@images/category/cate12.jpg'),
    featured: require('@images/category/cate16.jpg'),
    all: require('@images/category/cate14.jpg'),
  },

  // Custom page from left menu side
  CustomPages: {
    contact_id: 11,
    aboutus_id: 7,
  },

  // config for Firebase, use to sync user data across device and favorite post
  Firebase: {
    apiKey: 'AIzaSyDnBpxFOfeG6P06nK97hMg01kEgX48JhLE',
    authDomain: 'beonews-ef22f.firebaseapp.com',
    databaseURL: 'https://beonews-ef22f.firebaseio.com',
    storageBucket: 'beonews-ef22f.appspot.com',
    messagingSenderId: '1008301626030',
    readlaterTable: 'list_readlater',
  },

  // config for log in by Facebook
  Facebook: {
    showAds: false,
    adPlacementID: '',
    logInID: '1809822172592320',
    sizeAds: 'standard', // standard, large
  },

  // config for log in by Google
  // Google: {
  //   analyticId: 'UA-90561349-1',
  //   androidClientId:
  //     '338838704385-1om86241pq2qpg4qi677jb1ndo5jqfh2.apps.googleusercontent.com',
  //   iosClientId:
  //     '338838704385-1om86241pq2qpg4qi677jb1ndo5jqfh2.apps.googleusercontent.com',
  // },

  // The advance layout
  AdvanceLayout: [
    Constants.Layout.threeColumn,
    Constants.Layout.threeColumn,
    Constants.Layout.threeColumn,
    Constants.Layout.list,
    Constants.Layout.list,
    Constants.Layout.list,
    Constants.Layout.list,
    Constants.Layout.card,
    Constants.Layout.column,
    Constants.Layout.column,
  ],

  // config for log in by Admob
  AdMob: {
    visible: true,
    deviceID: 'pub-2101182411274198',
    unitID: 'ca-app-pub-2101182411274198/9145196933',
    unitInterstitial: 'ca-app-pub-2101182411274198/7326078867',
    isShowInterstital: false,
  },

  // tab animate
  tabBarAnimate: Constants.Animate.zoomIn,

  // config default for left menu
  LeftMenuStyle: Constants.LeftMenu.overlay,

  notification: {
    AppId: '85cbc2b5-4e0d-4214-9653-8054d06f4256',
    NewAppId: '88b0e176-5756-47b7-b061-aacea262421d',
  },

  OneSignal: {
    appId: '85cbc2b5-4e0d-4214-9653-8054d06f4256',
  },

  // update 18 May
  // showLayoutButton: Ability to show/hide the switch layout button at homescreen
  // homeLayout: default homeLayout UI: Constants.Layout.mansory, Constants.Layout.horizontal
  // showSwitchCategory: show the switch button on categories page
  showLayoutButton: false,
  homeLayout: Constants.Layout.horizontal,
  showSwitchCategory: false,
  showAppIntro: true,
  EnableSanitizeHtml: true,
  RequiredLogin: false,
  showSubCategoryScreen: false,

  intro: [
    {
      title: 'Welcome to BeoFoods',
      description:
        'Get the latest food receipt on your hand and sharing with your friends',
      backgroundColor: '#D5E8ED',
      source: require('@images/lottie/loading.json'),
      button: 'GET STARTED',
    },
    {
      title: 'Easy to use',
      description:
        'The app is well design and smoothly navigation between screens',
      backgroundColor: '#FFF',
      source: require('@images/lottie/check_animation.json'),
      button: 'NEXT',
    },
    {
      title: 'Push notification',
      description:
        'Get up-to-date the content regularly and offline mode is supported',
      backgroundColor: '#D6D7DD',
      source: require('@images/lottie/notification.json'),
      button: 'DONE',
    },
  ],
};
