import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux';
import API from "../../baseURL"; 
import TextField from '@material-ui/core/TextField';
import Autocomplete from "@material-ui/lab/Autocomplete";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from '@material-ui/core/Button';
import moment from 'moment';
import swal from 'sweetalert';

const UserRolesForm  = (props) => {
  const { register, errors, watch, handleSubmit, setValue } = useForm({
	  defaultValues: {
	    "User_ID": props.type === 'update' ? props.record.User_ID : "",
	    "Role_ID": props.type === 'update' ? props.record.Role_ID : ""
	  }
	});
  const watchValues = watch();
	const [forms,setForms] = useState([]);
	const [users,setUsers] = useState([]);
	const [roles,setRoles] = useState([]);
	const [ready,setReady] = useState(false);
  const currentDate = moment();


//foritems
useEffect(() => { 
	// for department 
	 API.get('/user-name/1')
	 .then(response => {
		setUsers(response.data)
	 })
	 .catch(err => {
	   console.log(err);
	   return;
	 })
	},[])
	 //

  useEffect(() => {
  	register({name:"Role_ID"},{required:true})
  	register({name:"User_ID"},{required:true})

  },[]) // eslint-disable-line

  useEffect(() => {
  	if(roles.length === 0){
  		API.get(`/get/RMF/1`) ///get/RMF/${Organization_ID}
			.then((response) => {
				setForms(response.data.forms);
			
				setRoles(response.data.roles);
				setReady(true);
			})
			.catch((err) => {
				console.log(err);
				return;
			});
  	}
  }, [roles]) // eslint-disable-line


	const onSubmit = (data,e) => {
		if (props.type === "insert") {
			OnInsert(data);
		} else {
			OnUpdate(data);
		}
	};

	/* INSERT FORM FUNCTION */
	const OnInsert = data => {

		/* Additional Values to Form */
		data = {
			...data,
			Organization_ID: 1,
			Enabled_Flag:data.Enabled_Flag === true ? "1" : "Y",
			Created_By: 1,
			Creation_Date: currentDate.format('YYYY-MM-DD'),
			Last_Updated_By: 1,
			Last_Updated_Date: currentDate.format('YYYY-MM-DD HH:mm:ss')
		}
		console.log(data);
		API.post("/user-roles/post", data, {
			header: {
				"Content-Type": "application/json"
			}
		})
		.then(function(response) {
			// console.log(response);
			if(response.status === 200)
			  swal("New Record Created!","", "success");
			props.onClose(false);
		})
		.catch(function(error) {
			console.log(error);
			if(error.response.status === 400 ||error.response.status === 403 || error.response.status === 404){
				swal("Entry Failed!",error.message, "error");
 			}
		});
	};

	/* UPDATE FORM FUNCTION */
	const OnUpdate = data => {
		const {
			Role_ID,
			User_Role_ID,
			Module_ID,
			Form_ID,
			Enabled_Flag
		} = props.record;
		if (
			data.Role_ID === Role_ID &&
			data.Module_ID === Module_ID &&
			(data.Enabled_Flag === true ? 1 : "Y") === Enabled_Flag &&
			data.Form_ID === Form_ID
		) {
			alert("No Data Change To Be Noted");
			return;
		}
		data["Enabled_Flag"] = data.Enabled_Flag === true ? "1" : "Y";
		data["Last_Updated_Date"] = currentDate.format('YYYY-MM-DD HH:mm:ss');
		data["Last_Updated_By"] = 1;

		API.put(`/user-roles/update/${User_Role_ID}`, data, {
			header: {
				"Content-Type": "application/json"
			}
		})
		.then(function(response) {
			// console.log(response);
			if(response.status === 200)
			  swal("Record Updated!","", "success");
			props.onClose(false);
			props.getRolesForms();
		})
		.catch(function(error) {
			console.log(error);
			if(error.response.status === 400 ||error.response.status === 403 || error.response.status === 404){
				swal(`Entry Failed!`, error.message, "error");
 			}
		});
	};

  return (
    <div style={{margin:'0 10px'}}>
    {
    	ready ?
    	<form onSubmit={handleSubmit(onSubmit)}>
				<p style={{ color: "#007bff" }} className="h4 text-left py-4">
					ROLES FORM
				</p>

				<Autocomplete
					id="disable-portal"
					options={roles}
					ref={register}
					name="Role_ID"
					defaultValue={props.type === 'update' ? roles.find(role => role.Role_ID === props.record.Role_ID) : {}}
					getOptionLabel={(option) => option.Role_Name || ""}
					onChange={(event, value) => {if(value != null) setValue("Role_ID",value.Role_ID)}}
					style={{ marginBottom: "20px" }}
					renderInput={params => {
	          return (
	            <TextField
	              {...params}
	              label="Role List"
	              name="Role_ID"
	              fullWidth
	              value={params}
	            />
	          );
					}}
				/>
				{errors.Role_ID && errors.Role_ID.type === "required" && (
					<p className="form_error">
						<i className="fas fa-exclamation-triangle"></i> This field is required
					</p>
				)}
				<Autocomplete
					id="disable-portal"
					options={users}
					ref={register}
					name="User_Name"
					defaultValue={props.type === 'update' ? users.find(user => user.User_ID === props.record.User_ID) : {}}
					getOptionLabel={(option) => option.User_Name || ""}
					onChange={(event, value) => {if(value != null) setValue("User_ID",value.User_ID)}}
					style={{ marginBottom: "20px" }}
					renderInput={params => {
	          return (
	            <TextField
	              {...params}
	              label="User Name"
	              name="User_ID"
	              fullWidth
	              value={params}
	            />
	          );
					}}
				/>
				{errors.User_Name && errors.User_Name.type === "required" && (
					<p className="form_error">
						<i className="fas fa-exclamation-triangle"></i> This field is required
					</p>
				)}

				
				<br />
				<div className="checkbox">
					<input
						name="Enabled_Flag"
						defaultChecked={
							props.type === "update"
								? props.record.Enabled_Flag === "1"
									? true
									: false
								: false
						}
						type="checkbox"
						id="checkbox1"
						className="checkbox__input"
						ref={register}
					/>
					<label htmlFor="checkbox1" className="checkbox__label">
						Enabled Flag
					</label>
				</div>

				<div>
					<Button color="primary" variant="contained" type="submit">
						{props.type === "insert" ? "Register" : "Update"}
					</Button>
				</div>
			</form> : 
			<h6>Loading</h6>
    }
     	
    </div>
  );
};

export default UserRolesForm;