import * as PostApi from '../api/PostRequest'

export const getTimeLineComments = (id) =>async (dispatch)=>{
    dispatch({type:"COMMENT_RETREIVING_START"});
    try {
        const {data} = await PostApi.getTimeLineComments(id);
        dispatch({type:"COMMENT_RETREIVING_SUCCESS",data:data});
    } catch (error) {
        dispatch({type:"COMMENT_RETREIVING_FAIL"})
        console.log(error);
    }
} 