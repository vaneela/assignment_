import * as PostApi from '../api/PostRequest';

export const deletePost = (postId,userId) => async (dispatch) => {
    dispatch({type:"DELETE_START"});
    try {
        const deletedPost = await PostApi.deletePost(postId,userId);
        dispatch({type:"DELETE_SUCCESS",data:deletedPost.data.deletedPostId})
    } catch (error) {
        dispatch({type:"DELETE_FAIL"})
        console.log("DELETE_FAIL")
        console.log(error);
    }
}

export const deleteComment = (commentId) => async (dispatch) => {
    dispatch({type:"COMMENT_DELETE_START"});
    try {
        const deletedComment = await PostApi.deleteComment(commentId);
        dispatch({type:"COMMENT_DELETE_SUCCESS",data:deletedComment.data.data})
    } catch (error) {
        dispatch({type:"COMMENT_DELETE_FAIL"})
        console.log("COMMENT_DELETE_FAIL")
        console.log(error);
    }
}