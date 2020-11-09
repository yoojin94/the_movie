import React, { useEffect, useState } from "react";
import axios from "axios";
import GridCard from "../LandingPage/Sections/GridCards";
import Grid from "@material-ui/core/Grid";
import { IMAGE_BASE_URL } from "../../Config";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function FavoritePage() {
  let variable = { userFrom: localStorage.getItem("userId") };
  const [Movies, setMovies] = useState([]);

  useEffect(() => {
    axios.post("/api/favorite/favoriteList", variable).then((response) => {
      if (response.data.success) {
        setMovies(response.data.movies);
        console.log(response.data.movies);
      } else {
        alert("Failed to get Favorite Movies");
      }
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
      <div style={{ margin: "30px" }}>
        <Typography align="left" className={classes.typography}>
          My Favorite Movies
        </Typography>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <Grid container spacing={3}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCard
                  image={
                    movie.moviePost
                      ? `${IMAGE_BASE_URL}w500${movie.moviePost}`
                      : null
                  }
                  movieId={movie.movieId}
                  movieName={movie.movieTitle}
                />
              </React.Fragment>
            ))}
        </Grid>
      </div>
    </div>
  );
}

export default FavoritePage;
