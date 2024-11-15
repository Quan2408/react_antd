import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Radio,
  Select,
  Switch,
  Upload,
  message,
  Skeleton,
  Card,
} from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const { TextArea } = Input;

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [imageUrls, setImageUrls] = useState([]);
  const [defaultFileList, setDefaultFileList] = useState([]);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/products/${id}`);
      return response.data;
    },
  });

  useEffect(() => {
    if (data?.imageUrls && Array.isArray(data.imageUrls)) {
      setImageUrls(data.imageUrls);
      setDefaultFileList(
        data.imageUrls.map((url, index) => ({
          uid: index,
          name: `image-${index}`,
          status: "done",
          url: url,
        }))
      );
    }
  }, [data]);

  const { mutate } = useMutation({
    mutationFn: async (product) => {
      await axios.put(`http://localhost:3000/products/${id}`, product);
    },
    onSuccess: () => {
      messageApi.success("Cập nhật sản phẩm thành công");
      navigate("/admin/products");
      queryClient.invalidateQueries(["product", id]);
    },
    onError: (error) => {
      messageApi.error(`Cập nhật sản phẩm thất bại: ${error.message}`);
    },
  });

  const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);

  const handleOnChange = (info) => {
    if (info.file.status === "done") {
      setImageUrls((prev) => [...prev, info.file.response.secure_url]);
    } else if (info.file.status === "error") {
      messageApi.error(`${info.file.name} tải lên thất bại.`);
    }
  };

  const onFinish = (values) => {
    mutate({ ...values, imageUrls });
  };

  if (isLoading) return <Skeleton active />;

  return (
    <div>
      {contextHolder}
      <Card
        title="Cập nhật Sản Phẩm"
        style={{ maxWidth: 600, margin: "0 auto" }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ ...data }}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Bắt buộc nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá sản phẩm"
            name="price"
            rules={[
              { required: true, message: "Bắt buộc nhập giá sản phẩm" },
              { type: "number", min: 0, message: "Giá phải nhập > 0" },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Tình trạng"
            name="available"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item label="Loại hàng" name="type">
            <Radio.Group>
              <Radio value="type1"> Hàng cũ </Radio>
              <Radio value="type2"> Hàng mới </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Danh mục" name="category">
            <Select>
              <Select.Option value="laptop">Laptop</Select.Option>
              <Select.Option value="tablet">Tablet</Select.Option>
              {/* Thêm các danh mục khác nếu cần */}
            </Select>
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              key={defaultFileList.length}
              multiple={true}
              action="https://api.cloudinary.com/v1_1/ecommercer2021/image/upload"
              listType="picture-card"
              data={{ upload_preset: "demo-upload" }}
              onChange={handleOnChange}
              defaultFileList={defaultFileList}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProductEdit;
