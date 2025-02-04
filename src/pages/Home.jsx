import React, { useEffect, useState } from "react";
import Loader from "../component/Loader";
import { Card, Row, Col, Avatar, Divider, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../component/App.css";
import moment from "moment";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
        messageApi.error("Failed to load products.");
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="home-container">
      {contextHolder} 
      <h2 className="home-title">Latest Products</h2>
      <Row 
        justify="center" 
        style={{ width: "100%", margin: 0, padding: "0 10px" }} // Extra padding for small screens
      >
        {products.map((product) => (
          <Col
            xs={24} // Full width on extra small screens
            sm={20} // 80% width on small screens
            md={16} // 65% width on medium screens
            lg={12} // 50% width on large screens
            xl={8}  // 33% width on extra large screens
            key={product.id}
            style={{ display: "flex", justifyContent: "center", paddingBottom: "16px" }} 
          >
            <Card 
              className="post-card" 
              style={{ width: "100%", maxWidth: "400px", borderRadius: "10px" }} 
            >
              <div className="post-header">
                <Avatar size={40} icon={<UserOutlined />} className="post-avatar" />
                <div className="post-info">
                  <span className="post-author">User Name (Example)</span>
                  <span className="post-date">
                    {moment().format("MMMM Do YYYY, h:mm a")}
                  </span>
                </div>
              </div>
              <Divider />
              <div className="post-image-container" style={{ textAlign: "center" }}>
                <img
                  alt={product.title}
                  src={product.image}
                  className="post-image"
                  style={{ maxWidth: "100%", height: "auto", display: "block", borderRadius: "8px" }} 
                />
              </div>
              <div className="post-content">
                <h3 className="post-title">{product.title}</h3>
                <p className="post-description">
                  {product.description.length > 150
                    ? product.description.substring(0, 150) + "..."
                    : product.description}
                </p>
                <div className="post-actions" style={{ textAlign: "center" }}>
                  <button>Like</button>
                  <button>Comment</button>
                  <button>Share</button>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
