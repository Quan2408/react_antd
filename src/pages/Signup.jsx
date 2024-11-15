import { useMutation } from "@tanstack/react-query";
import { Button, Card, Col, Form, Input, message, Row } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate } = useMutation({
    mutationFn: async (formData) => {
      return await axios.post(`http://localhost:3000/register`, formData);
    },
    onSuccess: () => {
      messageApi.success("Đăng ký thành");
      form.resetFields();
      navigate("/signin");
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
          <Card title="Đăng ký" bordered={false}>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Bắt buộc nhập username" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Bắt buộc nhập email" },
                  { type: "email", message: "Email không đúng định dạng" },
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
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Signup;
