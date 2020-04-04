import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import API from "../../baseURL";
import ReactModal from "react-modal";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

const PurchaseOrderHeader = (props) => {
	const { User_ID, Organization_ID, Branch_ID } = useSelector(state => state.user);
	const { register, errors } = useForm();
	const currentDate = moment();
	const [suppliers, setSuppliers] = useState([]);
	const [departments, setdepartments] = useState([]);
	const [header, setHeader] = useState({
		PO_NO:`PO/ABC/2019-2020/${Math.random()}`, // temperory placeholder
		Status: "y",
		Created_By: User_ID,
		Organization_ID,
		Branch_ID,
		Approved_by_ID:0,
		Approved_Date:currentDate.format('YYYY-MM-DD'),
		PO_Date: currentDate.format('YYYY-MM-DD'),
		Creation_Date: currentDate.format('YYYY-MM-DD'),
		Last_Updated_Date: currentDate.format('YYYY-MM-DD HH:mm:ss'),
		Last_Updated_By: User_ID,
	});

	const PaymentType = [
		{ title: "Cash" },
		{ title: "Credit Card" },
		{ title: "Online Transfer" },
		{ title: "PayOrder" },
	];

	useEffect(() => {
		props.sendHeaderInfo(header);
	}, [header]); // eslint-disable-line

	useEffect(() => {
		ReactModal.setAppElement("body");

		// for supplier
		API.get("/supplier/1")
			.then((response) => {
				setSuppliers(response.data);
			})
			.catch((err) => {
				console.log(err);
				return;
			});

		// for department
		API.get("/department/1")
			.then((response) => {
				setdepartments(response.data);
			})
			.catch((err) => {
				console.log(err);
				return;
			});

	}, []); // eslint-disable-line


	/* Date Handler */
	const handleDateChange = (date) => {
		setHeader({
			...header,
			PO_Date: date,
		});
	};

	return (
		<div>
			<label style={{ fontSize: "24px", marginLeft: "15%" }}>
				PURCHASE ORDER
			</label>

			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					style={{ width: "70%", marginLeft: "15%" }}
					disableToolbar
					variant="inline"
					format="MM/dd/yyyy"
					id="PO_Date"
					label="P.O Date"
					value={header.PO_Date}
					onChange={handleDateChange}
					KeyboardButtonProps={{
						"aria-label": "change date",
					}}
				/>
			</MuiPickersUtilsProvider>

			<Autocomplete
				id="disable-portal1"
				options={suppliers}
				getOptionLabel={(option) => option.Supplier_Name}
				onChange={(event, values) =>
					setHeader({ ...header, Supplier_ID: values.Supplier_ID })
				}
				style={{ marginBottom: "5px", width: "70%", margin: "0 15%" }}
				renderInput={(params) => <TextField {...params} label="Supplier" />}
			/>

			<Autocomplete
				id="disable-portal2"
				options={PaymentType}
				getOptionLabel={(option) => option.title}
				style={{ marginBottom: "5px", width: "70%", margin: "0 15%" }}
				onChange={(event, values) =>
					setHeader({ ...header, Payment_Type: values.title })
				}
				renderInput={(params) => <TextField {...params} label="Payment Type" />}
			/>

			<Autocomplete
				id="disable-portal3"
				options={departments}
				getOptionLabel={(option) => option.Department_Name}
				onChange={(event, values) =>
					setHeader({ ...header, Ship_To_ID: values.Department_ID })
				}
				style={{ marginBottom: "5px", width: "70%", margin: "0 15%" }}
				renderInput={(params) => (
					<TextField {...params} label="Ship To Location" />
				)}
			/>

			<TextField
				id="standard-search"
				type="Search"
				name="RefNo"
				style={{ width: "70%", margin: "0 15%" }}
				onChange={(event) =>
					setHeader({ ...header, Ref_No: event.target.value })
				}
				defaultValue={props.type === "update" ? props.record.RefNo : ""}
				inputRef={register({ required: true, maxLength: 255 })}
				label="RefNo"
			/>

			<TextField
				id="standard-search"
				type="Search"
				name="Remarks"
				style={{ marginBottom: "5px", width: "90%", margin: "0 5% 5%" }}
				onChange={(event) =>
					setHeader({ ...header, Remarks: event.target.value })
				}
				defaultValue={props.type === "update" ? props.record.Remarks : ""}
				inputRef={register({ required: true, maxLength: 500 })}
				label="Remarks"
			/>
			{errors.Remarks && errors.Remarks.type === "required" && (
				<p className="form_error">
					<i className="fas fa-exclamation-triangle"></i> This field is required
				</p>
			)}
			{errors.Remarks && errors.Remarks.type === "maxLength" && (
				<p className="form_error"> Maximum Length Allowed is 500 </p>
			)}

		</div>
	);
};

export default PurchaseOrderHeader;

