/** @format */

import wp from '@services/WPAPI';
import fetch from './fetch';
import { Config, Constants } from '@common';

import { INITIAL_NOTIFICATION } from '@redux/types';

/**
 * @param
 * use plugin onesignal of wordpress ==> they do not support payload.additionalData
 * so we will use payload.body which is title post
 */
export const setInitialNotification = openResult => {
  return dispatch => {
    dispatch({
      type: INITIAL_NOTIFICATION,
      payload: openResult.notification.payload.additionalData,
      //   payload: openResult.notification.payload.body,
    });
  };
};
