import React, {Fragment,useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'; 
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost} from '../../actions/post';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasFaHeart } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown as fasFaThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farFaHeart} from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown as farFaThumbsDown} from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
// import post from '../../reducers/post';

library.add(
  faComment
);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));


const PostItem = ({ auth,
    addLike,
    removeLike,
    deletePost,
    post: {_id, text, name, avatar,user,likes,comments,date},
showActions
}) => {

  const [heart, setHeart] = useState(farFaHeart);


  // if (likes.filter(like => like.user === auth.user.id)){
  //   alert('koko');
  // }

  const [thumbs, setThumbs] = useState(farFaThumbsDown);
  const classes = useStyles();

  // auth.isAuthenticated && auth.loading === false &&


  

    return (
        <div className="post bg-white p-1 my-1">
          <div className="post-profile">
            <Link to={`/profile/${user}`}>
             <Avatar alt="" src={avatar} className={classes.large} />
              {/* <img
                className="round-img"
                src={avatar}
                alt=""
              /> */}
              <h4 style= {{color:'white',margin:'auto'}}>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
              {text}
            </p>
             <p className="post-date">
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
            <hr style={{
      display: 'block',
      height: '1px',
      // width:'89%',
      border: '0',
      borderTop: '1px solid #757575',
      marginBottom: '7px',
      padding: '0',
      marginTop:'20px'
     }}></hr>
            <div className="post-content">
            {showActions && <Fragment>
             {auth.user._id == likes.filter(like => like.user === auth.user._id).map(likes => likes.user) ? (
               <button type='button' className='btn-post-body'>
                    <FontAwesomeIcon
                    onClick={() => {
                      setHeart(fasFaHeart);
                      setThumbs(farFaThumbsDown);
                    }}
                    icon={fasFaHeart} size='2x' style={{color:'white'}}/>{'   '}

                <span style={{color:'white'}}>{likes.length > 0 && (
               <span>{likes.length}</span>)}</span>
               </button>
             ) : (
              <button type='button' onClick={e => addLike(_id)}  className='btn-post-body'>
              <FontAwesomeIcon
              onClick={() => {
                setHeart(fasFaHeart);
                setThumbs(farFaThumbsDown);
              }}
              icon={farFaHeart} size='2x' style={{color:'white'}}/>

            <span style={{color:'white'}}>{likes.length > 0 && (
               <span>{likes.length}</span>)}</span>{'   '}
         </button>
             )
             }
                {/* <button onClick={e => addLike(_id)} type="button" className="btn-post-body">
              {auth.user && (
                alert(),
                    <FontAwesomeIcon
                    onClick={() => {
                      setHeart(fasFaHeart);
                      setThumbs(farFaThumbsDown);
                    }}
                    icon={heart} size='2x' style={{color:'white'}}/>
              )}{'   '}
              
              <span style={{color:'white'}}>{likes.length > 0 && (
               <span>{likes.length}</span>)}</span>
            </button> */}
            <button onClick={e => removeLike(_id)} type="button" className="btn-post-body">
              {/* <i className="fa fa-thumbs-down fa-2x"></i> */}
              <FontAwesomeIcon
              onClick={() => {
                setThumbs(fasFaThumbsDown);
                setHeart(farFaHeart);
              }}
              icon={thumbs} size='2x' style={{color:'white'}}/>{'   '}
            </button>
            <button className="btn-post-body">
            <Link to={`/post/${_id}`} >
              {/* Comments{'  '} */}
              <FontAwesomeIcon icon={faComment} size='2x' style={{color:'white'}}/>{'   '}
              {comments.length > 0 && (
               <span style={{color:'white'}}>{comments.length}</span>)}
            </Link>
            </button>
          
            {!auth.loading && user === auth.user._id && (

            <button   
            onClick={e => deletePost(_id)}   
            type="button"
            className="btn btn-danger"
          >
            <i className="fa fa-times"></i>
          </button>
                
            )}
 </Fragment>}
            </div>
            
          </div>
        </div>
    )

}

PostItem.defaultProps = {
    showActions:true
}

PostItem.propTypes = {
    post:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    addLike:PropTypes.func.isRequired,
    removeLike:PropTypes.func.isRequired,
    deletePost:PropTypes.func.isRequired,
    // getPosts: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
     auth:state.auth,
    //  post:state.post
});

export default connect(mapStateToProps, {addLike, removeLike, deletePost})(PostItem);
