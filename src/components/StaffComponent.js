import React from "react";
import {
  Card,
  CardText,
  CardBody,
  CardImg,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Form,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Col,
  Row,
} from "reactstrap";
import { FadeTransform } from "react-animation-components";
import { Link } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !Number.isNaN(Number(val));
const numRange = (val) => val > 0;

// Hàm render toàn bộ staff
function RenderStaff({ staff, isLoading, errMess, deleteStaff }) {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  } else {
    return (
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)",
        }}
      >
        <Card className="mb-3">
          <Link to={`/nhanvien/${staff.id}`}>
            <CardBody>
              <CardImg src={staff.image}></CardImg>
              <CardText className="text-center"> {staff.name}</CardText>
            </CardBody>
          </Link>
          <Button
            className="w-50 h-25 "
            color="danger"
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              if (confirm("Bạn có muốn xoá nhân viên này")) {
                deleteStaff(staff.id);
              }
            }}
          >
            Xoá
          </Button>
        </Card>
      </FadeTransform>
    );
  }
}

class Staffs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameF: "",
      isModalOpen: false,
    };
    // gọi hàm để nhận event
    // this.findStaff = this.findStaff.bind(this);
    this.onChangeFindStaff = this.onChangeFindStaff.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // Hàm tìm kiếm nhân viên
  // findStaff(event) {
  //   console.log(event.target.nameS);
  //   const nameS = event.target.nameS;
  //   this.setState({ nameF: nameS });
  //   event.preventDefault();
  // }
  onChangeFindStaff(e) {
    this.setState({ nameF: e.target.value });
  }
  // Modal open function
  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  // Hàm xử lý khi nhấn button 'thêm'
  handleSubmit(values) {
    this.toggleModal();
    // Lấy thông tin nhân viên vừa nhập
    this.props.addNewStaff(
      values.name,
      values.doB,
      values.startDate,
      values.departmentId,
      values.salaryScale,
      values.annualLeave,
      values.overTime
    );
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.errMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{this.props.errMess}</h4>
          </div>
        </div>
      );
    } else if (this.props.staffs != null) {
      const staffList = this.props.staffs
        .filter((val) => {
          // Nếu người dùng ko nhập ký tự gì thì trả về toàn bộ mảng
          if (this.state.nameF === "") {
            return val;
          }
          // Nếu tên nhân viên chứa ký tự trong input tìm kiếm (chuyển tất cả tên về dạng chữ thường)
          else if (
            val.name.toLowerCase().includes(this.state.nameF.toLowerCase())
          )
            return val;
        })
        .map((staff) => {
          return (
            <div key={staff.id} className="col-lg-2 col-md-3 col-sm-6">
              <RenderStaff
                staff={staff}
                staffsLoading={this.props.staffsLoading}
                errMess={this.props.errMess}
                deleteStaff={this.props.deleteStaff}
              />
            </div>
          );
        });
      return (
        <div className="container">
          <div className="row mt-1 justify-content-between ">
            <Breadcrumb className="ml-3">
              <BreadcrumbItem>
                <Link to="/nhanvien">Nhân viên</Link>
              </BreadcrumbItem>
            </Breadcrumb>
            <div className="row ml-2 mr-2">
              <div className="col-2">
                <Button className="ml-auto mt-1" onClick={this.toggleModal}>
                  <span className="fa fa-plus fa-lg"></span>
                </Button>
              </div>
              <div className="col-10 mt-1 ">
                <Form className="form-group row">
                  <div className="col-10">
                    <Input
                      type="text"
                      // id="nameS"
                      // name="nameS"
                      placeholder="Tìm kiến tên nhân viên"
                      onChange={this.onChangeFindStaff}
                    />
                  </div>
                  {/* <div className="col-4 ">
                    <Button color="primary" type="submit" className="search">
                      Tìm kiếm
                    </Button>
                  </div> */}
                </Form>
              </div>
            </div>
          </div>
          <div className="row ml-1">
            <p>
              <em>Bấm vào nhân viên để xem thông tin chi tiết</em>
            </p>
          </div>
          <div className="row">{staffList}</div>
          {/* Modal Controlled Form */}
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
            <ModalBody>
              {/* Controlled Form -Modal*/}
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                  <Label htmlFor="name" md={4}>
                    Tên nhân viên
                  </Label>
                  <Col md={8}>
                    <Control.text
                      model=".name"
                      id="name"
                      name="name"
                      placeholder="Nhập tên nhân viên"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(30),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".name"
                      show="touched"
                      messages={{
                        required: "",
                        minLength: "Nhập nhiều hơn 3 ký tự",
                        maxLength: "Nhập ít hơn 30 ký tự",
                      }}
                    ></Errors>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="doB" md={4}>
                    Ngày sinh
                  </Label>
                  <Col md={8}>
                    <Control
                      type="date"
                      model=".doB"
                      id="doB"
                      name="doB"
                      className="form-control"
                      validators={{
                        required,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".doB"
                      show="touched"
                      messages={{
                        required: "Yêu cầu nhập",
                      }}
                    ></Errors>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="startDate" md={4}>
                    Ngày vào công ty
                  </Label>
                  <Col md={8}>
                    <Control
                      type="date"
                      model=".startDate"
                      id="startDate"
                      name="startDate"
                      className="form-control"
                      validators={{
                        required,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".startDate"
                      show="touched"
                      messages={{
                        required: "Yêu cầu nhập",
                      }}
                    ></Errors>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="departmentId" md={4}>
                    Phòng ban
                  </Label>
                  <Col md={8}>
                    <Control.select
                      model=".departmentId"
                      id="departmentId"
                      name="departmentId"
                      defaultValue="Dept01"
                      className="form-control"
                    >
                      <option value="Dept01">Sale</option>
                      <option value="Dept02">HR</option>
                      <option value="Dept03">Marketing</option>
                      <option value="Dept04">IT</option>
                      <option value="Dept05">Finance</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="salaryScale" md={4}>
                    Hệ số lương
                  </Label>
                  <Col md={8}>
                    <Control.text
                      model=".salaryScale"
                      id="salaryScale"
                      name="salaryScale"
                      className="form-control"
                      validators={{
                        isNumber,
                        numRange,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".salaryScale"
                      show="touched"
                      messages={{
                        isNumber: "Vui lòng nhập số. ",
                        numRange: "Nhập số lớn hơn hoặc bằng 1",
                      }}
                    ></Errors>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="annualLeave" md={4}>
                    Số ngày nghỉ còn lại
                  </Label>
                  <Col md={8}>
                    <Control
                      type="text"
                      model=".annualLeave"
                      id="annualLeave"
                      name="annualLeave"
                      className="form-control"
                      validators={{
                        required,
                        isNumber,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".annualLeave"
                      show="touched"
                      messages={{
                        required: "",
                        isNumber: "Vui lòng nhập số",
                      }}
                    ></Errors>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="overTime" md={4}>
                    Số ngày làm thêm
                  </Label>
                  <Col md={8}>
                    <Control
                      type="text"
                      model=".overTime"
                      id="overTime"
                      name="overTime"
                      className="form-control"
                      validators={{
                        required,
                        isNumber,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".overTime"
                      show="touched"
                      messages={{
                        required: "",
                        isNumber: "Vui lòng nhập số",
                      }}
                    ></Errors>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Button type="submit" color="primary" className="offset-10">
                    Thêm
                  </Button>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      );
    }
  }
}
export default Staffs;
