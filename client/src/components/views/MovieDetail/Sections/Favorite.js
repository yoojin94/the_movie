import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";

function Favorite(props) {
  const user = useSelector((state) => state.user);

  const [IsFavorite, setIsFavorite] = useState(false);
  const [FavoriteNumber, setFavoriteNumber] = useState(0);

  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const body = {
    movieId,
    userFrom,
    movieTitle,
    moviePost,
    movieRunTime,
  };

  const onClickHandler = () => {
    if (user.userData && !user.userData.isAuth) {
      return alert("Please Log in first");
    }
    if (IsFavorite) {
      //revome favorite
      axios.post("/api/favorite/removeFavorite", body).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber - 1);
          setIsFavorite(!IsFavorite);
        } else {
          alert("Failed to Remove To Favorite");
        }
      });
    } else {
      //add favorite
      axios.post("/api/favorite/addFavorite", body).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setIsFavorite(!IsFavorite);
        } else {
          alert("Failed to Add To Favorite");
        }
      });
    }
  };

  useEffect(() => {
    axios.post("/api/favorite/favoriteNumber", body).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
      } else {
        alert("Failed to get Favorite Number");
      }
    });

    axios.post("/api/favorite/favorited", body).then((response) => {
      if (response.data.success) {
        setIsFavorite(response.data.isFavorite);
      } else {
        alert("Failed to get Favorite Information");
      }
    });
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "15px" }}>
      {IsFavorite ? (
        <IconButton
          color="secondary"
          component="button"
          onClick={onClickHandler}
        >
          <FavoriteIcon />
        </IconButton>
      ) : (
        <IconButton color="default" component="button" onClick={onClickHandler}>
          <FavoriteBorderIcon />
        </IconButton>
      )}
      {FavoriteNumber}
    </div>
  );
}

export default Favorite;
