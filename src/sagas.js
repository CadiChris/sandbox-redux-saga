import { delay } from 'redux-saga'
import { put, takeEvery, take, all, call, fork, cancel, select, cancelled } from 'redux-saga/effects'


export function* incrementAsync() {
  yield call(delay, 2500)

  if (yield cancelled())
    return;

  yield put({ type: 'INCREMENT' })
}

export function* incrementAsyncFlow() {
  while (true) {
    yield take('INCREMENT_ASYNC')
    const task = yield fork(incrementAsync)
    const issue = yield take(['INCREMENT_ASYNC_CANCEL', 'INCREMENT'])
    if (issue.type === 'INCREMENT_ASYNC_CANCEL')
      yield cancel(task)
  }
}

export default function* rootSaga() {
  yield all([
    incrementAsyncFlow(),
    logAll(),
  ])
}

export function * logAll() {
  yield takeEvery('*', function* log(action) {
    const state = yield select();
    console.log('action', action);
    console.log('state after', state)
  })
}
