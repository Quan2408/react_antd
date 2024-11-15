import { useQuery } from "@tanstack/react-query";
import { Alert, Card, Col, Row, Spin, Typography, Button } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

const { Title, Text } = Typography;

const Detail = () => {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/products/${id}`);
      return response.data; // Trả về sản phẩm, không cần map ở đây
    },
  });

  if (isLoading) {
    return (
      <Spin
        tip="Loading..."
        style={{ padding: "50px", display: "block", margin: "auto" }}
      />
    );
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
    <div className="container con-custom">
      <h1 className="text-center text-bg-light">Product Information</h1>
      <hr />
      <div className="row">
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card hoverable cover={<img src={product.imageUrls} />}></Card>
          </Col>
          <Col xs={24} sm={12} md={16} lg={18}>
            <Title level={2} style={{ marginBottom: "16px" }}>
              {product.name}
            </Title>
            <strong>
              <Card.Meta description={`Price: $${product.price}`} />
            </strong>

            <Text style={{ display: "block", marginBottom: "16px" }}>
              <strong>Description: </strong>
              {product.description}
            </Text>
            <div style={{ marginTop: "20px" }}>
              <Button type="primary" size="large">
                Buy now
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Detail;
