import { signinFailure, signinStart, signinSuccess } from "./userRedux"
import { publicRequest } from '../requestMethods'

export const signin = async (dispatch, user) => {
    dispatch(signinStart());
    try {
        const res = await publicRequest.post('auth/signin',user);
        dispatch(signinSuccess(res.data));
    } catch (err) {
        dispatch(signinFailure())
    }
}