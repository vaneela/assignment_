import * as UserApi from '../api/UserRequest';

export const getUser = (userId) => async (dispatch) => {
    try {
        const user = await UserApi.getUser(userId);
        return user;
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = (userId, userData) => async (dispatch) => {
    dispatch({ type: "UPDATE_START" });
    try {
        const { data } = await UserApi.updateUser(userId, userData);
        dispatch({ type: "UPDATE_SUCCESS", data: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: "UPDATE_FAIL" });
    }
}

export const followUser = (userId, userData) => async (dispatch) => {
    dispatch({ type: "FOLLOW_USER",data:userId});
    UserApi.followUser(userId, userData);

}

export const unFollowUser = (userId, userData) => async (dispatch) => {
    dispatch({ type: "UNFOLLOW_USER" ,data:userId});
    UserApi.unFollowUser(userId, userData);
}