import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    INTEREST_JOB,
    UNINTEREST_JOB,
    ENDORSE_SKILL,
    UNENDORSE_SKILL,
    MARK_NOTIFICATIONS_READ
  } from '../types';
  
  const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    messages: {},
    notifications: []
  };

  export default function(state = initialState, action){
    switch (action.type) {
        case SET_AUTHENTICATED:
          return {
            ...state,
            authenticated: true
          };
        case SET_UNAUTHENTICATED:
          return initialState;
        case SET_USER:
          return {
            authenticated: true,
            loading: false,
            ...action.payload
          };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case INTEREST_JOB:
          return {
            ...state,
            interests: [
              ...state.interests,
            {
              userHandle: state.credentials.handle,
              jobId: action.payload.jobId
            }
           ]
          };
        case UNINTEREST_JOB:
          return {
            ...state,
            interests: state.interests.filter(
              (interest) => interest.jobId !== action.payload.jobId
            )
          };
        case ENDORSE_SKILL:
          return {
            ...state,
            endorsments: [
              ...state.endorsements,
            {
              userHandle: state.credentials.handle,
              skillId: action.payload.skillId
            }
           ]
          };
        case UNENDORSE_SKILL:
          return {
            ...state,
            endorsements: state.endorsements.filter(
              (endorse) => endorse.skillId !== action.payload.skillId
            )
          };
        default:
            return state;
    }
  }