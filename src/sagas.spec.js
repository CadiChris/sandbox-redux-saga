import test from 'tape';

import { incrementAsync } from './sagas'
import { delay } from "redux-saga";
import { call, put } from "redux-saga/effects";

test('incrementAsync Saga test', (assert) => {
  const gen = incrementAsync()
  assert.deepEqual(gen.next().value, call(delay, 1000))
  assert.deepEqual(gen.next().value, put({type: 'INCREMENT'}))
  assert.deepEqual(gen.next(), {done: true, value: undefined})

  assert.end()
});