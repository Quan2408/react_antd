import { useMutation } from "@tanstack/react-query";
import { Button, Card, Col, Form, Input, message, Row } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate } = useMutation({
    mutationFn: async (formData) => {
      return await axios.post(`http://localhost:3000/login`, formData);
    },
    onSuccess: (data) => {
      const { user, token } = data.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
      messageApi.success("Đăng nhập thành công");
      navigate("/");
    },
    onError: (error) => {
      messageApi.error(`Đăng nhập thất bại: ${error.response.data.message}`);
    },
  });

  const onFinish = (values) => {
    mutate(values);
  };

  return (
    <div style={{ padding: "24px" }}>
      {contextHolder}
      <Row justify="center">
        <Col xs={24} sm={16} md={12} lg={8}>
          <Card title="Đăng nhập" bordered={false}>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Bắt buộc nhập email" },
                  {
                    type: "email",
                    message: "Email không đúng định dạng",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Bắt buộc nhập password" }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Signin;
