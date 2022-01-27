import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, MenuItem, Select, TextField } from "@material-ui/core";
import { Paper, TableContainer, Table, TableHead, TableRow, TableBody, TablePagination, TableCell } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { deleteCustomerAxios, getAllCustomersAxios } from "../../axios/AdminAxiosService";
import ViewCouponsSmall from "../../coupons/viewCouponsSmall/viewCouponsSmall";
import Customer from "../../model/Customer";
import LoginDetails from "../../model/LoginDetails";
import { couponsForViewAction } from "../../redux/couponsState";
import store from "../../redux/store";
import "./adminCustomers.css";
import PasswordIcon from '@mui/icons-material/Password';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AppsIcon from '@mui/icons-material/Apps';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateCustomer from "../updateCustomer/updateCustomer";
import addCompany from "../addCompany/addCompany";
import { loginAxios } from "../../axios/GeneralAxiosService";


interface Column {
    id: 'id' | 'firstName' | 'lastName' | 'email' | 'password' | 'coupons' | 'update' | 'deleteIt';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

function AdminCustomers(): JSX.Element {

    const [customers, setData] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [passss, setPass] = useState("***");
    const [CustomerInRow, setCustomerInRow] = useState<Customer>(new Customer());
    const [openPasswordBox, setOpenPasswordBox] = React.useState(false);
    const [isAllow, setAllowedPassword] = React.useState(false);
    const { register, handleSubmit, setError, formState: { errors }, setValue } = useForm<LoginDetails>();
    setValue("clientType", "Administrator")
    const [openUpdateBox, setOpenUpdateBox] = React.useState(false);
    const { register: registerCust, handleSubmit: handleSubmitCust, setError: setErrorCust, formState: { errors: errorsCust }, setValue: setValueCust } = useForm<Customer>();
    const [openCouponsBox, setOpenCouponsBox] = React.useState(false);
    const [openDeleteBox, setOpenDeleteBox] = React.useState(false);
    const [searchType, setType] = useState("");
    let history = useHistory();

    React.useEffect(() => {
        if (store.getState().authState.userDetails.clientType != "Administrator") { history.push("/private/screen") }
        syncSetData();
    }, []);

    function addCustomer() {
        history.push("/private/screen/admin/customer/add");
    }

    async function syncSetData() {
        await getAllCustomersAxios();
        setData(store.getState().AdminState.customers);
    }

    function searchTypeSet(args: any) {
        setType(args.target.value);
    }

    function searchBy() {
        switch (searchType) {
            case "All":
                return <div></div>
            case "Id":
                return <div>
                    <TextField type="number" label="id" variant="outlined" {...registerCust("id", {
                        required: { value: true, message: "this field is required" },
                    })} />
                    <br />
                    <span className="errors"> {errorsCust.id && <p>{errorsCust.id.message}</p>}</span>
                </div>

            case "FirstName":
                return <div>
                    <TextField label="firstName" variant="outlined" {...registerCust("firstName", {
                        required: { value: true, message: "this field is required" },
                    })} />
                    <br />
                    <span className="errors"> {errorsCust.firstName && <p>{errorsCust.firstName.message}</p>}</span>
                </div>

            case "LastName":
                return <div>
                    <TextField label="lastName" variant="outlined" {...registerCust("lastName", {
                        required: { value: true, message: "this field is required" },
                    })} />
                    <br />
                    <span className="errors"> {errorsCust.lastName && <p>{errorsCust.lastName.message}</p>}</span>

                </div>


        }
    }

    function search(customer: Customer) {
        switch (searchType) {
            case "All":
                setData(store.getState().AdminState.customers);
                break;
            case "Id":
                let customersArray: Customer[] = [];
                const myCustomer = store.getState().AdminState.customers.find(customer1 => customer1.id == customer.id)
                if (myCustomer) { customersArray.push(myCustomer) };
                setData(customersArray);
                break;
            case "FirstName":
                let customersFirstNameArray: Customer[] = [];
                const mycustomerFirstName = store.getState().AdminState.customers.filter(customer1 => customer1.firstName.includes(customer.firstName));
                if (mycustomerFirstName) { mycustomerFirstName.map((customerItem) => customersFirstNameArray.push(customerItem)); }
                setData(customersFirstNameArray);
                break;
            case "LastName":
                let customersLastNameArray: Customer[] = [];
                const mycustomerLastName = store.getState().AdminState.customers.filter(customer1 => customer1.lastName.includes(customer.lastName));
                if (mycustomerLastName) { mycustomerLastName.map((customerItem) => customersLastNameArray.push(customerItem)); }
                setData(customersLastNameArray);
                break;
        }
    }

    function showPassword() {
        let show = <div>***</div>;
        if (isAllow) { show = <div>{passss}</div> }
        return show
    }

    async function chekAdminDetails(loginDetails: LoginDetails) {
        await loginAxios(loginDetails);
        if (!store.getState().ErrorsState.wrongDetails) {
            setAllowedPassword(true)
        }
    }

    async function deleteCustomer() {
        await deleteCustomerAxios(CustomerInRow.id.toString());
    }

    const handleOpenPasswordBox = (event: string) => {
        setOpenPasswordBox(!openPasswordBox);
        setPass(event);
    };

    const handleClosePasswordBox = () => {
        setOpenPasswordBox(!openPasswordBox);
        setAllowedPassword(false)
    };

    const handleOpenUpdateBox = (customer: Customer) => {
        setOpenUpdateBox(!openUpdateBox);
        setCustomerInRow(customer);
    };

    const handleCloseUpdateBox = () => {
        setOpenUpdateBox(!openUpdateBox);
    };

    const handleOpenDeleteBox = (customer: Customer) => {
        setOpenDeleteBox(!openDeleteBox);
        setCustomerInRow(customer);
    };

    const handleCloseDeleteBox = () => {
        setOpenDeleteBox(!openDeleteBox);
    };

    async function handleOpenCouponsBox(customer: Customer) {
        store.dispatch(couponsForViewAction(customer.coupons));
        setOpenCouponsBox(!openCouponsBox);
    };

    const handleCloseCouponsBox = () => {
        setOpenCouponsBox(!openCouponsBox);
    };

    const columns: readonly Column[] = [
        { id: 'id', label: 'Id', minWidth: 20, align: "right" },
        { id: 'firstName', label: 'firstName', minWidth: 80, align: "right", format: (value: { toLocaleString: (arg0: string) => any; }) => value.toLocaleString('en-US') },
        { id: 'lastName', label: 'lastName', minWidth: 80, align: "right", format: (value: { toLocaleString: (arg0: string) => any; }) => value.toLocaleString('en-US') },
        { id: 'email', label: 'Email', minWidth: 100, align: "right", format: (value: { toLocaleString: (arg0: string) => any; }) => value.toLocaleString('en-US') },
        { id: 'password', label: 'Password', minWidth: 30, align: "right", format: (value: { toLocaleString: (arg0: string) => any; }) => value.toLocaleString('en-US') },
        { id: 'coupons', label: 'Coupons', minWidth: 10, align: "right", format: (value: { toLocaleString: (arg0: string) => any; }) => value.toLocaleString('en-US') },
        { id: 'update', label: 'Edit', minWidth: 10, align: "right", format: (value: { toLocaleString: (arg0: string) => any; }) => value.toLocaleString('en-US') },
        { id: 'deleteIt', label: 'Delete', minWidth: 10, align: "right", format: (value: { toLocaleString: (arg0: string) => any; }) => value.toLocaleString('en-US') },
    ];

    function createData(customer1: Customer) {
        const id = customer1.id;
        const firstName = customer1.firstName;
        const lastName = customer1.lastName;
        const email = customer1.email;
        const password = <div>
            <Button value={customer1.password} startIcon={<PasswordIcon />} onClick={() => {
                handleOpenPasswordBox(customer1.password);
            }}> </Button>
            <Dialog
                open={openPasswordBox}
                onClose={handleClosePasswordBox}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"View Password"}
                    <Button className="close" onClick={handleClosePasswordBox} autoFocus>X</Button>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        For double chek, enter your admin's email and password
                        <br />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <form onSubmit={handleSubmit(chekAdminDetails)}>
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

                    </form>
                    {showPassword()}
                </DialogActions>
            </Dialog>
        </div>;


        const update = <div>
            <Button startIcon={<ModeEditIcon />} onClick={() => {
                handleOpenUpdateBox(customer1);
            }}> </Button>
            <Dialog
                open={openUpdateBox}
                onClose={handleCloseUpdateBox}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Update Customer"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        *************
                        <br />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <UpdateCustomer id={CustomerInRow.id} />

                    <Button onClick={handleCloseUpdateBox} autoFocus>X</Button>
                </DialogActions>
            </Dialog>
        </div>;
        <div> <input type="button" value="update" />  </div>;

        const deleteIt = <div>
            <Button value={customer1.password} startIcon={<DeleteIcon />} onClick={() => { handleOpenDeleteBox(customer1); }}> </Button>

            <Dialog
                open={openDeleteBox}
                onClose={handleCloseDeleteBox}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete this Customer?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting a customer is not returnable, after you will delete the
                        customer it will be lost forever.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteBox}>NO, STOP!</Button>
                    <Button onClick={deleteCustomer} autoFocus>
                        CONTINUE
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

        const coupons = <div>
            <Button startIcon={<AppsIcon />} onClick={() => { handleOpenCouponsBox(customer1) }}> </Button>
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

        return { id, firstName, lastName, email, password, coupons, update, deleteIt };
    }

    const rows: { id: number; firstName: string; lastName: string; email: string; password: JSX.Element; coupons: JSX.Element; update: JSX.Element; deleteIt: JSX.Element; }[] = [];
    customers.map((customer) => rows.push(createData(customer)));

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <div className="adminCustomers">
            <ButtonGroup variant="contained" fullWidth>
                <Button type="button" color="primary" onClick={addCustomer}>Add New Customer</Button>
            </ButtonGroup>
            <br /><br />

            <Select style={{ width: 250 }} defaultValue="All" onChange={searchTypeSet}  >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Id"}>Id</MenuItem>
                <MenuItem value={"FirstName"}>FirstName</MenuItem>
                <MenuItem value={"LastName"}>LastName</MenuItem>
            </Select>

            {searchBy()}

            <form onSubmit={handleSubmitCust(search)}>


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
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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

export default AdminCustomers;