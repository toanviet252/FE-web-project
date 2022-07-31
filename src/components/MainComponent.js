import React, { Component } from "react";
import Staffs from "./StaffComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import StaffDetail from "./StaffDetail";
import Department from "./DepartmentsComponent";
import DepartDetail from "./DepartDetail";
import { Switch, Route, withRouter } from "react-router-dom";
import SalaryTable from "./SalaryComponent";
import { connect } from "react-redux";

import {
  fetchStaffs,
  fetchDepartments,
  fetchSalarys,
  addNewStaff,
} from "../redux/ActionCreator";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    salaryStaffs: state.salaryStaffs,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },
  fetchSalarys: () => {
    dispatch(fetchSalarys());
  },
  addNewStaff: (
    name,
    doB,
    startDate,
    departmentId,
    salaryScale,
    annualLeave,
    overTime
  ) => {
    dispatch(
      addNewStaff(
        name,
        doB,
        startDate,
        departmentId,
        salaryScale,
        annualLeave,
        overTime
      )
    );
  },
});

// Presentation Component
class Main extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchSalarys();
  }

  render() {
    const StaffId = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.props.staffs.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffID, 10)
            )[0]
          }
          staffLoading={this.props.staffs.isLoading}
          errMess={this.props.staffs.errMess}
          departments={this.props.departments.departments}
          departErrMess={this.props.departments.errMess}
        />
      );
    };
    const DepartId = ({ match }) => {
      console.log(match.params.departId);
      const result = this.props.staffs.staffs.filter(
        (x) => x.departmentId == match.params.departId
      );
      return (
        <DepartDetail
          staffOfDepart={result}
          departments={this.props.departments.departments}
          departErrMess={this.props.departments.errMess}
        />
      );
    };
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/nhanvien"
            component={() => (
              <Staffs
                staffs={this.props.staffs.staffs}
                staffsLoading={this.props.staffs.isLoading}
                errMess={this.props.staffs.errMess}
                addNewStaff={this.props.addNewStaff}
              />
            )}
          />
          <Route path="/nhanvien/:staffID" component={StaffId} />
          <Route
            exact
            path="/phongban"
            component={() => (
              <Department
                departments={this.props.departments.departments}
                departErrMess={this.props.departments.errMess}
              />
            )}
          />
          <Route exact path="/phongban/:departId" component={DepartId} />
          <Route
            path="/bangluong"
            component={() => (
              <SalaryTable salaryStaffs={this.props.salaryStaffs.salarys} />
            )}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
