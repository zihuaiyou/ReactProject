import React, { Component } from "react";
import { Button, Card, Select, Input, Table, message } from "antd";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import {
  reqProductsList,
  reqUpdateProductStatus,
  reqSearchProductList,
} from "../../../api";
import { PAGE_SIZE } from "../../../config";

const { Option } = Select;

export default class Products extends Component {
  state = {
    productList: [], //商品列表
    total: "", //商品总页数
    current: 1, //当前页
    searchType: "productName", //搜索类型
    keyword: "", //搜索关键字
  };

  componentDidMount() {
    this.getProductsList();
  }

  //获取商品分页列表的回调(后端分页)
  getProductsList = async (pageNum = 1) => {
    let result;
    const { searchType, keyword } = this.state;
    if (this.isSearch)
      result = await reqSearchProductList(
        pageNum,
        PAGE_SIZE,
        searchType,
        keyword
      );
    else result = await reqProductsList(pageNum, PAGE_SIZE);

    const { status, data, msg } = result;

    if (status === 0) {
      this.setState({
        productList: data.list,
        total: data.total,
        current: data.pageNum,
      });
    } else message.error(msg);
  };

  //处理分页的回调
  handlePageChange = (pageNum) => {
    this.getProductsList(pageNum);
  };

  //商品状态更新的回调
  updateProductStatus = async (id, productStatus) => {
    let productList = [...this.state.productList];
    productStatus = productStatus === 1 ? 2 : 1;
    let result = await reqUpdateProductStatus(id, productStatus);
    const { status, msg } = result;
    if (status === 0) {
      message.success("商品状态更新成功");
      productList = productList.map((item) => {
        if (item._id === id) {
          item.status = productStatus;
        }
        return item;
      });
      this.setState({ productList });
    } else {
      message.error(msg);
    }
  };

  //处理搜索商品的回调
  search = async () => {
    this.isSearch = true;
    this.getProductsList();
  };

  render() {
    const columns = [
      {
        title: "商品名称",
        dataIndex: "name",
        key: "name",
        width: "15%",
      },
      {
        title: "商品描述",
        dataIndex: "desc",
        key: "decsription",
      },
      {
        title: "价格",
        dataIndex: "price",
        key: "price",
        align: "center",
        width: "10%",
        render: (price) => "¥" + price,
      },
      {
        title: "状态",
        // dataIndex: "status",
        key: "status",
        align: "center",
        width: "10%",
        render: (item) => {
          const { _id: id, status } = item;
          return (
            <div>
              <Button
                type={status === 1 ? "danger" : "primary"}
                onClick={() => this.updateProductStatus(id, status)}
              >
                {status === 1 ? "下架" : "上架"}
              </Button>
              <br />
              <span>{status === 1 ? "在售" : "已停售"}</span>
            </div>
          );
        },
      },
      {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        align: "center",
        width: "10%",
        render: () => {
          return (
            <div>
              <Button
                type="link"
                onClick={() =>
                  this.props.history.push("/admin/goods/products/detail")
                }
              >
                详情
              </Button>
              <Button
                type="link"
                onClick={() =>
                  this.props.history.push("/admin/goods/products/addupdate")
                }
              >
                修改
              </Button>
            </div>
          );
        },
      },
    ];
    const dataSource = this.state.productList;

    return (
      <Card
        title={
          <div>
            <Select
              defaultValue="productName"
              style={{ width: "12%" }}
              onChange={(value) => this.setState({ searchType: value })}
            >
              <Option value="productName">按名称搜索</Option>
              <Option value="productDesc">按描述搜索</Option>
            </Select>
            <Input
              placeholder="关键字"
              style={{ width: "15%", margin: "0 5px" }}
              allowClear
              onChange={(event) =>
                this.setState({ keyword: event.target.value })
              }
            />
            <Button type="primary" onClick={this.search}>
              <SearchOutlined />
              搜索
            </Button>
          </div>
        }
        extra={
          <Button
            type="primary"
            onClick={() =>
              this.props.history.push("/admin/goods/products/addupdate")
            }
          >
            <PlusCircleOutlined />
            添加商品
          </Button>
        }
      >
        <Table
          rowKey={"_id"}
          dataSource={dataSource}
          columns={columns}
          bordered
          pagination={{
            showQuickJumper: true,
            onChange: this.handlePageChange,
            total: this.state.total,
            pageSize: PAGE_SIZE,
            current: this.state.current,
          }}
        />
      </Card>
    );
  }
}
