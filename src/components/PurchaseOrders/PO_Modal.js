import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import API from "../../baseURL";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSelector, useDispatch } from 'react-redux';
import { add_line } from '../../actions/PO_Actions.js';
import moment from "moment";


const PurchaseInsertModal = (props) => {
	const dispatch = useDispatch();
	const { User_ID } = useSelector(state => state.user);
	const { Organization_ID } = useSelector(state => state.user);
	const { register, errors, handleSubmit, setValue } = useForm();
	const [items, setItems] = useState([]);
	const currentDate = moment();
	
	const lineStructure = {
		Item_ID:'',
		Item_Name:'',
		UOM_Name:'',
		quantity:'', 
		Price:'2',
		GST_Per:'2', //placeHolder Data
		GST_Amt:'2',
		WHT_Amt:'2',
		WHT_Per:'2',
		Total_Amt:'2',
		Created_By: User_ID,
		Creation_Date: currentDate.format('YYYY-MM-DD'),
		Last_Updated_Date: currentDate.format('YYYY-MM-DD HH:mm:ss'),
		Last_Updated_By: User_ID,
	}

	const onSubmit = (data) => {
		const { Item_ID, Item_Name, UOM_ID, item_Quantity } = data;
		console.log(data)
		API.get(`/items/get/item-details?Item_ID=${Item_ID}&UOM_ID=${UOM_ID}`)
			.then(response => {
				let newLine = Object.assign({},lineStructure);
				newLine.Item_ID = Item_ID;
				newLine.Item_Name = Item_Name;
				newLine.quantity = item_Quantity
				newLine.UOM_Name = response.data.UOM_Name;
				console.log(newLine)
				dispatch(add_line(newLine))
			})
			.catch(err => {
				console.log(err)
			})
	};


	useEffect(() => { /* Intialize the value for AutoComplete InputBox*/
    register({ name: "Item_ID"}, {required: true});
    register({ name: "Item_Name"}, {required: true});
    register({ name: "UOM_ID"}, {required: true});
  },[]); // eslint-disable-line


	/* Get ITEMS on Component load */
	useEffect(() => {
		API.get(`/items/${Organization_ID}`)
			.then((response) => {
				setItems(response.data);
			})
			.catch((err) => {
				console.log(err);
				return;
			});
	},[]); // eslint-disable-line


	return (
		<Grid container justify="center">
			<form onSubmit={handleSubmit(onSubmit)} style={{ minWidth: "100%" }}>
				<p
					style={{ color: "#4252a7", textAlign: "center" }}
					className="h4 text-left py-4"
				>
					ITEM SELECTION
				</p>

				<Autocomplete
					id="disable-portal"
					options={items}
					ref={register}
					name="Item_Name"
					getOptionLabel={(option) => option.Item_Name}
					onChange={(event, value) => setValue([{"Item_ID":value.Item_ID},{"UOM_ID":value.UOM_ID},{Item_Name:value.Item_Name}])}
					style={{ marginBottom: "5px" }}
					renderInput={params => {
	          return (
	            <TextField
	              {...params}
	              label="Item List"
	              name="Item_ID"
	              fullWidth
	              value={params}
	            />
	          );
					}}
				/>
				{errors.Item_List && errors.Item_List.type === "required" && (
					<p className="form_error_PIM">
						{" "}
						<i className="fas fa-exclamation-triangle"></i> This field is
						required
					</p>
				)}
				{errors.Item_List && errors.Item_List.type === "maxLength" && (
					<p className="form_error_PIM"> Maximum Length Allowed is 250 </p>
				)}
				<br />

				<TextField
					id="standard-search"
					type="Number"
					autoComplete="off"
					fullWidth
					name="item_Quantity"
					style={{ marginBottom: "5px" }}
					defaultValue={
						props.type === "update" ? props.record.item_Quantity : ""
					}
					inputRef={register({ required: true, maxLength: 255 })}
					label="Item Quantity"
				/>
				{errors.item_Quantity && errors.item_Quantity.type === "required" && (
					<p className="form_error_PIM">
						{" "}
						<i className="fas fa-exclamation-triangle"></i> This field is
						required
					</p>
				)}
				{errors.item_Quantity && errors.item_Quantity.type === "maxLength" && (
					<p className="form_error_PIM"> Maximum Length Allowed is 250 </p>
				)}

				<br />

				<div>
					<Button
						color="primary"
						variant="contained"
						type="submit"
						style={{
							marginBottom: "5px",
							marginTop: "50px",
							marginLeft: "45%",
						}}
					>ADD ITEM
					</Button>
				</div>
			</form>
		</Grid>
	);
};

export default PurchaseInsertModal;