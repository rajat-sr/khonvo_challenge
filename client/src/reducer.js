import {
  OPEN_JOB_DIALOG,
  CLOSE_JOB_DIALOG,
  OPEN_CREATE_CANDIDATE_DIALOG,
  CLOSE_CREATE_CANDIDATE_DIALOG,
} from './actions/actions';

const initialState = {
  userRole: 'PRODUCER',
  jobDialogOpen: false,
  createCandidateDialogOpen: false,
};

const reducer = (state = initialState, action) => {
  if (action.type === OPEN_JOB_DIALOG) {
    return {
      ...state,
      jobDialogOpen: true,
    };
  }

  if (action.type === CLOSE_JOB_DIALOG) {
    return {
      ...state,
      jobDialogOpen: false,
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

  return state;
};

export default reducer;
