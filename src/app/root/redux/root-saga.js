import { all } from 'redux-saga/effects'
import { watchLoginSaga } from '../../login/sagas'


export default function* rootSaga() {
    yield all([
        ...watchLoginSaga,
    ])
}
