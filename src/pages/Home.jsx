import React, { useEffect, useState } from "react";
import Loader from "../component/Loader";
import { Card, Row, Col, Avatar, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../component/App.css";
import moment from "moment";

// const { Meta } = Card;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="home-container">
      <h2 className="home-title">Latest Products</h2>
      <Row gutter={[0, 24]}>
        {" "}
        {/* Only vertical gutter, no horizontal gutter */}
        {products.map((product) => (
          <Col xs={24} key={product.id}>
            {" "}
            {/* Only one column per row */}
            <Card className="post-card">
              <div className="post-header">
                <Avatar size={40} icon={<UserOutlined />} />
                <div className="post-info">
                  <span className="post-author">User Name (Example)</span>
                  <span className="post-date">
                    {moment().format("MMMM Do YYYY, h:mm a")}
                  </span>
                </div>
              </div>
              <Divider />
              <div className="post-image-container">
                {" "}
                {/* The wrapper div */}
                <img
                  alt={product.title}
                  src={product.image}
                  className="post-image"
                />
              </div>
              <div className="post-content">
                <h3 className="post-title">{product.title}</h3>
                <p className="post-description">
                  {product.description.substring(0, 150) + "..."}
                </p>
                <div className="post-actions">
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
