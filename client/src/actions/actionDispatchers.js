import {
  OPEN_JOB_DIALOG,
  CLOSE_JOB_DIALOG,
  OPEN_CREATE_CANDIDATE_DIALOG,
  CLOSE_CREATE_CANDIDATE_DIALOG,
  OPEN_CREATE_JOB_DIALOG,
  CLOSE_CREATE_JOB_DIALOG,
  SET_AUTHENTICATED,
  SET_JOBS,
  LOGOUT
} from './actions';
import { BASE_URL } from '../utils';
import { errorToast } from '../components/Toast/Toast';
import axios from 'axios';

export function openJobDialog(jobid) {
  return {
    type: OPEN_JOB_DIALOG,
    jobid,
  };
}

export function closeJobDialog() {
  return {
    type: CLOSE_JOB_DIALOG,
  };
}

export function openCreateCandidateDialog(jobid) {
  return {
    type: OPEN_CREATE_CANDIDATE_DIALOG,
    jobid,
  };
}

export function closeCreateCandidateDialog() {
  return {
    type: CLOSE_CREATE_CANDIDATE_DIALOG,
  };
}

export function openCreateJobDialog() {
  return {
    type: OPEN_CREATE_JOB_DIALOG,
  };
}

export function closeCreateJobDialog() {
  return {
    type: CLOSE_CREATE_JOB_DIALOG,
  };
}

export function setAuthenticated(role) {
  return {
    type: SET_AUTHENTICATED,
    role,
  };
}

export function setJobList(jobQueue, processingQueue) {
  return {
    type: SET_JOBS,
    jobQueue,
    processingQueue,
  };
}

export function refreshJobList() {
  return dispatch => {
    const url = BASE_URL + '/job';
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('khonvotoken')}`,
        },
      })
      .then(res => {
        const jobQueue = [];
        const processingQueue = [];
        res.data.forEach(job => {
          if (job.status === 'OPEN') {
            jobQueue.push(job);
          } else if (job.status === 'INPROCESS') {
            processingQueue.push(job);
          }
        });
        dispatch(setJobList(jobQueue, processingQueue));
      })
      .catch(e => {
        errorToast(e.response.data);
        console.log('refresh job');
      });
  };
}

export function logout() {
  localStorage.clear();
  return {
    type: LOGOUT
  }
}
