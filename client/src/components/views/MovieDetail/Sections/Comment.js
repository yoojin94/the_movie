import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import axios from "axios";

function Comment(props) {
  const user = useSelector((state) => state.user);
  const [Comment, setComment] = useState("");
  const [CommentList, setCommentList] = useState([]);
  const movieVariable = {
    movieId: props.postId,
  };

  const commentHandler = (e) => {
    setComment(e.target.value);
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    if (user.userData && !user.userData.isAuth) {
      return alert("Please Log in first");
    }
    const variables = {
      content: Comment,
      writer: user.userData._id,
      postId: props.postId,
    };

    const updateComment = (newComment) => {
      setCommentList(CommentList.concat(newComment));
    };

    axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        setComment("");
        updateComment(response.data.result);
      } else {
        alert("Failed to save Comment");
      }
    });
  };

  useEffect(() => {
    axios.post("/api/comment/getComments", movieVariable).then((response) => {
      console.log(response);
      if (response.data.success) {
        console.log("response.data.comments", response.data.comments);
        setCommentList(response.data.comments);
      } else {
        alert("Failed to get comments Info");
      }
    });
  }, []);

  const useStyles = makeStyles((theme) => ({
    textFiled: {
      width: "95%",
    },
    button: {
      height: "19px",
      width: "3%",
    },
  }));

  const classes = useStyles();

  return (
    <div>
      {CommentList &&
        CommentList.map((comment, index) => (
          <div>
            {comment.writer.name}
            {comment.content}
          </div>
        ))}

      {props.CommentLists && props.CommentLists.length === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          Be the first one who shares your thought about this movie
        </div>
      )}
      <form noValidate autoComplete="off">
        <TextField
          className={classes.textFiled}
          id="comment"
          variant="outlined"
          multiline
          label="what is your opinion?"
          onChange={commentHandler}
        />
        <Button variant="contained" onClick={onClickHandler} size="large">
          save
        </Button>
      </form>
    </div>
  );
}

export default Comment;
