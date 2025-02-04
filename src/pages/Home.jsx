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
      {contextHolder} {/* Place contextHolder for messages */}
      <h2 className="home-title">Latest Products</h2>
      <Row justify="center" gutter={[0, 24]}>
        {products.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}> {/* Added responsive grid */}
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
                <img
                  alt={product.title}
                  src={product.image}
                  className="post-image"
                  style={{ maxWidth: "100%", height: "auto" }} // Make image responsive
                />
              </div>
              <div className="post-content">
                <h3 className="post-title">{product.title}</h3>
                <p className="post-description">
                  {product.description.length > 150
                    ? product.description.substring(0, 150) + "..."
                    : product.description} {/* Handle short descriptions */}
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