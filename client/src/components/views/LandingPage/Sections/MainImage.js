import React from "react";

function MainImage(props) {
  return (
    <div
      style={{
        background: `url('${props.image}')`,
        height: "500px",
        display: "flex",
        backgroundSize: "cover",
      }}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            alignSelf: "flex-end",
            maxWidth: "500px",
            marginLeft: "2rem",
          }}
        >
          <h2 style={{ color: "white" }}> {props.title} </h2>
          <p style={{ color: "white", fontSize: "1rem" }}>{props.text} </p>
        </div>
      </div>
    </div>
  );
}

export default MainImage;
