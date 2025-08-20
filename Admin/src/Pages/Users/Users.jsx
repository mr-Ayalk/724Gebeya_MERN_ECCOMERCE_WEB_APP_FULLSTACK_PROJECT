
import {  useState } from "react";

import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import SearchBox from "../../Components/SearchBox/SearchBox";

import { MdLocalPhone, MdOutlineMarkEmailRead } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
const columns = [

  { id: "userImg", label: "USER IMAGE", minWidth: 150 },
  { id: "userName", label: "USER NAME", minWidth: 100 },
  {
    id: "userEmail",
    label: "USER EMAIL",
    minWidth: 150,
  },

  {
    id: "userPhone",
    label: "USER PHONE NO",
    minWidth: 130,
  },
  {
    id: "createdDate",
    label: "CREATED",
    minWidth: 130,
  },
];

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
     

      <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center w-full px-5 justify-between my-2 ">
          <div className="flex items-center justify-between px-2 py-0 mt-3">
            <h2 className="text-[18px] font-[600]">
              Users List
              <span className="font-[400] text-[14px]">
                (Material Ui Table)
              </span>
            </h2>
          </div>

          <div className="col w-[20%] ml-auto">
            <SearchBox />
          </div>
        </div>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[70px]">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to={"/product/4545"}>
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww"
                          className="w-full group-hover:scale-105 transition-all"
                          alt=""
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Ayalk T.
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }} className="">
                  <span className="flex items-center gap-2">
                    <MdOutlineMarkEmailRead /> ayalk@gmail.com
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <MdLocalPhone /> +251922334455
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }} className="">
                  <span className="flex items-center gap-2">
                    <SlCalender /> 07-08-2023
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={10}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

    </>
  );
};

export default Users;
