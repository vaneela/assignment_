const PostReducer = (
    state = { posts: [], loading : false, error: false, uploading: false },
    action
)=>{
    switch(action.type){
        case "UPLOAD_START":
            return {...state,uploading:true,error:false};
        case "UPLOAD_SUCCESS":
            return {...state,posts:[action.data,...state.posts],uploading:false,error:false};
        case "UPLOAD_FAIL":
            return {...state,uploading:false,error:true}; 
        case "RETREIVING_START":
            return {...state,uploading:true,error:false};
        case "RETREIVING_SUCCESS":
            return {...state,posts:action.data,uploading:false,error:false};
        case "RETREIVING_FAIL":
            return {...state,uploading:false,error:true}; 
        case "DELETE_START":
            return {...state,uploading:false,error:true}; 
        case "DELETE_SUCCESS":
            console.log(action.data)
            return { ...state, posts: [ ...state.posts.filter((post) => post._id !== action.data)] } 
        case "DELETE_FAIL":
            return {...state,uploading:false,error:true}; 
        default:
            return state;
    };  
}

export default PostReducer;