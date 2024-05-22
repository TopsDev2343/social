/** @format */

import { INITIAL_NOTIFICATION } from '@redux/types';
import { Config, Constants } from '@common';

const initialState = {
  data: {},
};

export default (state = initialState, action) => {
  // console.log("type:", action.type, "action:", action);

  switch (action.type) {
    case INITIAL_NOTIFICATION:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};
