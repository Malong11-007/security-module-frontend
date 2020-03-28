import React from "react";
import { useForm } from 'react-hook-form'
import API from "../../baseURL.js"; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';

const RolesForm = (props) => {
  const { register, errors,  handleSubmit } = useForm()
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClick = newState => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };


  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let CompletDate = year+'-'+month+'-'+date;

  const onSubmit = data => {
    console.log(props);
    console.log(data);

    if (props.type === "insert") {
      OnInsert(data);
    } else {
      OnUpdate(data);
    }
    console.log(errors);
  };

  const OnInsert = data => {
    data["Account_Locked_Flag"] = data.Enabled_Flag === true ? "1" : "0";
    data["Enabled_Flag"] = data.Enabled_Flag === true ? "1" : "0";
    data["Created_By"] = 1;
    data["Creation_Date"] = CompletDate;
    data["Last_Updated_Date"] = CompletDate;
    data["Last_Updated_By"] = 1;
    console.log(data);

    //Post
    API.post("/users/post", data, {
      header: {
        "Content-Type": "application/json"
      }
    })
    .then(function(response) {
      console.log(response);
      if(response.status === 200){
        handleClick();
      }
    })
    .catch(function(error) {
      console.log(error);
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
      data.Enabled_Flag === Enabled_Flag &&
      data.User_Mobile === User_Mobile &&
      data.Employee_ID === Employee_ID &&
      data.Host_ID_Restric === Host_ID_Restric &&
      data.Account_Locked_Flag === Account_Locked_Flag
    ) {
      alert("No Data Change To Be Noted");
      return;
    }
    data["Enabled_Flag"] = data.Enabled_Flag === true ? "1" : "0";
    data["Last_Updated_Date"] = CompletDate;
    data["Last_Updated_By"] = 1;

    //Update
    API.put(`/users/update/${User_ID}`, data, {
      header: {
        "Content-Type": "application/json"
      }
    })
    .then(function(response) {
      console.log(response);
      props.onClose(false);
      props.getUsers();
    })
    .catch(function(error) {
      console.log(error);
    });
  };

  return (
    <div style = {{ }} >
      <form onSubmit={handleSubmit(onSubmit)}>
        <p style={{ color: "#007bff" }} className="h4 text-left py-4">
          USERS-FORM
        </p>


        <Box component="span" display="block">

            <Box component="div" display="inline">

            <TextField
              id="standard-search"
              type="Search"
              name="User_Name"
              style={{ marginBottom: "5px", width: "40%" , margin : "0 5%"  }}
              defaultValue={props.type === "update" ? props.record.User_Name : ""}
              inputRef={register({ required: true, maxLength: 255 })}
              label="User Name"
            />
            {errors.User_Name && errors.User_Name.type === "required" && (
              <p className="form_error">
                {" "}
                <i className="fas fa-exclamation-triangle"></i> This field is required
              </p>
            )}
            {errors.User_Name && errors.User_Name.type === "maxLength" && (
              <p className="form_error"> Maximum Length Allowed is 250 </p>
            )}


            </Box>


            
            <Box component="div" display="inline">

            <TextField
              id="standard-search"
              type="Password"
              name="User_hpassword"
              style={{ marginBottom: "5px", margin : "0 5%" , width: "40%" }}
              defaultValue={props.type === "update" ? props.record.User_hpassword : ""}
              inputRef={register({ required: true, maxLength: 255 })}
              label="User hpassword"
            />
            {errors.User_hpassword && errors.User_hpassword.type === "required" && (
              <p className="form_error">
                {" "}
                <i className="fas fa-exclamation-triangle"></i> This field is required
              </p>
            )}
            {errors.User_hpassword && errors.User_hpassword.type === "maxLength" && (
              <p className="form_error"> Maximum Length Allowed is 250 </p>
            )}


            </Box>
        

          </Box>

{/*  */}

<Box component="span" display="block">

  <Box component="div" display="inline">


        <TextField
          id="standard-search"
          type="Search"
          name="User_Status"
          style={{  marginBottom: "5px", width: "40%" , margin : "0 5%"  }}
          defaultValue={props.type === "update" ? props.record.User_Status : ""}
          inputRef={register({ required: true, maxLength: 255 })}
          label="User Status"
        />
        {errors.User_Status && errors.User_Status.type === "required" && (
          <p className="form_error">
            {" "}
            <i className="fas fa-exclamation-triangle"></i> This field is required
          </p>
        )}
        {errors.User_Status && errors.User_Status.type === "maxLength" && (
          <p className="form_error"> Maximum Length Allowed is 250 </p>
        )}


      </Box>
      <Box component="div" display="inline">


        <TextField
          id="standard-search"
          type="Email"
          name="User_Email"
          style={{  marginBottom: "5px", margin : "0 5%" , width: "40%" }}
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
            {" "}
            <i className="fas fa-exclamation-triangle"></i> This field is required
          </p>
        )}
        {errors.User_Email && errors.User_Email.type === "maxLength" && (
          <p className="form_error"> Maximum Length Allowed is 250 </p>
        )}

      </Box>

    </Box>

{/*  */}

<Box component="span" display="block">

  <Box component="div" display="inline">


        <TextField
          id="standard-search"
          type="Search"
          name="User_Mobile"
          style={{  marginBottom: "5px", width: "40%" , margin : "0 5%" }}
          defaultValue={props.type === "update" ? props.record.User_Mobile : ""}
          inputRef={register({ required: true, maxLength: 255 })}
          label="User Mobile"
        />
        {errors.User_Mobile && errors.User_Mobile.type === "required" && (
          <p className="form_error">
            {" "}
            <i className="fas fa-exclamation-triangle"></i> This field is required
          </p>
        )}
        {errors.User_Mobile && errors.User_Mobile.type === "maxLength" && (
          <p className="form_error"> Maximum Length Allowed is 250 </p>
        )}

</Box>
      <Box component="div" display="inline">

        <TextField
          id="standard-search"
          type="Number"
          name="Employee_ID"
          style={{  marginBottom: "5px", margin : "0 5%" , width: "40%"  }}
          defaultValue={props.type === "update" ? props.record.Employee_ID : ""}
          inputRef={register({ required: true, maxLength: 255 })}
          label="Employee ID"
        />
        {errors.Employee_ID && errors.Employee_ID.type === "required" && (
          <p className="form_error">
            {" "}
            <i className="fas fa-exclamation-triangle"></i> This field is required
          </p>
        )}
        {errors.Employee_ID && errors.Employee_ID.type === "maxLength" && (
          <p className="form_error"> Maximum Length Allowed is 250 </p>
        )}

</Box>

</Box>

{/*  */}

<Box component="span" display="block">

  <Box component="div" display="inline">


        <TextField
          id="standard-search"
          type="Number"
          name="Host_ID_Restric"
          style={{ marginBottom: "5px", width: "40%" , margin : "0 5%" }}
          defaultValue={props.type === "update" ? props.record.Host_ID_Restric : ""}
          inputRef={register({ required: true, maxLength: 255 })}
          label="Host ID Restric"
        />
        {errors.Host_ID_Restric && errors.Host_ID_Restric.type === "required" && (
          <p className="form_error">
            {" "}
            <i className="fas fa-exclamation-triangle"></i> This field is required
          </p>
        )}
        {errors.Host_ID_Restric && errors.Host_ID_Restric.type === "maxLength" && (
          <p className="form_error"> Maximum Length Allowed is 250 </p>
        )}

</Box>
      <Box component="div" display="inline">

        <TextField
          id="standard-search"
          type="datetime-local"
          name="Last_Login_Date"
          style={{ marginBottom: "5px", margin : "0 5%" , width: "40%"  }}
          defaultValue={
            props.type === "update" ? props.record.Last_Login_Date : "12/22/2020"
          }
          inputRef={register({ required: true, maxLength: 255 })}
          label="Last Login Date"
          required
        />
        {errors.Last_Login_Date && errors.Last_Login_Date.type === "required" && (
          <p className="form_error">
            {" "}
            <i className="fas fa-exclamation-triangle"></i> This field is required
          </p>
        )}
        {errors.Last_Login_Date && errors.Last_Login_Date.type === "maxLength" && (
          <p className="form_error"> Maximum Length Allowed is 250 </p>
        )}

</Box>

</Box>

{/*  */}


<Box component="span" display="block">

  <Box component="div" display="inline">


        <TextField
          id="standard-search"
          type="Number"
          name="Last_Host_ID"
          style={{ marginBottom: "5px", width: "40%" , margin : "0 5%" }}
          defaultValue={props.type === "update" ? props.record.Last_Host_ID : ""}
          inputRef={register({ required: true, maxLength: 255 })}
          label="Last Host ID"
          required
        />
        {errors.Last_Host_ID && errors.Last_Host_ID.type === "required" && (
          <p className="form_error">
            {" "}
            <i className="fas fa-exclamation-triangle"></i> This field is required
          </p>
        )}
        {errors.Last_Host_ID && errors.Last_Host_ID.type === "maxLength" && (
          <p className="form_error"> Maximum Length Allowed is 250 </p>
        )}

</Box>
      <Box component="div" display="inline">

        <TextField
          id="standard-search"
          type="datetime-local"
          name="HostID_at_Time_Locked"
          style={{marginBottom: "5px", margin : "0 5%" , width: "40%" }}
          defaultValue={
            props.type === "update" ? props.record.HostID_at_Time_Locked : ""
          }
          inputRef={register({ required: true, maxLength: 255 })}
          label="HostID at Time Locked"
          required
        />
        {errors.HostID_at_Time_Locked &&
          errors.HostID_at_Time_Locked.type === "required" && (
            <p className="form_error">
              {" "}
              <i className="fas fa-exclamation-triangle"></i> This field is required
            </p>
          )}
        {errors.HostID_at_Time_Locked &&
          errors.HostID_at_Time_Locked.type === "maxLength" && (
            <p className="form_error"> Maximum Length Allowed is 250 </p>
          )}

</Box>

</Box>

{/*  */}

<Box component="span" display="block">

  <Box component="div" display="inline">

        <TextField
          id="standard-search"
          type="datetime-local"
          name="Time_Date_Locked"
          style={{ marginBottom: "5px", width: "40%" , margin : "0 5%"   }}
          defaultValue={props.type === "update" ? props.record.Time_Date_Locked : ""}
          inputRef={register({ required: true, maxLength: 255 })}
          label="Time_Date_Locked"
          required
        />
        {errors.HostID_at_Time_Locked &&
          errors.HostID_at_Time_Locked.type === "required" && (
            <p className="form_error">
              {" "}
              <i className="fas fa-exclamation-triangle"></i> This field is required
            </p>
          )}
        {errors.HostID_at_Time_Locked &&
          errors.HostID_at_Time_Locked.type === "maxLength" && (
            <p className="form_error"> Maximum Length Allowed is 250 </p>
          )}

</Box>
      <Box component="div" display="inline">

        <TextField
          id="standard-search"
          type="Number"
          name="Organization_ID"
          style={{marginBottom: "5px", margin : "0 5%" , width: "40%" }}
          defaultValue={props.type === "update" ? props.record.Organization_ID : ""}
          inputRef={register({ required: true, maxLength: 255 })}
          label="Organization ID"
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

</Box>

</Box>

{/*  */}

        <TextField
          id="standard-search"
          type="Number"
          name="Branch_ID"
          style={{ marginBottom: "5px", width: "40%" , margin : "0 5%" }}
          defaultValue={props.type === "update" ? props.record.Branch_ID : ""}
          inputRef={register({ required: true, maxLength: 255 })}
          label="Branch ID"
        />
        {errors.Branch_ID && errors.Branch_ID.type === "required" && (
          <p className="form_error">
            {" "}
            <i className="fas fa-exclamation-triangle"></i> This field is required
          </p>
        )}
        {errors.Branch_ID && errors.Branch_ID.type === "maxLength" && (
          <p className="form_error"> Maximum Length Allowed is 250 </p>
        )}

        <br />




        <div className="checkbox">
          <input
            style={{ marginBottom: "5px", margin : "0 5%" , width: "40%"  }}
            name="Account_Locked_Flag"
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
          <label for="Account Locked Flag" className="checkbox__label">
            Account Locked Flag
          </label>
        </div>


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
    
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={open}
        onClose={handleClose}
        message="Successfuly Added"
        autoHideDuration={1000}

      />
    
    </div>


  );
};

export default RolesForm;