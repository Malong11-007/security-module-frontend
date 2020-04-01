import React from "react";
import { useForm } from 'react-hook-form'
import API from "../../baseURL"; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert';

const ApplicationForm = (props) => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let CompletDate = year+'-'+month+'-'+date;

  const { register, errors,  handleSubmit } = useForm()
  const onSubmit = data => {
    // console.log(props);
    if (props.type === "insert") {
      OnInsert(data);
    } else {
      OnUpdate(data);
    }
  };

 //ForInsert
  const OnInsert = data => {
    
    data["Enabled_Flag"] = data.Enabled_Flag === true ? '1' : '0' // converting Enabled_Flag from boolean to String
    data["Created_By"] = 1;
    data["Creation_Date"] = CompletDate;
    data["Last_Updated_Date"] = CompletDate;
    data["Last_Updated_By"] = 1;
    // console.log(data);

    //Post
    API.post("/application/post", data, {
      header: {
        "Content-Type": "application/json"
      }
    })
    .then(function(response) {
      props.onClose(false);
	  props.getApplications();
	
	  // swal (Success)
	  if(response.status === 200)
	  {
		swal("Submited", "Your New Application's Body Is Successfully Inserted", "success");
	  }
	  //
		// swal (validate)
		else if(response.status === 403)
		{
		swal("Not Submited", "Your New Application's Body Is Missing Or Validate", "warning");
		}
		//
		// swal (error)
		else if(response.status === 400)
		{
			swal("Not Submited", "Your New Application's Body Is not Submited Successfully ", "error");
		}
		//
    })
    .catch(function(error) {
		console.log(error);
    });
  };

  //forUpdate
  const OnUpdate = data => {
    const {
      Application_ID,
      Application_Desc,
      Application_Name,
      Application_Short_Name,
      Enabled_Flag
    } = props.record;
    
    if (
      data.Application_Name === Application_Name &&
      data.Application_Short_Name === Application_Short_Name &&
      data.Application_Desc === Application_Desc &&
      data.Enabled_Flag === Enabled_Flag
    ) {
      alert("No Data Change To Be Noted");
      return;
    }

    data["Enabled_Flag"] = data.Enabled_Flag === true ? '1' : '0' // converting Enabled_Flag from boolean to String
    data["Last_Updated_Date"] = CompletDate;
    data["Last_Updated_By"] = 1;
    // console.log(data)

    //Update
    API.put(`/application/update/${Application_ID}`, data, {
      header: {
        "Content-Type": "application/json"
      }
    })
    .then(function(response) {
      props.onClose(false);
	  props.getApplications();

	   // swal (Success)
	   if(response.status === 200)
	   {
		 swal("Submited", "Your New Application's Body Is Successfully Updated", "success");
	   }
	   //
	   // swal (validate)
		else if(response.status === 403)
		{
		  swal("Not Submited", "Your New Application's Body Is Missing Or Validate", "warning");
		}
		//
		// swal (error)
		else if(response.status === 400)
		{
			swal("Not Submited", "Your New Application's Body Is not Updated Successfully ", "error");
		}
		//
    })
    .catch(function(error) {
	  console.log(error);
	  
	  
    });
  };

  return (
  	<Grid 
  		justify="center"
  	>
  			<form onSubmit={handleSubmit(onSubmit)} style={{minWidth:'100%'}}>
				  <p style={{ color: "#4252a7", textAlign:'center' }} className="h4 text-left py-4">
				    APPLICATION
				  </p>

				  <TextField
				    id="standard-search"
				    autoComplete="off"
				    fullWidth
            defaultValue={props.type === "update" ? props.record.Application_Name : ""}
				    type="search"
				    name="Application_Name"
				    style={{ marginBottom: "5px" }}
				    inputRef={register({ required: true, maxLength: 255 })}
				    label="Application Name"
				  />
				  {errors.Application_Name && errors.Application_Name.type === "required" && (
				    <p className="form_error">
				      {" "}
				      <i className="fas fa-exclamation-triangle"></i> This field is required
				    </p>
				  )}
				  {errors.Application_Name && errors.Application_Name.type === "maxLength" && (
				    <p className="form_error"> Maximum Length Allowed is 250 </p>
				  )}
				  <br />

				  <TextField
				    id="standard-search"
				    type="search"
				    autoComplete="off"
				    fullWidth
				    name="Application_Short_Name"
				    style={{ marginBottom: "5px", marginTop: "5px" }}
				    defaultValue={
				      props.type === "update" ? props.record.Application_Short_Name : ""
				    }
				    inputRef={register({ required: true, maxLength: 255 })}
				    label="Application Short Name"
				  />
				  {errors.Application_Short_Name &&
				    errors.Application_Short_Name.type === "required" && (
				      <p className="form_error">
				        {" "}
				        <i className="fas fa-exclamation-triangle"></i> This field is required
				      </p>
				    )}
				  {errors.Application_Short_Name &&
				    errors.Application_Short_Name.type === "maxLength" && (
				      <p className="form_error"> Maximum Length Allowed is 250 </p>
				    )}

				  <br />

				  <TextField
				    id="standard-search"
				    type="search"
				    autoComplete="off"
				    fullWidth
				    name="Application_Desc"
				    style={{ marginBottom: "5px", marginTop: "5px" }}
				    defaultValue={props.type === "update" ? props.record.Application_Desc : ""}
				    inputRef={register({ required: true, maxLength: 255 })}
				    label="Application Description"
				  />
				  {errors.Application_Desc && errors.Application_Desc.type === "required" && (
				    <p className="form_error">
				      {" "}
				      <i className="fas fa-exclamation-triangle"></i> This field is required
				    </p>
				  )}
				  {errors.Application_Desc && errors.Application_Desc.type === "maxLength" && (
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
  	</Grid>
		
  );
};

export default ApplicationForm;