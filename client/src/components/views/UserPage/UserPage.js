import React, { useEffect, useState } from "react";
import Axios from "axios";
import Masonry from "react-masonry-component";
import { Icon, Card, Popover, Button, Alert } from "antd";

function UserPage(props) {
  const [Products, setProducts] = useState([]);
  const handleDelete = () => {
    alert("准备删除功能");
  };
  const handleEdit = () => {
    alert("编辑功能");
  };
  const content = (
    <div>
      <div>
        <a onClick={handleDelete}>下架删除</a>
      </div>
      <div>
        <a onClick={handleEdit}>修改内容</a>
      </div>
    </div>
  );

  useEffect(() => {
    if (props.user.userData) {
      const variables = { userid: props.user.userData._id };
      getProducts(variables);
    }
  }, [props.user]);

  const getProducts = (variables) => {
    Axios.post("/api/product/getByUser", variables).then((response) => {
      if (response.data.success) {
        setProducts([...Products, ...response.data.products]);
      } else {
        alert("failed to get items");
      }
    });
  };

  const renderCards = Products.map((product, index) => {
    return (
      // <Col lg={6} md={8} xs={24}>
      <div
        style={{
          marginRight: "15px",
          marginBottom: "10px",
          display: "inline-block",
        }}
      >
        <Popover content={content} title="Edit">
          <Card
            style={{ width: "270px" }}
            hoverable={true}
            cover={
              <a href={`/product/${product._id}`}>
                <img
                  style={{ width: "270px", height: `${752 / 270}%` }}
                  src={`http://localhost:5000/${product.images[0]}`}
                />
              </a>
            }
          >
            <Card.Meta
              title={product.title}
              description={`$${product.price}`}
            />
          </Card>
        </Popover>
      </div>
      // </Col>
    );
  });

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h1>
          我的物品 <Icon type="account-book" />
        </h1>
      </div>

      {Products.length === 0 ? (
        <div
          style={{
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>No post yet...</h2>
        </div>
      ) : (
        <div>
          <Masonry
            className={"my-gallery-class"} // default ''
            options={{ transitionDuration: 2 }} // default {}
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
          >
            {renderCards}
          </Masonry>
        </div>
      )}
    </div>
  );
}

export default UserPage;
