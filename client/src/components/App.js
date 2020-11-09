import React from "react";
//<BrowserRouter />: HTML5 히스토리 API를 사용하여 주소를 관리하는 라우터(해쉬뱅 모드 사용 안함)
//<Route />: 요청 경로와 렌더링할 컴포넌트를 설정한다
//<Switch />: 하위에 라우터 중 하나를 선택한다
//<Redirect />: 요청 경로를 다른 경로로 리다이렉션한다
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import FavoritePage from "./views/FavoritePage/FavoritePage";
import NavBar from "./views/NavBar/NavBar";
import Auth from "../hoc/auth";
import MovieDetail from "./views/MovieDetail/MovieDetail";

function App() {
  return (
    <Router>
      <NavBar />
      <div>
        <Switch>
          {/** exact -> path와 완벽하게 일치할 때만 route */}
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/favorite" component={Auth(FavoritePage, true)} />
          <Route
            exact
            path="/movie/:movieId"
            component={Auth(MovieDetail, null)}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
