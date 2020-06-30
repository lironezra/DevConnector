import React, { useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../layout/spinner/spinner.component';
import PostItem from '../posts/post-item.component';

import { getPost } from '../../redux/post/post.actions';
import CommentForm from './comment-form.component';
import CommentItem from './comment-item.component';

const Post = ({ match, history }) => {
  const { post, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(match.params.id));
  }, [dispatch]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </>
  );
};

export default withRouter(Post);
