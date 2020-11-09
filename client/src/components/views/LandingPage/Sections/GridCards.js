import React from "react";
import Grid from "@material-ui/core/Grid";

function GridCards(props) {
  let { image, movieId, movieName } = props;

  return (
    <Grid item xs={3}>
      <div style={{ position: "relative" }}>
        <a href={`/movie/${movieId}`}>
          <img
            style={{ width: "100%", height: "320px" }}
            alt={movieName}
            src={image}
          />
        </a>
      </div>
    </Grid>
  );
}

export default GridCards;
