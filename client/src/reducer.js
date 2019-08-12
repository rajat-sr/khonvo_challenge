import {
  OPEN_JOB_DIALOG,
  CLOSE_JOB_DIALOG,
  OPEN_CREATE_CANDIDATE_DIALOG,
  CLOSE_CREATE_CANDIDATE_DIALOG,
  OPEN_CREATE_JOB_DIALOG,
  CLOSE_CREATE_JOB_DIALOG,
} from './actions/actions';

const initialState = {
  userRole: 'QUERIER',
  jobDialogOpen: false,
  jobDialogID: null,
  createCandidateDialogOpen: false,
  createJobDialogOpen: false,
};

const reducer = (state = initialState, action) => {
  if (action.type === OPEN_JOB_DIALOG) {
    return {
      ...state,
      jobDialogOpen: true,
      jobDialogID: action.jobid,
    };
  }

  if (action.type === CLOSE_JOB_DIALOG) {
    return {
      ...state,
      jobDialogOpen: false,
      jobDialogID: null
    };
  }

  if (action.type === OPEN_CREATE_CANDIDATE_DIALOG) {
    return {
      ...state,
      createCandidateDialogOpen: true,
    };
  }

  if (action.type === CLOSE_CREATE_CANDIDATE_DIALOG) {
    return {
      ...state,
      createCandidateDialogOpen: false,
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

  return state;
};

export default reducer;
