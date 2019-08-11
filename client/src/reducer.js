import { OPEN_JOB_DIALOG, CLOSE_JOB_DIALOG } from './actions/actions';

const initialState = {
  userRole: 'QUERIER',
  jobDialogOpen: false,
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

  return state;
};

export default reducer;
