import React, { Component } from "react";
import { Button, Card, List, message, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { reqProductListById, reqCategoryList } from "../../../../api";

const { Item } = List;

class Detail extends Component {
  state = {
    categoryId: "",
    desc: "",
    detail: "",
    imgs: [],
    name: "",
    price: "",
    categoryName: "",
    isLoading: true,
  };
  componentDidMount() {
    let { id } = this.props.match.params;
    let productList = this.props.productList;
    let categoryList = this.props.categoryInfo;
    if (productList.length) {
      let result = productList.find((item) => item._id === id);
      if (result) {
        this.setState({ ...result });
        this.categoryId = result.categoryId;
      }
    } else this.getProductListById(id);
    if (categoryList.length) {
      let result = categoryList.find((item) => item._id === this.categoryId);
      this.setState({ categoryName: result.name, isLoading: false });
    } else {
      //解决刷新后redux中内容消失的问题
      this.getCategoryList();
    }
  }
  //发送请求获取商品详情
  getProductListById = async (id) => {
    let result = await reqProductListById(id);
    const { data, status, msg } = result;
    if (status === 0) {
      this.setState({ ...data });
      this.categoryId = data.categoryId;
    } else message.error(msg);
  };

  //发送请求获取商品分类列表
  getCategoryList = async () => {
    let result = await reqCategoryList();
    const { status, data, msg } = result;
    if (status === 0) {
      let result = data.find((item) => item._id === this.categoryId);
      if (result) {
        this.setState({ categoryName: result.name, isLoading: false });
      }
    } else message.error(msg);
  };

  render() {
    return (
      <Card
        title={
          <div className="product-title">
            <Button
              type="link"
              size="small"
              style={{ fontSize: "16px" }}
              onClick={() => this.props.history.goBack()}
            >
              <ArrowLeftOutlined />
            </Button>
            <span style={{ fontSize: "16px" }}>商品详情</span>
          </div>
        }
      >
        <List size={"large"} loading={this.state.isLoading}>
          <Item>
            <Typography.Text>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                商品名称：
              </span>
              <span>{this.state.name}</span>
            </Typography.Text>
          </Item>
          <Item>
            <Typography.Text>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                商品描述：
              </span>
              <span>{this.state.desc}</span>
            </Typography.Text>
          </Item>
          <Item>
            <Typography.Text>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                商品价格：
              </span>
              <span>{this.state.price}元</span>
            </Typography.Text>
          </Item>
          <Item>
            <Typography.Text>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                所属分类：
              </span>
              <span>{this.state.categoryName}</span>
            </Typography.Text>
          </Item>
          <Item>
            <Typography.Text>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                商品图片：
              </span>
              {this.state.imgs.map((item, index) => {
                return (
                  <img
                    key={index}
                    src={`/upload/` + item}
                    alt=""
                    style={{ height: "150px", width: "150px" }}
                  />
                );
              })}
            </Typography.Text>
          </Item>
          <Item>
            <Typography.Text>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                商品详情：
              </span>
              <span
                dangerouslySetInnerHTML={{ __html: this.state.detail }}
              ></span>
            </Typography.Text>
          </Item>
        </List>
      </Card>
    );
  }
}

export default connect(
  (state) => ({
    productList: state.productInfo,
    categoryInfo: state.categoryInfo,
  }),
  {}
)(Detail);
