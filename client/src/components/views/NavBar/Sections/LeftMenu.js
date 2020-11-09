import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function LeftMenu() {
  return (
    <React.Fragment>
      <Button component={Link} size="small" to={"/"}>
        Home
      </Button>
      <Button component={Link} size="small" to={"/favorite"}>
        Favorite
      </Button>
    </React.Fragment>
  );
}

export default LeftMenu;
