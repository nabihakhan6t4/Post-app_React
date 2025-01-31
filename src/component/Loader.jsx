import React from "react";
import { Spin } from "antd";

const Loader = () => {
  return (
    <div style={loaderStyle}>
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

const loaderStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

export default Loader;
