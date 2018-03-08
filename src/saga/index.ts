import watchMainPage from './mainSaga';
import watchProfilePage from './profileSaga';
import watchLoginAsync from './login';

export const getSagaList = {
    watchMainPage,
    watchProfilePage,
    watchLoginAsync
}