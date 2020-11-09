import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import Favorite from "./Sections/Favorite";
import Comment from "./Sections/Comment";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function MovieDetail(props) {
  const movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);

  useEffect(() => {
    const endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    fetch(endpointForMovieInfo)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
      });
  }, []);

  const useStyles = makeStyles((theme) => ({
    typography: {
      fontSize: 30,
      fontWeight: 600,
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <MainImage
        image={`${IMAGE_BASE_URL}original${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />
      <MovieInfo movie={Movie} />
      <Favorite
        movieInfo={Movie}
        movieId={movieId}
        userFrom={localStorage.getItem("userId")}
      />
      <div style={{ margin: "30px" }}>
        <Typography align="left" className={classes.typography}>
          Comment
        </Typography>
      </div>
      <Comment movieTitle={Movie.original_title} postId={movieId} />
    </div>
  );
}

export default MovieDetail;
