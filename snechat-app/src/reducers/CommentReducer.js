const CommentReducer = (
    state = { comments: {}, loading: false, error: false, loading: false },
    action
) => {
    switch (action.type) {
        case "COMMENT_UPLOAD_START":
            return { ...state, loading: true, error: false };
        case "COMMENT_UPLOAD_SUCCESS":
            var currentPostId = action.data.postId;
            state.comments[currentPostId].push(action.data);
            return { ...state, loading: false, error: false };
        case "COMMENT_UPLOAD_FAIL":
            return { ...state, loading: false, error: true };
        case "COMMENT_RETREIVING_START":
            return { ...state, loading: true, error: false };
        case "COMMENT_RETREIVING_SUCCESS":
            for (var i = 0; i < action.data.length; i++) {
                var currentPostId = action.data[i].postId;
                if (state.comments[currentPostId]) {
                    state.comments[currentPostId].push(action.data[i]);
                } else {
                    state.comments[currentPostId] = [];
                    state.comments[currentPostId].push(action.data[i]);
                }
            }
            return { ...state, loading: false, error: false };
        case "COMMENT_RETREIVING_FAIL":
            return { ...state, loading: false, error: true };
        case "COMMENT_DELETE_START":
            return { ...state, loading: false, error: true };
        case "COMMENT_DELETE_SUCCESS":
            console.log(action.data)
            state.comments[action.data.postId] = state.comments[action.data.postId].filter((comment) => comment._id !== action.data._id);
            return { ...state, comments: state.comments, loading: false, error: false };
        case "COMMENT_DELETE_FAIL":
            return { ...state, loading: false, error: true };
        case "CLEAR_COMMENTS":
            state.comments[action.data] = [];
            return { ...state, loading: false, error: true };
        default:
            return state;
    };
}

export default CommentReducer;