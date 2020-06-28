import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/post/post.actions';
import Spinner from '../layout/spinner/spinner.component';

const Posts = () => {
  const dispatch = useDispatch();
  const { loading, posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return <></>;
};

export default Posts;
