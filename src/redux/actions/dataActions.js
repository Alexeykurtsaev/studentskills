import { SET_JOBS,
         LOADING_DATA,
         INTEREST_JOB,
         UNINTEREST_JOB,
         ENDORSE_SKILL,
         UNENDORSE_SKILL,
         LOADING_UI,
         POST_JOB,
         SET_ERRORS,
         POST_SKILL, 
         DELETE_SKILL,
         DELETE_JOB,
         CLEAR_ERRORS,
         SET_MESSAGES,
         SET_DIALOGUES
        } from '../types';
import axios from 'axios';

export const getJobs = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('https://europe-west1-unprotect-5499a.cloudfunctions.net/api/jobs')
      .then((res) => {
        dispatch({
          type: SET_JOBS,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_JOBS,
          payload: []
        });
      });
  };

  export const postJob = (newJob) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('https://europe-west1-unprotect-5499a.cloudfunctions.net/api/job', newJob)
      .then((res) => {
        dispatch({
          type: POST_JOB,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };

  export const postSkill = (newSkill) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('https://europe-west1-unprotect-5499a.cloudfunctions.net/api/skill', newSkill)
      .then((res) => {
        dispatch({
          type: POST_SKILL,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };

  export const interestJob = (jobId) => (dispatch) => {
    axios
      .get(`https://europe-west1-unprotect-5499a.cloudfunctions.net/api/job/${jobId}/interest`)
      .then((res) => {
        dispatch({
          type: INTEREST_JOB,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };

  export const uninterestJob = (jobId) => (dispatch) => {
    axios
      .get(`https://europe-west1-unprotect-5499a.cloudfunctions.net/api/job/${jobId}/uninterest`)
      .then((res) => {
        dispatch({
          type: UNINTEREST_JOB,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };

  export const deleteJob = (jobId) => (dispatch) => {
    axios
      .delete(`https://europe-west1-unprotect-5499a.cloudfunctions.net/api/job/${jobId}`)
      .then(() => {
        dispatch({ type: DELETE_JOB, payload: jobId });
      })
      .catch((err) => console.log(err));
  };

  export const endorseSkill = (skillId) => (dispatch) => {
    axios
      .get(`https://europe-west1-unprotect-5499a.cloudfunctions.net/api/skill/${skillId}/endorse`)
      .then((res) => {
        dispatch({
          type: ENDORSE_SKILL,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };

  export const unendorseSkill = (skillId) => (dispatch) => {
    axios
      .get(`https://europe-west1-unprotect-5499a.cloudfunctions.net/api/skill/${skillId}/uninterest`)
      .then((res) => {
        dispatch({
          type: UNENDORSE_SKILL,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };

  export const deleteSkill = (skillId) => (dispatch) => {
    axios
      .delete(`https://europe-west1-unprotect-5499a.cloudfunctions.net/api/skill/${skillId}`)
      .then(() => {
        dispatch({ type: DELETE_SKILL, payload: skillId });
      })
      .catch((err) => console.log(err));
  };
  
  export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };

  export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`https://europe-west1-unprotect-5499a.cloudfunctions.net/api/user/${userHandle}`)
      .then(res => {
        dispatch({
           type: SET_JOBS,
           payload: res.data.posts
        });
      })
      .catch(() => {
        dispatch({
          type: SET_JOBS,
          payload: null
        })
      })
  }

  export const getMessages = (handle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('https://europe-west1-unprotect-5499a.cloudfunctions.net/api/messages', handle)
      .then((res) => {
        dispatch({
          type: SET_MESSAGES,
          payload: res.handle.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_MESSAGES,
          payload: []
        });
      });
  };

  export const getDialogues = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('https://europe-west1-unprotect-5499a.cloudfunctions.net/api/dialogues')
      .then((res) => {
        dispatch({
          type: SET_DIALOGUES,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_DIALOGUES,
          payload: []
        });
      });
  };
