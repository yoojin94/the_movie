import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "./Sections/MainImage";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import GridCard from "./Sections/GridCards";

function LandingPage() {
  //useRef -> 특정 DOM선택하기
  //const buttonRef = useRef(null);
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);

  //useEffect 에서 설정한 함수가 컴포넌트가 화면에 가장 처음 렌더링 될 때만
  //실행되고 업데이트 할 경우에는 실행 할 필요가 없는 경우엔
  //함수의 두번째 파라미터로 비어있는 배열을 넣어주시면 됩니다.
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setMovies([...Movies, ...response.results]);
        setMainMovieImage(MainMovieImage || response.results[0]);
        setCurrentPage(response.page);
      });
  };
  const loadMoreItems = () => {
    let endpoint = "";
    console.log("CurrentPage", CurrentPage);
    endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };
  //스크롤해서 목록 받아오기
  /*useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 1) {
      // loadMoreItems()
      console.log("clicked");
      buttonRef.current.click();
    }
  };*/

  const useStyles = makeStyles((theme) => ({
    typography: {
      fontSize: 20,
      fontWeight: 600,
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <div>
        {MainMovieImage && (
          <MainImage
            image={`${IMAGE_BASE_URL}original${MainMovieImage.backdrop_path}`}
            title={MainMovieImage.original_title}
            text={MainMovieImage.overview}
          />
        )}
      </div>
      <div>
        <div style={{ margin: "30px" }}>
          <Typography align="center" className={classes.typography}>
            BEST MOVIES
          </Typography>
        </div>
        <Grid container spacing={3}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCard
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
            ))}
        </Grid>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            /*ref={buttonRef}*/ onClick={loadMoreItems}
          >
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
