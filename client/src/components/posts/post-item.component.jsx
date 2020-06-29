import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { addLike, removeLike, deletePost } from '../../redux/post/post.actions';

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions
}) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <>
      <div className='post bg-white p-1 my-1'>
        <div>
          <a href='profile.html'>
            <img className='round-img' src={avatar} alt='' />
            <h4>{name}</h4>
          </a>
        </div>
        <div>
          <p className='my-1'>{text}</p>
          <p className='post-date'>
            Posted on {<Moment format='YYYY/MM/DD'>{date}</Moment>}
          </p>

          {showActions && (
            <>
              <button
                type='button'
                className='btn btn-light'
                onClick={() => dispatch(addLike(_id))}
              >
                <i className='fas fa-thumbs-up'></i>{' '}
                <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
              </button>
              <button
                onClick={() => dispatch(removeLike(_id))}
                type='button'
                className='btn btn-light'
              >
                <i className='fas fa-thumbs-down'></i>
              </button>
              <Link to={`/posts/${_id}`} className='btn btn-primary'>
                Comments{' '}
                {comments.length > 0 && (
                  <span className='comment-count'>{comments.length}</span>
                )}
              </Link>
              {!auth.loading && user === auth.user._id && (
                <button
                  onClick={() => dispatch(deletePost(_id))}
                  type='button'
                  className='btn btn-danger'
                >
                  <i className='fas fa-times'></i>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

PostItem.defaultProps = {
  showActions: true
};

export default PostItem;
