import React from "react";
import { useForm } from 'react-hook-form'
import API from "../../baseURL"; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';

const RolesForm = (props) => {
	const { register, errors,  handleSubmit } = useForm()
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let CompletDate = year+'-'+month+'-'+date;
  
	const onSubmit = data => {
		if (props.type === "insert") {
			OnInsert(data);
		} else {
			OnUpdate(data);
		}
	};

 	/* INSERT FORM */
	const OnInsert = data => {
		data["Enabled_Flag"] = data.Enabled_Flag === true ? "1" : "0";
		data["Created_By"] = 1;
		data["Creation_Date"] = CompletDate;
		data["Last_Updated_Date"] = CompletDate;
		data["Last_Updated_By"] = 1;
		// console.log(data);

		API.post("/roles-modules/post", data, {
			header: {
				"Content-Type": "application/json"
			}
		})
		.then(function(response) {
			console.log(response);
			// swal (Success)
			if(response.status === 200)
			{
			  swal("Submited", "Your New RolesModule's Body Is Successfully Inserted", "success");
			}
			//
			  // swal (validate)
			  else if(response.status === 403)
			  {
			  swal("Not Submited", "Your New RolesModule's Body Is Missing Or Validate", "warning");
			  }
			  //
			  // swal (error)
			  else if(response.status === 400)
			  {
				  swal("Not Submited", "Your New RolesModule's Body Is not Submited Successfully ", "error");
			  }
			  //
		})
		.catch(function(error) {
			console.log(error);
		});
	};

	/* UPDATE FORM */
	const OnUpdate = data => {
		const {
			Role_ID,
			Module_ID,
			Organization_ID,
			Role_Module_ID,
			Enabled_Flag
		} = props.record;
		if (
			data.Role_ID === Role_ID &&
			data.Module_ID === Module_ID &&
			data.Enabled_Flag === Enabled_Flag &&
			data.Organization_ID === Organization_ID
		) {
			alert("No Data Change To Be Noted");
			return;
		}
		data["Enabled_Flag"] = data.Enabled_Flag === true ? "1" : "0";
		data["Last_Updated_Date"] = CompletDate;
		data["Last_Updated_By"] = 1;

		API.put(`/roles-modules/update/${Role_Module_ID}`, data, {
			header: {
				"Content-Type": "application/json"
			}
		})
		.then(function(response) {
			console.log(response);
			props.onClose(false);
			props.getRolesModules();
			 // swal (Success)
			 if(response.status === 200)
			 {
			   swal("Submited", "Your New RolesModule's Body Is Successfully Updated", "success");
			 }
			 //
			 // swal (validate)
			  else if(response.status === 403)
			  {
				swal("Not Submited", "Your New RolesModule's Body Is Missing Or Validate", "warning");
			  }
			  //
			  // swal (error)
			  else if(response.status === 400)
			  {
				  swal("Not Submited", "Your New RolesModule's Body Is not Updated Successfully ", "error");
			  }
			  //
		})
		.catch(function(error) {
			console.log(error);
		});
	};

  return (
    <div style = {{paddingLeft : "10%" }} >
			<form onSubmit={handleSubmit(onSubmit)}>
				<p style={{ color: "#007bff" }} className="h4 text-left py-4">
					MODULES-FORM
				</p>

				<TextField
					id="standard-search"
					type="Number"
					name="Role_ID"
					style={{ marginBottom: "5px", width: "50%" }}
					defaultValue={props.type === "update" ? props.record.Role_ID : ""}
					inputRef={register({ required: true, maxLength: 255 })}
					label="Role ID"
				/>
				{errors.Role_ID && errors.Role_ID.type === "required" && (
					<p className="form_error">
						{" "}
						<i className="fas fa-exclamation-triangle"></i> This field is required
					</p>
				)}
				{errors.Role_ID && errors.Role_ID.type === "maxLength" && (
					<p className="form_error"> Maximum Length Allowed is 250 </p>
				)}

				<br />

				<TextField
					id="standard-search"
					type="Number"
					name="Organization_ID"
					style={{ marginBottom: "5px", marginTop: "5px", width: "50%" }}
					defaultValue={props.type === "update" ? props.record.Organization_ID : ""}
					inputRef={register({ required: true, maxLength: 255 })}
					label="Organizatin ID"
				/>
				{errors.Organization_ID && errors.Organization_ID.type === "required" && (
					<p className="form_error">
						{" "}
						<i className="fas fa-exclamation-triangle"></i> This field is required
					</p>
				)}
				{errors.Organization_ID && errors.Organization_ID.type === "maxLength" && (
					<p className="form_error"> Maximum Length Allowed is 250 </p>
				)}

				<br />

				<TextField
					id="standard-search"
					type="Number"
					name="Module_ID"
					style={{ marginBottom: "15px", marginTop: "5px", width: "50%" }}
					defaultValue={props.type === "update" ? props.record.Module_ID : ""}
					inputRef={register({ required: true, maxLength: 255 })}
					label="Module ID"
				/>
				{errors.Module_ID && errors.Module_ID.type === "required" && (
					<p className="form_error">
						{" "}
						<i className="fas fa-exclamation-triangle"></i> This field is required
					</p>
				)}
				{errors.Module_ID && errors.Module_ID.type === "maxLength" && (
					<p className="form_error"> Maximum Length Allowed is 250 </p>
				)}

				<br />
				<div class="checkbox">
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
					<label for="checkbox1" className="checkbox__label">
						Enabled Flag
					</label>
				</div>

				<div>
					<Button color="primary" variant="contained" type="submit">
						{props.type === "insert" ? "Register" : "Update"}
					</Button>
				</div>
			</form>
    </div>
  );
};

export default RolesForm;