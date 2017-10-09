import { delay } from 'redux-saga'
import { put, takeEvery, all, call, select } from 'redux-saga/effects'

export function* helloSaga() {
  console.log('Hello Sagas!')
}

export function* incrementAsync() {
  yield call(delay, 1000)
  yield put({ type: 'INCREMENT' })
}

export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
export function * watchAll() {
  yield takeEvery('*', function* log(action) {
    const state = yield select();
    console.log('action', action);
    console.log('state after', state)
  })
}

export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
    watchAll(),
  ])
}