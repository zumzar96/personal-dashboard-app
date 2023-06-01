import { takeLatest, call, put } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  loginError,
  loginSuccess,
} from "./actions";
import axios from "axios";


export const watchLoginSaga = [takeLatest(LOGIN_REQUEST, login)];

function* login(action) {
  try {
    const { userBody } = action;
    const response = yield call(loginUser, userBody.email, userBody.password);
      yield put(loginSuccess(response.data.idToken, false));
  } catch (ex) {
    yield put(loginError(true));
  }
}

async function loginUser(email, password) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_AUTH_API_KEY}`,
    {
      email: email,
      password: password,
    }
  );
  return response;
}
