import { OPEN_JOB_DIALOG, CLOSE_JOB_DIALOG } from './actions';

export function openJobDialog() {
  console.log('in action')
  return {
    type: OPEN_JOB_DIALOG,
  };
}

export function closeJobDialog() {
  return {
    type: CLOSE_JOB_DIALOG,
  };
}
