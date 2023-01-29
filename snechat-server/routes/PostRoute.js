const express = require('express');
const { CreatePostHandler, GetPostHandler, UpdatePostHandler, DeletePostHandler, LikePostHandler, GetTimeLinePosts} = require('../controllers/PostController');
const {CreateCommentHandler, GetTimeLineComments, DeleteCommentHandler} = require('../controllers/CommentController');
const PostRoute = express.Router();

PostRoute.post('/create',CreatePostHandler);
PostRoute.get('/get/:id',GetPostHandler);
PostRoute.put('/update/:id',UpdatePostHandler);
PostRoute.delete('/:postId/delete/:userId',DeletePostHandler);
PostRoute.delete('/comment/:commentId/delete',DeleteCommentHandler);
PostRoute.put('/:id/like',LikePostHandler);
PostRoute.get('/:id/timeline',GetTimeLinePosts);
PostRoute.get('/:id/comments/timeline',GetTimeLineComments);
PostRoute.post('/comment/add',CreateCommentHandler);


module.exports = PostRoute;