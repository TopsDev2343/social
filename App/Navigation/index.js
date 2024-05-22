/** @format */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Color, Images } from '@common';
import { TabBar, TabBarIcon } from '@components';
import PostDetailScreen from './PostDetailScreen';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import CategoryScreen from './CategoryScreen';
import CustomPageScreen from './CustomPageScreen';
import PhotoScreen from './PhotoScreen';
import VideoScreen from './VideoScreen';
import ReadLaterScreen from './ReadLaterScreen';
import PostListScreen from './PostListScreen';
import HorizontalScreen from './HorizontalScreen';
import SearchScreen from './SearchScreen';
import PostNewsScreen from './PostNewsScreen';
import PostNewsContentScreen from './PostNewsContentScreen';
import { ROUTER } from './constants';

const CategoryNavigator = createStackNavigator();

const categoryStack = () => {
  return (
    <CategoryNavigator.Navigator screenOptions={{ headerShown: false }}>
      <CategoryNavigator.Screen
        name={ROUTER.CATEGORY_SCREEN}
        component={CategoryScreen}
      />
    </CategoryNavigator.Navigator>
  );
};

const NewsNavigator = createStackNavigator();

const newsStack = () => {
  return (
    <NewsNavigator.Navigator screenOptions={{ headerShown: false }}>
      <NewsNavigator.Screen name={ROUTER.HOME_SCREEN} component={HomeScreen} />
      <NewsNavigator.Screen
        name={ROUTER.HORIZONTAL_SCREEN}
        component={HorizontalScreen}
      />
    </NewsNavigator.Navigator>
  );
};

const SearchNavigator = createStackNavigator();

const searchStack = () => {
  return (
    <SearchNavigator.Navigator screenOptions={{ headerShown: false }}>
      <SearchNavigator.Screen
        name={ROUTER.SEARCH_SCREEN}
        component={SearchScreen}
      />
    </SearchNavigator.Navigator>
  );
};

const VideoNavigator = createStackNavigator();

const videoStack = () => {
  return (
    <VideoNavigator.Navigator screenOptions={{ headerShown: false }}>
      <VideoNavigator.Screen
        name={ROUTER.VIDEO_SCREEN}
        component={VideoScreen}
      />
    </VideoNavigator.Navigator>
  );
};

const MainBottomTab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <MainBottomTab.Navigator
      lazy
      tabBar={props => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        activeTintColor: Color.tabbarTint,
        inactiveTintColor: Color.tabbarColor,
      }}
    >
      <MainBottomTab.Screen
        name={ROUTER.NEWS_STACK}
        component={newsStack}
        options={({ navigation }) => {
          return {
            tabBarIcon: ({ tintColor }) => {
              return (
                <TabBarIcon icon={Images.icons.news} tintColor={tintColor} />
              );
            },
          };
        }}
      />
      <MainBottomTab.Screen
        name={ROUTER.CATEGORY_STACK}
        component={categoryStack}
        options={({ navigation }) => {
          return {
            tabBarIcon: ({ tintColor }) => {
              return (
                <TabBarIcon
                  icon={Images.icons.category}
                  tintColor={tintColor}
                />
              );
            },
          };
        }}
      />
      <MainBottomTab.Screen
        name={ROUTER.SEARCH_STACK}
        component={searchStack}
        options={({ navigation }) => {
          return {
            tabBarIcon: ({ tintColor }) => {
              return (
                <TabBarIcon icon={Images.icons.search} tintColor={tintColor} />
              );
            },
          };
        }}
      />
      <MainBottomTab.Screen
        name={ROUTER.VIDEO_STACK}
        component={videoStack}
        options={({ navigation }) => {
          return {
            tabBarIcon: ({ tintColor }) => {
              return (
                <TabBarIcon icon={Images.icons.video} tintColor={tintColor} />
              );
            },
          };
        }}
      />
    </MainBottomTab.Navigator>
  );
};

const RootStack = createStackNavigator();

const RootNavigator = props => {
  return (
    <RootStack.Navigator {...props} screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        name={ROUTER.APP}
        component={MainNavigator}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

const AppStack = createStackNavigator();

const AppNavigator = parentProps => {
  const { ...rest } = parentProps;

  return (
    <AppStack.Navigator {...rest}>
      <AppStack.Screen
        name={ROUTER.ROOT}
        component={RootNavigator}
        options={{
          headerShown: false,
        }}
      />

      <AppStack.Screen
        name={ROUTER.CUSTOM_PAGE_SCREEN}
        component={CustomPageScreen}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name={ROUTER.READ_LATER_SCREEN}
        component={ReadLaterScreen}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name={ROUTER.POST_DETAIL_SCREEN}
        component={PostDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name={ROUTER.PHOTO_SCREEN}
        component={PhotoScreen}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name={ROUTER.SETTING_SCREEN}
        component={SettingScreen}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name={ROUTER.POST_NEWS_SCREEN}
        component={PostNewsScreen}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name={ROUTER.POST_LIST_SCREEN}
        component={PostListScreen}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name={ROUTER.POST_NEWS_CONTENT_SCREEN}
        component={PostNewsContentScreen}
        options={{
          headerShown: false,
        }}
      />
    </AppStack.Navigator>
  );
};

export const navigationRef = React.createRef();

export const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

export default AppNavigator;
