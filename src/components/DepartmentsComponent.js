import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

function RenderDepartment({ departments }) {
  return (
    <Link to={`/phongban/${departments.id}`}>
      <Card>
        <CardBody>
          <CardTitle>Phòng ban: {departments.name}</CardTitle>
          <CardText>Số lượng nhân viên: {departments.numberOfStaff}</CardText>
        </CardBody>
      </Card>
    </Link>
  );
}

const Department = function (props) {
  console.log(props);
  const result = props.departments;
  console.log(result);
  const department = props.departments.map((department) => {
    return (
      <div key={department.id} className="col-12 col-md-5 col-lg-3 m-1">
        <RenderDepartment departments={department} />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">{department}</div>
    </div>
  );
};

export default Department;
