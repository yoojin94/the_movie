import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom";
//useSelector -> 리덕스스토어의 상태에 접근가능
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const onClickHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃에 실패했습니다.");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <React.Fragment>
        <Button component={Link} variant="outlined" size="small" to={"/login"}>
          Sign In
        </Button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Button variant="outlined" size="small" onClick={onClickHandler}>
          Log Out
        </Button>
      </React.Fragment>
    );
  }
}

export default withRouter(RightMenu);
