import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, MenuItem, Select, TextField } from "@material-ui/core";
import { Paper, TableContainer, Table, TableHead, TableRow, TableBody, TablePagination, TableCell } from "@mui/material";
import PasswordIcon from '@mui/icons-material/Password';
import { useState } from "react";
import "./adminCompanies.css";
import * as React from 'react';
import store from "../../redux/store";
import { useHistory } from "react-router";
import Company from "../../model/Company";
import LoginDetails from "../../model/LoginDetails";
import { useForm } from "react-hook-form";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AppsIcon from '@mui/icons-material/Apps';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCompanyAxios, getAllCompaniesAxios } from "../../axios/AdminAxiosService";
import { loginAxios } from "../../axios/GeneralAxiosService";
import UpdateCompany from "../updateCompany/updateCompany";
import ViewCouponsSmall from "../../coupons/viewCouponsSmall/viewCouponsSmall";
import { couponsForViewAction } from "../../redux/couponsState";

interface Column {
  id: 'id' | 'name' | 'email' | 'password' | 'coupons' | 'update' | 'deleteIt';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}


function AdminCompanies(): JSX.Element {

  const [companies, setData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [passss, setPass] = useState("*******");
  const [CompanyInRow, setCompanyInRow] = useState<Company>(new Company());
  const [openPasswordBox, setOpenPasswordBox] = React.useState(false);
  const [isAllow, setAllowedPassword] = React.useState(false);
  const { register, handleSubmit, setError, formState: { errors }, setValue } = useForm<LoginDetails>();
  setValue("clientType", "Administrator")
  const [openUpdateBox, setOpenUpdateBox] = React.useState(false);
  const { register: registerComp, handleSubmit: handleSubmitComp, setError: setErrorComp, formState: { errors: errorsComp }, setValue: setValueComp } = useForm<Company>();
  const [openCouponsBox, setOpenCouponsBox] = React.useState(false);
  const [openDeleteBox, setOpenDeleteBox] = React.useState(false);
  const [searchType, setType] = useState("");
  let history = useHistory();

  React.useEffect(() => {
    if (store.getState().authState.userDetails.clientType != "Administrator") { history.push("/private/screen") }
    syncSetData();
  }, []);

  function addCompany() {
    history.push("/private/screen/admin/company/add");
  }

  async function syncSetData() {
    await getAllCompaniesAxios();
    setData(store.getState().AdminState.companies);
  }


  function searchTypeSet(args: any) {
    setType(args.target.value);
    console.log(searchType);
  }

  function searchBy() {
    switch (searchType) {
      case "All":
        return <div></div>
      case "Id":
        return <div>
          <TextField type="number" label="id" variant="outlined" {...registerComp("id", {
            required: { value: true, message: "this field is required" },
          })} />
          <br />
          <span className="errors"> {errorsComp.id && <p>{errorsComp.id.message}</p>}</span>

        </div>
      case "Name":
        return <div>
          <TextField label="name" variant="outlined" {...registerComp("name", {
            required: { value: true, message: "this field is required" },
          })} />
          <br />
          <span className="errors"> {errorsComp.name && <p>{errorsComp.name.message}</p>}</span>

        </div>
    }
  }

  function search(company: Company) {
    switch (searchType) {
      case "All":
        setData(store.getState().AdminState.companies);
        break;
      case "Id":
        let companiesArray: Company[] = [];
        const myCompany = store.getState().AdminState.companies.find(company1 => company1.id == company.id)
        if (myCompany) { companiesArray.push(myCompany) };
        setData(companiesArray);
        break;
      case "Name":
        let companiesNameArray: Company[] = [];
        const myCompanyName = store.getState().AdminState.companies.filter(company1 => company1.name.includes(company.name));
        if (myCompanyName) { myCompanyName.map((companyyy) => companiesNameArray.push(companyyy)); }
        setData(companiesNameArray);
        break;
    }
  }


  function showPassword() {
    let show = <div>password: *******</div>;
    if (isAllow) { show = <div>password: {passss}</div> }
    return show
  }

  async function chekAdminDetails(loginDetails: LoginDetails) {
    await loginAxios(loginDetails);
    if (!store.getState().ErrorsState.wrongDetails) {
      setAllowedPassword(true)
    }
  }

  async function deleteCompany() {
    await deleteCompanyAxios(CompanyInRow.id.toString());

  }

  const handleOpenPasswordBox = (event: string) => {
    setOpenPasswordBox(!openPasswordBox);
    setPass(event);
  };

  const handleClosePasswordBox = () => {
    setOpenPasswordBox(!openPasswordBox);
    setAllowedPassword(false)
  };

  const handleOpenUpdateBox = (company: Company) => {
    setOpenUpdateBox(!openUpdateBox);
    setCompanyInRow(company);
    //    setPass(password);
  };

  const handleCloseUpdateBox = () => {
    setOpenUpdateBox(!openUpdateBox);
  };

  const handleOpenDeleteBox = (company: Company) => {
    setOpenDeleteBox(!openDeleteBox);
    setCompanyInRow(company);
  };

  const handleCloseDeleteBox = () => {
    setOpenDeleteBox(!openDeleteBox);
  };

  async function handleOpenCouponsBox(company: Company) {
    store.dispatch(couponsForViewAction(company.coupons));
    setOpenCouponsBox(!openCouponsBox);

  };

  const handleCloseCouponsBox = () => {
    setOpenCouponsBox(!openCouponsBox);
  };



  const columns: readonly Column[] = [
    { id: 'id', label: 'Id', minWidth: 20, align: "right" },
    { id: 'name', label: 'Name', minWidth: 80, align: "right", format: (value: { toLocaleString: (arg0: string) => any; }) => value.toLocaleString('en-US') },
    { id: 'email', label: 'Email', minWidth: 100, align: "right", format: (value: { toLocaleString: (arg0: string) => any; }) => value.toLocaleString('en-US') },
    { id: 'password', label: 'Password', minWidth: 30, align: "right", format: (value: { toLocaleString: (arg0: string) => any; }) => value.toLocaleString('en-US') },
    { id: 'coupons', label: 'Coupons', minWidth: 10, align: "right", format: (value: { toLocaleString: (arg0: string) => any; }) => value.toLocaleString('en-US') },
    { id: 'update', label: 'Edit', minWidth: 10, align: "right", format: (value: { toLocaleString: (arg0: string) => any; }) => value.toLocaleString('en-US') },
    { id: 'deleteIt', label: 'Delete', minWidth: 10, align: "right", format: (value: { toLocaleString: (arg0: string) => any; }) => value.toLocaleString('en-US') },
  ];

  function createData(company1: Company) {
    const id = company1.id;
    const name = company1.name;
    const email = company1.email;
    const password = <div>
      <Button value={company1.password} startIcon={<PasswordIcon />} onClick={() => {
        handleOpenPasswordBox(company1.password);
      }}> </Button>
      <Dialog
        open={openPasswordBox}
        onClose={handleClosePasswordBox}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"View Password"}           <span className="close">
          <Button  onClick={handleClosePasswordBox} autoFocus>X</Button>
          </span>

        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            For double chek, enter your admin's email and password
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <form onSubmit={handleSubmit(chekAdminDetails)}  >
            <TextField label="email" variant="outlined"
              {...register("email", {
                required: { value: true, message: "field is required" }
              })} />
            <span className="errors" > {errors.email && <p>{errors.email.message}</p>}</span>
            <br /><br />
            <TextField label="password" variant="outlined" type="password"
              {...register("password", { required: true })} />
            <br /><br />
            <ButtonGroup variant="contained" >
              <Button type="submit" color="primary" > SEND & SHOW </Button>
            </ButtonGroup>
            <br /><br />
            {showPassword()}
          </form>
          
        </DialogActions>

      </Dialog>
    </div>;


    const update = <div>
      <Button startIcon={<ModeEditIcon />} onClick={() => {
        handleOpenUpdateBox(company1);
      }}> </Button>
      <Dialog
        open={openUpdateBox}
        onClose={handleCloseUpdateBox}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Update Company"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ***************************************
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <UpdateCompany id={CompanyInRow.id} />

          <Button onClick={handleCloseUpdateBox} autoFocus>X</Button>
        </DialogActions>
      </Dialog>
    </div>;
    <div> <input type="button" value="update" />  </div>;

    const deleteIt = <div>
      <Button startIcon={<DeleteIcon />} onClick={() => { handleOpenDeleteBox(company1); }}> </Button>

      <Dialog
        open={openDeleteBox}
        onClose={handleCloseDeleteBox}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete this Company?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting a company is not returnable, after you will delete the
            company it will be lost forever.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteBox}>NO, STOP!</Button>
          <Button onClick={deleteCompany} autoFocus>
            CONTINUE
          </Button>
        </DialogActions>
      </Dialog>
    </div>

    const coupons = <div>
      <Button startIcon={<AppsIcon />} onClick={() => { handleOpenCouponsBox(company1) }}> </Button>
      <Dialog
        open={openCouponsBox}
        onClose={handleCloseCouponsBox}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"View Coupons"}
          <Button className="close" onClick={handleCloseCouponsBox} autoFocus>X</Button>
        </DialogTitle>
        <DialogActions>
          <ViewCouponsSmall />
        </DialogActions>
      </Dialog>
    </div>;

    return { id, name, email, password, coupons, update, deleteIt };
  }


  const rows: { id: number; name: string; email: string; password: JSX.Element; coupons: JSX.Element; update: JSX.Element; deleteIt: JSX.Element; }[] = [];
  companies.map((company) => rows.push(createData(company)));

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <ButtonGroup variant="contained" fullWidth>
        <Button type="button" color="primary" onClick={addCompany}>Add New Company</Button>
      </ButtonGroup>
      <br /><br />

      <Select style={{ width: 250 }} defaultValue="All" onChange={searchTypeSet}  >
        <MenuItem value={"All"}>All</MenuItem>
        <MenuItem value={"Id"}>Id</MenuItem>
        <MenuItem value={"Name"}>Name</MenuItem>
      </Select>

      {searchBy()}

      <form onSubmit={handleSubmitComp(search)}>


        <ButtonGroup variant="contained" fullWidth>
          <Button type="submit" color="primary" >Search</Button>
        </ButtonGroup>
      </form>

      <br /><br />

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
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
    </div>
  );
}

export default AdminCompanies;
