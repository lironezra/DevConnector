import React, { useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../layout/spinner/spinner.component';
import PostItem from '../posts/post-item.component';

import { getPost } from '../../redux/post/post.actions';

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
    </>
  );
};

export default withRouter(Post);
