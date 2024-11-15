import { useQuery } from "@tanstack/react-query";
import { Card, Row, Col, Spin, Alert, Button } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/products`);
      return response.data.map((product) => ({
        key: product.id,
        ...product,
      }));
    },
  });

  if (isLoading) {
    return <Spin tip="Loading products..." />;
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error.message}
        type="error"
        showIcon
      />
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[16, 16]}>
        {data.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img src={product.imageUrls} />}
              title={product.name}
              actions={[
                <Button type="primary" key="buy">
                  <Link to={`/detail/${product.id}`}>View Product</Link>
                </Button>,
              ]}
            >
              <Card.Meta description={`Price: $${product.price}`} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
