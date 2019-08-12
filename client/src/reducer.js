import {
  OPEN_JOB_DIALOG,
  CLOSE_JOB_DIALOG,
  OPEN_CREATE_CANDIDATE_DIALOG,
  CLOSE_CREATE_CANDIDATE_DIALOG,
  OPEN_CREATE_JOB_DIALOG,
  CLOSE_CREATE_JOB_DIALOG,
  SET_AUTHENTICATED,
  SET_JOBS,
} from './actions/actions';

const initialState = {
  userRole: 'PRODUCER',
  jobQueue: [],
  processingQueue: [],
  jobDialogOpen: false,
  selectedJobID: null,
  createCandidateDialogOpen: false,
  createJobDialogOpen: false,
  showLoginPage: true,
};

const reducer = (state = initialState, action) => {
  if (action.type === OPEN_JOB_DIALOG) {
    return {
      ...state,
      jobDialogOpen: true,
      selectedJobID: action.jobid,
    };
  }

  if (action.type === CLOSE_JOB_DIALOG) {
    return {
      ...state,
      jobDialogOpen: false,
      selectedJobID: null,
    };
  }

  if (action.type === OPEN_CREATE_CANDIDATE_DIALOG) {
    return {
      ...state,
      createCandidateDialogOpen: true,
      selectedJobID: action.jobid,
    };
  }

  if (action.type === CLOSE_CREATE_CANDIDATE_DIALOG) {
    return {
      ...state,
      createCandidateDialogOpen: false,
      selectedJobID: null,
    };
  }

  if (action.type === OPEN_CREATE_JOB_DIALOG) {
    return {
      ...state,
      createJobDialogOpen: true,
    };
  }

  if (action.type === CLOSE_CREATE_JOB_DIALOG) {
    return {
      ...state,
      createJobDialogOpen: false,
    };
  }

  if (action.type === SET_AUTHENTICATED) {
    return {
      ...state,
      userRole: action.role,
      showLoginPage: false,
    };
  }

  if (action.type === SET_JOBS) {
    return {
      ...state,
      jobQueue: action.jobQueue,
      processingQueue: action.processingQueue,
    };
  }

  return state;
};

export default reducer;
