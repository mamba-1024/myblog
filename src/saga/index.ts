import watchMainPage from './mainSaga';
import watchProfilePage from './profileSaga';

export const getSagaList = {
    watchMainPage,
    watchProfilePage
}