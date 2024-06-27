import * as React from "react";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import { KTSVG } from '../../../_metronic/helpers'
import TablePagination from "@mui/material/TablePagination";
import { KTIcon } from "../../../../../../_metronic/helpers";

function createData(
  employee: any,
  team: any,
  call: any,
  date: any,
  children: any = []
) {
  return {
    employee,
    team,
    call,
    date,
    children: [
      {
        employee1: "Dilan McNiven",
        Team1: "Team B",
        call1: "485-485-4687",
        date1: "12/3/2020",
      },
      {
        employee1: "Dilan McNiven",
        Team1: "Team B",
        call1: "485-485-4687",
        date1: "12/3/2020",
      },
      {
        employee1: "Dilan McNiven",
        Team1: "Team B",
        call1: "485-485-4687",
        date1: "12/3/2020",
      },
      {
        employee1: "Dilan McNiven",
        Team1: "Team B",
        call1: "485-485-4687",
        date1: "12/3/2020",
      },
    ],
  };
}
function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          className="text-dark fw-bolder fs-6"
          component="th"
          scope="row"
        >
          {row.employee}{" "}
        </TableCell>
        <TableCell className="text-dark fw-bolder fs-6">{row.team}</TableCell>
        <TableCell className="text-dark fw-bolder fs-6">{row.call}</TableCell>
        <TableCell className="text-dark fw-bolder fs-6">{row.date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell className="fw-bolder text-muted fs-6">
                      Employee
                    </TableCell>
                    <TableCell className="fw-bolder text-muted fs-6">
                      Team
                    </TableCell>
                    <TableCell className="fw-bolder text-muted fs-6">
                      Call
                    </TableCell>
                    <TableCell className="fw-bolder text-muted fs-6">
                      Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.children.map((historyRow: any) => (
                    <TableRow
                      key={historyRow.employee1}
                      sx={{ borderBottom: 0 }}
                    >
                      <TableCell
                        className="text-dark fw-bolder fs-6"
                        component="th"
                        scope="row"
                      >
                        {historyRow.employee1}
                      </TableCell>
                      <TableCell className="text-dark fw-bolder fs-6">
                        {historyRow.Team1}
                      </TableCell>
                      <TableCell className="text-dark fw-bolder fs-6">
                        {historyRow.call1}
                      </TableCell>
                      <TableCell className="text-dark fw-bolder fs-6">
                        {historyRow.date1}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData("Paten Brasner", "Team A", "450-197-0111", "7/7/2022"),
  createData("Ginger De Blasio", "Team A", "753-716-2287", "12/31/2021"),
  createData("Araldo Bedinham", "Team B", "636-740-1597", "5/30/2021"),
  createData("Sherwood Brash", "Team C", "414-231-1312", "7/30/2022"),
  createData("Monro Livesey", "Team A", "946-667-0630", "2/10/2022"),
  createData("Raphaela Skeemor", "Team A", "871-937-8421", "9/4/2020"),
  createData("Dewie Vardie", "Team A", "975-434-3011", "8/2/2021"),
  createData("Madelle Hallihane", "Team B", "832-110-3876", "7/7/2020"),
  createData("Yanaton Rosekilly", "Team C", "320-896-4808", "5/7/2020"),
  createData("Doloritas Burtonwood", "Team A", "611-106-7993", "1/11/2022"),
  createData("Daffie Buckmaster", "Team C", "463-974-0012", "7/12/2020"),
  createData("Dori Lear", "Team B", "536-430-6075", "2/14/2021"),
  createData("Anton Pourvoieur", "Team A", "998-748-5773", "12/11/2020"),
  createData("Padraig O'Crevy", "Team A", "640-922-9102", "12/26/2021"),
  createData("Emmalyn Grierson", "Team B", "799-988-4041", "7/7/2020"),
  createData("Melamie Shakesby", "Team B", "448-521-3447", "6/11/2020"),
  createData("Petronia Hardwick", "Team C", "193-985-5572", "6/29/2021"),
  createData("Rici Kenwrick", "Team B", "947-545-0941", "12/8/2020"),
  createData("Nat Diggens", "Team C", "507-945-1057", "6/22/2021"),
  createData("Dilan McNiven", "Team B", "485-485-4687", "12/3/2020"),
];

const ColspanTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper>
        <div className="d-flex justify-content-between pt-5 px-5">
          <Typography variant="h5" className="text-dark fw-bolder">
            Employee Details
          </Typography>
          <button
            type="button"
            className="btn float-end btn-light me-3 mb-4"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
          >
            {/* <KTSVG path='/media/icons/duotune/general/gen031.svg' className='svg-icon-2' /> */}
            Filter
          </button>
          <div className="card-title">
            {/* begin::Search */}
            <div className="d-flex align-items-center position-relative my-1">
              <KTIcon
                iconName="magnifier"
                className="fs-1 position-absolute ms-6"
              />
              <input
                type="text"
                data-kt-user-table-filter="search"
                className="form-control form-control-solid w-250px ps-14"
                placeholder="Search user"
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* end::Search */}
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell className="fs-6 text-muted fw-bolder">
                  Employee
                </TableCell>
                <TableCell className="fs-6 text-muted fw-bolder">
                  Team
                </TableCell>
                <TableCell className="fs-6 text-muted fw-bolder">
                  Call
                </TableCell>
                <TableCell className="fs-6 text-muted fw-bolder">
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <Row key={row.employee} row={row} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default ColspanTable;
