import React,{ useState, useEffect } from "react";
import { useForm } from 'react-hook-form'
import API from "../../baseURL"; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';

const PurchaseInsertModal = (props) => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let CompletDate = year+'-'+month+'-'+date;

  const { register, errors,  handleSubmit } = useForm()
  const [items,setItems] = useState([]);
  const onSubmit = data => {
   
     //Post
     API.post("/application/post", data, {
        header: {
          "Content-Type": "application/json"
        }
      })
      .then(function(response) {
        // console.log(response);
        props.onClose(false);
        props.getApplications();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

//foritems
useEffect(() => { 
   // for department 
    API.get('/item/1')
    .then(response => {
      setItems(response.data)
    })
    .catch(err => {
      console.log(err);
      return;
    })
    //

    // console.log(Application)
  },[]) // eslint-disable-line


 //ForInsert
  const OnInsert = data => {
    
    data["Enabled_Flag"] = data.Enabled_Flag === true ? '1' : '0' // converting Enabled_Flag from boolean to String
    data["Created_By"] = 1;
    data["Creation_Date"] = CompletDate;
    data["Last_Updated_Date"] = CompletDate;
    data["Last_Updated_By"] = 1;
    // console.log(data);

   
  };

  
 
  return (
  	<Grid 
  		justify="center"
  	>
  			<form onSubmit={handleSubmit(onSubmit)} style={{minWidth:'100%'}}>
				  <p style={{ color: "#4252a7", textAlign:'center' }} className="h4 text-left py-4">
				    ITEM SELECTION
				  </p>

                  <Autocomplete
                    id="disable-portal"
                    options={items}
                    getOptionLabel={option => option.Item_Name}
                    onChange = {(event, values) => console.log(values)}
                    style={{  marginBottom: "5px" }}
                    renderInput={params => <TextField name = "Item_List" {...params} label="Item List" />}
                    />
                        {errors.Item_List && errors.Item_List.type === "required" && (
                        <p className="form_error_PIM">
                        {" "}
                        <i className="fas fa-exclamation-triangle"></i> This field is required
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
				  {errors.item_Quantity &&
				    errors.item_Quantity.type === "required" && (
				      <p className="form_error_PIM">
				        {" "}
				        <i className="fas fa-exclamation-triangle"></i> This field is required
				      </p>
				    )}
				  {errors.item_Quantity &&
				    errors.item_Quantity.type === "maxLength" && (
				      <p className="form_error_PIM"> Maximum Length Allowed is 250 </p>
				    )}

				  <br />

				  <div>
				    <Button color="primary" variant="contained" type="submit" style={{ marginBottom : "5px" , marginTop : "50px" , marginLeft : "45%" }}>
				      {/* {props.type === "insert" ? "Register" : "Update"} */}
                        ADD ITEM
				    </Button>
				  </div>
				</form>
  	</Grid>
		
  );
};

export default PurchaseInsertModal;

