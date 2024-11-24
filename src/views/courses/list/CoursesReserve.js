import { Fragment, useEffect, useState } from "react";

import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  Archive,
  ChevronDown,
  FileText,
  MoreVertical,
  Trash2,
} from "react-feather";

import {
  Row,
  Col,
  Card,
  Input,
  Button,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";

import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { Link, useParams } from "react-router-dom";
import { getApi } from "../../../core/api/api";

const CoursesReserve = () => {
  const [data, setData] = useState([]);
  const params = useParams();
  console.log(params);

  const GetCouresesReserve = async () => {
    const path = `/CourseReserve/c2cb3746-2f31-ef11-b6c9-9b4d470c6650`;
    const response = await getApi({ path });
    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    GetCouresesReserve();
  }, []);
  const datas = [
    { name: "a", lastname: "b" },
    { name: "a", lastname: "b" },
    { name: "a", lastname: "b" },
  ];

  const CustomPagination = () => {
    const count = 10;

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-center my-2 pe-1"
        }
      />
    );
  };

  const statusObj = {
    pending: "light-warning",
    active: "light-success",
    inactive: "light-secondary",
  };

  const columns = [
    {
      name: "نام دوره",
      sortable: true,
      minWidth: "200px",
      sortField: "fullName",
      selector: (row) => row.courseName,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {/* <Avatar className='me-1' img={row.avatar} width='32' height='32' /> */}
          {row.courseName}

          <div className="d-flex flex-column">
            <Link
              to={`/apps/user/view/${row.id}`}
              className="user_name text-truncate text-body"
              onClick={() => store.dispatch(getUser(row.id))}
            ></Link>

            <small className="text-truncate text-muted mb-0">{row.email}</small>
          </div>
        </div>
      ),
    },

    {
      name: "نام دانشجو",
      sortable: true,
      minWidth: "200px",
      sortField: "fullName",
      selector: (row) => row.studentName,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {row.studentName}
          <div className="d-flex flex-column">
            <span className="fw-bolder">{row.studentName}</span>
          </div>
        </div>
      ),
    },

    {
      name: "تاریخ رزرو",
      sortable: true,
      minWidth: "200px",
      sortField: "fullName",
      selector: (row) => row.reserverDate,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {row.reserverDate}
          <div className="d-flex flex-column">
            <Link
              to={`/apps/user/view/${row.id}`}
              className="user_name text-truncate text-body"
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <span className="fw-bolder">{row.lastnamelastname}</span>
            </Link>
            <small className="text-truncate text-muted mb-0">{row.email}</small>
          </div>
        </div>
      ),
    },

    {
      name: "وضعیت",
      minWidth: "138px",
      sortable: true,
      sortField: "status",
      selector: (row) => row.accept,
      cell: (row) => (
        <Badge className="text-capitalize" color="danger" pill>
          {row.accept ? <span>تائید شده</span> : <span>تائیدنشده</span>}
        </Badge>

        // color={statusObj[row.status]} pill
        // color='success' pill
        // color='danger' pill
        // color='secondary' pill
      ),
    },

    {
      name: "اقدام",
      minWidth: "100px",
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                tag={Link}
                className="w-100"
                to={`/apps/user/view/${row.id}`}
                onClick={() => store.dispatch(getUser(row.id))}
              >
                <FileText size={14} className="me-50" />
                <span className="align-middle">جزئیات</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => e.preventDefault()}
              >
                <Archive size={14} className="me-50" />
                <span className="align-middle">تائید</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  store.dispatch(deleteUser(row.id));
                }}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">حذف</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={data}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default CoursesReserve;