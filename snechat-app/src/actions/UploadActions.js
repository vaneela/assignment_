import * as UploadApi from '../api/UploadRequest';

export const uploadImage = (data) => async (dispatch) => {
    try {
        const res = await UploadApi.uploadImage(data);
    } catch (error) {
        console.log(error);
    }
}
export const uploadPost = (data) => async (dispatch) => {
    dispatch({type:"UPLOAD_START"})
    console.log("UPLOAD_START")
    try {
        const newPost = await UploadApi.uploadPost(data);
        dispatch({type:"UPLOAD_SUCCESS",data:newPost.data})
        console.log("UPLOAD_SUCCESS")
    } catch (error) {
        dispatch({type:"UPLOAD_FAIL"})
        console.log("UPLOAD_FAIL")
        console.log(error);
    }
}

export const uploadComment = (data) => async (dispatch) => {
    dispatch({type:"COMMENT_UPLOAD_START"})
    console.log("COMMENT_UPLOAD_START")
    try {
        const newComment = await UploadApi.uploadComment(data);
        dispatch({type:"COMMENT_UPLOAD_SUCCESS",data:newComment.data})
        console.log("COMMENT_UPLOAD_SUCCESS")
    } catch (error) {
        dispatch({type:"COMMENT_UPLOAD_FAIL"})
        console.log("COMMENT_UPLOAD_FAIL")
        console.log(error);
    }
}