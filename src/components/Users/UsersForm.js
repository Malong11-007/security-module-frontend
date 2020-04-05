import React from "react";
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'
import API from "../../baseURL.js"; 
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import moment from 'moment';

const UsersForm = (props) => {
  const { register, errors,  handleSubmit } = useForm()
  let currentDate = moment();
	const { Organization_ID, User_ID } = useSelector(state => state.user)

  const onSubmit = data => {
    if (props.type === "insert") {
      OnInsert(data);
    } else {
      OnUpdate(data);
    }
  };

  const OnInsert = data => {

    data = {
			...data,
			Time_Date_Locked: currentDate.format('YYYY-MM-DD'),
			Last_Login_Date: currentDate.format('YYYY-MM-DD'),
			Last_Host_ID: 'none',
			HostID_at_Time_Locked: 'none',
			Account_Locked_Flag: data.Account_Locked_Flag === true ? "1" : "Y",
			Branch_ID: 1,
			Organization_ID: 1,
			Enabled_Flag:data.Enabled_Flag === true ? "1" : "Y",
			Created_By: 1,
			Creation_Date: currentDate.format('YYYY-MM-DD'),
			Last_Updated_By: 1,
			Last_Updated_Date: currentDate.format('YYYY-MM-DD HH:mm:ss')
		}

    API.post("/users/post", data, {
      header: {
        "Content-Type": "application/json"
      }
    })
    .then(function(response) {
     if(response.status === 200)
			  swal("New Record Created!","", "success");
			props.onClose(false);
			props.getUsers();
		}) 
    .catch(function(error) {
      console.log(error);
      if(error.response.status === 400 ||error.response.status === 403 || error.response.status === 404){
				swal("Entry Failed!",error.message, "error");
 			}
    });
  };

  const OnUpdate = data => {
    const {
      User_ID,
      User_Name,
      User_Status,
      User_Email,
      Enabled_Flag,
      User_Mobile,
      Employee_ID,
      Host_ID_Restric,
      Account_Locked_Flag
    } = props.record;
    if (
      data.User_Name === User_Name &&
      data.User_Status === User_Status &&
      data.User_Email === User_Email &&
			(data.Enabled_Flag === true ? "1" : "Y") === Enabled_Flag &&
      data.User_Mobile === User_Mobile &&
      data.Employee_ID === Employee_ID &&
      data.Host_ID_Restric === Host_ID_Restric &&
      (data.Account_Locked_Flag === true ? "1" : "Y") === Account_Locked_Flag
    ) {
      alert("No Data Change To Be Noted");
      return;
    }

   	data = {
  		...data,
  		Enabled_Flag: data.Enabled_Flag === true ? '1' : 'Y',
  		Account_Locked_Flag: data.Account_Locked_Flag === true ? '1' : 'Y',
			Last_Updated_By: 1, // temp Changed With User_ID
			Last_Updated_Date: currentDate.format('YYYY-MM-DD HH:mm:ss')
  	}

    API.put(`/users/update/${User_ID}`, data, {
      header: {
        "Content-Type": "application/json"
      }
    })
    .then(function(response) {
  		if(response.status === 200)
			  swal("Record Updated!","", "success");
      props.onClose(false);
      props.getUsers();
    })
    .catch(function(error) {
      console.log(error);
      if(error.response.status === 400 ||error.response.status === 403 || error.response.status === 404){
				swal(`Entry Failed!`, error.message, "error");
 			}
    });
  };

  return (
   <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p style={{ color: "#007bff" }} className="h4 text-left py-4">
          USERS-FORM
        </p>
        <TextField
          type="Search"
          name="User_Name"
          fullWidth
          style={{ marginBottom: "20px" }}
          defaultValue={props.type === "update" ? props.record.User_Name : ""}
          inputRef={register({ required: true, maxLength: 255 })}
          label="User Name"
        />
        {errors.User_Name && errors.User_Name.type === "required" && (
          <p className="form_error">
            <i className="fas fa-exclamation-triangle"></i> This field is required
          </p>
        )}
        {errors.User_Name && errors.User_Name.type === "maxLength" && (
          <p className="form_error"> Maximum Length Allowed is 250 </p>
        )}

        {
        	props.type === 'insert' &&
        	<>
        	<TextField
            type="Password"
            name="User_hpassword"
            fullWidth
            style={{ marginBottom: "20px" }}
            defaultValue={props.type === "update" ? props.record.User_hpassword : ""}
            inputRef={register({ required: true, maxLength: 255 })}
            label="User Password"
          />
          {errors.User_hpassword && errors.User_hpassword.type === "required" && (
            <p className="form_error">
              <i className="fas fa-exclamation-triangle"></i> This field is required
            </p>
          )}
          {errors.User_hpassword && errors.User_hpassword.type === "maxLength" && (
            <p className="form_error"> Maximum Length Allowed is 255 </p>
          )}
          </>
        }
        
        <TextField
          type="Search"
          name="User_Status"
          fullWidth
          style={{ marginBottom: "20px" }}
          defaultValue={props.type === "update" ? props.record.User_Status : ""}
          inputRef={register({ required: true, maxLength: 255 })}
          label="User Status"
        />
        {errors.User_Status && errors.User_Status.type === "required" && (
          <p className="form_error">
            <i className="fas fa-exclamation-triangle"></i> This field is required
          </p>
        )}
        {errors.User_Status && errors.User_Status.type === "maxLength" && (
          <p className="form_error"> Maximum Length Allowed is 250 </p>
        )}
 
        <TextField
          type="Email"
          name="User_Email"
          fullWidth
          style={{ marginBottom: "20px" }}
          defaultValue={props.type === "update" ? props.record.User_Email : ""}
          inputRef={register({
            required: true,
            maxLength: 255,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "invalid email address"
            }
          })}
          label="User Email"
        />
        {errors.User_Email && errors.User_Email.type === "required" && (
          <p className="form_error">
            <i className="fas fa-exclamation-triangle"></i> This field is required
          </p>
        )}
        {errors.User_Email && errors.User_Email.type === "maxLength" && (
          <p className="form_error"> Maximum Length Allowed is 250 </p>
        )}

        <TextField
          type="Search"
          name="User_Mobile"
          fullWidth
          style={{ marginBottom: "20px" }}
          defaultValue={props.type === "update" ? props.record.User_Mobile : ""}
          inputRef={register({ required: true, maxLength: 255 })}
          label="User Mobile"
        />
        {errors.User_Mobile && errors.User_Mobile.type === "required" && (
          <p className="form_error">
            <i className="fas fa-exclamation-triangle"></i> This field is required
          </p>
        )}
        {errors.User_Mobile && errors.User_Mobile.type === "maxLength" && (
          <p className="form_error"> Maximum Length Allowed is 250 </p>
        )}

        <TextField
          type="Number"
          name="Employee_ID"
          fullWidth
          style={{ marginBottom: "20px" }}
          defaultValue={props.type === "update" ? props.record.Employee_ID : ""}
          inputRef={register({ required: true, maxLength: 255 })}
          label="Employee ID"
        />
        {errors.Employee_ID && errors.Employee_ID.type === "required" && (
          <p className="form_error">
            <i className="fas fa-exclamation-triangle"></i> This field is required
          </p>
        )}
        {errors.Employee_ID && errors.Employee_ID.type === "maxLength" && (
          <p className="form_error"> Maximum Length Allowed is 250 </p>
        )}

        <TextField
          type="text"
          name="Host_ID_Restric"
          fullWidth
          style={{ marginBottom: "20px"}}
          defaultValue={props.type === "update" ? props.record.Host_ID_Restric : ""}
          inputRef={register({ required: true, maxLength: 255 })}
          label="Host ID Restric"
        />
        {errors.Host_ID_Restric && errors.Host_ID_Restric.type === "required" && (
          <p className="form_error">
            <i className="fas fa-exclamation-triangle"></i> This field is required
          </p>
        )}
        {errors.Host_ID_Restric && errors.Host_ID_Restric.type === "maxLength" && (
          <p className="form_error"> Maximum Length Allowed is 250 </p>
        )}

        <FormControlLabel
	        control={
	          <Checkbox
	          	inputRef={register}
	          	defaultChecked={
	              props.type === "update"
	                ? props.record.Enabled_Flag === "1"
	                  ? true
	                  : false
	                : false
	            }
	            name="Enabled_Flag"
	            color="primary"
	          />
	        }
	        label="Enable Flag"
	      />

	      <FormControlLabel
	        control={
	          <Checkbox
	          	inputRef={register}
	          	defaultChecked={
	              props.type === "update"
	                ? props.record.Account_Locked_Flag === "1"
	                  ? true
	                  : false
	                : false
	            }
	            name="Account_Locked_Flag"
	            color="primary"
	          />
	        }
	        label="Account Lock Flag"
	      />

        <div>
          <Button color="primary" variant="contained" type="submit">
            {props.type === "insert" ? "Register" : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UsersForm;