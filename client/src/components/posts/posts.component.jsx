import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/post/post.actions';
import Spinner from '../layout/spinner/spinner.component';
import PostItem from './post-item.component';
import PostForm from './post-form.component';

const Posts = () => {
  const dispatch = useDispatch();
  const { loading, posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome to the community!
      </p>

      <PostForm />

      <div className='posts'>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </>
  );
};

export default Posts;
