import {
  OPEN_JOB_DIALOG,
  CLOSE_JOB_DIALOG,
  OPEN_CREATE_CANDIDATE_DIALOG,
  CLOSE_CREATE_CANDIDATE_DIALOG,
} from './actions';

export function openJobDialog() {
  return {
    type: OPEN_JOB_DIALOG,
  };
}

export function closeJobDialog() {
  return {
    type: CLOSE_JOB_DIALOG,
  };
}

export function openCreateCandidateDialog() {
  return {
    type: OPEN_CREATE_CANDIDATE_DIALOG,
  };
}

export function closeCreateCandidateDialog() {
  return {
    type: CLOSE_CREATE_CANDIDATE_DIALOG,
  };
}
