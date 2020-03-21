import React from "react";
import { useForm } from 'react-hook-form'
import API from "../../baseURL"; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const RolesFormsForm = (props) => {
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
		console.log(errors);
	};

	/* INSERT FORM FUNCTION */
	const OnInsert = data => {
		data["Enabled_Flag"] = data.Enabled_Flag === true ? "1" : "0";
		data["Created_By"] = 1;
		data["Creation_Date"] = CompletDate;
		data["Last_Updated_Date"] = CompletDate;
		data["Last_Updated_By"] = 1;
		console.log(data);

		API.post("/roles-forms/post", data, {
			header: {
				"Content-Type": "application/json"
			}
		})
		.then(function(response) {
			console.log(response);
		})
		.catch(function(error) {
			console.log(error);
		});
	};

	/* UPDATE FORM FUNCTION */
	const OnUpdate = data => {
		const {
			Role_ID,
			Role_Desc,
			Role_Name,
			Organization_ID,
			Enabled_Flag
		} = props.record;
		if (
			data.Role_Name === Role_Name &&
			data.Role_Desc === Role_Desc &&
			data.Enabled_Flag === Enabled_Flag &&
			data.Organization_ID === Organization_ID
		) {
			alert("No Data Change To Be Noted");
			return;
		}
		data["Enabled_Flag"] = data.Enabled_Flag === true ? "1" : "0";
		data["Last_Updated_Date"] = CompletDate;
		data["Last_Updated_By"] = 1;

		API.put(`/roles-form/update/${Role_ID}`, data, {
			header: {
				"Content-Type": "application/json"
			}
		})
		.then(function(response) {
			console.log(response);
			props.onClose(false);
			props.getRolesForms();
		})
		.catch(function(error) {
			console.log(error);
		});
	};

  return (
    <div style = {{paddingLeft : "10%" }} >
     	<form onSubmit={handleSubmit(onSubmit)}>
				<p style={{ color: "#007bff" }} className="h4 text-left py-4">
					ROLES-FORM
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
					name="Form_ID"
					style={{ marginBottom: "15px", marginTop: "5px", width: "50%" }}
					defaultValue={props.type === "update" ? props.record.Form_ID : ""}
					inputRef={register({ required: true, maxLength: 255 })}
					label="Form ID"
				/>
				{errors.Form_ID && errors.Form_ID.type === "required" && (
					<p className="form_error">
						{" "}
						<i className="fas fa-exclamation-triangle"></i> This field is required
					</p>
				)}
				{errors.Form_ID && errors.Form_ID.type === "maxLength" && (
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

export default RolesFormsForm;