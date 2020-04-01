import React,{ useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form'
import Box from '@material-ui/core/Box';
import { borders } from '@material-ui/system';
import API from '../../baseURL';
import CustomPagination from '../Pagination';
import ReactTable from 'react-table-6';
import ReactModal from 'react-modal';
import ApplicationForm from '../Application/ApplicationForm';
import Button from '@material-ui/core/Button';
import SearchBar from '../SearchBar.js';

import { makeStyles } from '@material-ui/core/styles';
import { customStyles } from '../../style.js'
import Grid from '@material-ui/core/Grid';
import { Card } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';



const PurchaseOrderHeader = (props) => {
 
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let CompletDate = year+'-'+month+'-'+date;

    const [Application,setApplication] = useState([]);
    const [showModalUpdate,setShowModalUpdate] = useState(false);
    const [showModalInsert,setShowModalInsert] = useState(false);
    const [suppliers,setSuppliers] = useState([]);
    const [departments,setdepartments] = useState([]);
    const [header , setHeader] = useState({
    "Status" : "y",
    "Created_By" : 1,
    "Creation_Date" : CompletDate ,
    "Last_Updated_Date" : CompletDate ,
    "Last_Updated_By" : 1 
    });
    
    const [rowCount,setRowCount] = useState(10);
    const [pageNumber,setPageNumber] = useState(1);
    const [record,setRecord] = useState();
    const [search,setSearch] = useState('');
    const { register, errors,  handleSubmit } = useForm()
    
    

    useEffect(() => {
        console.log(header);
    },[header])

    useEffect(() => { 
        ReactModal.setAppElement('body')
      
        // for supplier 
        API.get('/supplier/1')
        .then(response => {
          setSuppliers(response.data)
        })
        .catch(err => {
          console.log(err);
          return;
        })
        //
    
        // for department 
        API.get('/department/1')
        .then(response => {
          setdepartments(response.data)
        })
        .catch(err => {
          console.log(err);
          return;
        })
        //
    
        // console.log(Application)
      },[]) // eslint-disable-line

      const handleChange = event => {
        setSearch(event.target.value);
      };
    
      const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

     const handleDateChange = date => {
    setSelectedDate(date);
        setHeader({
            ...header,
            "PO_Date":date
        })
  };

  return (
    <div>
      
      {/* For Create */}
      <div style={{ marginLeft: "90%", marginBottom: "10px" }}>
        <Button 
          variant="outlined" 
          color="primary"
          onClick={() => setShowModalInsert(true)}
        >
          <i className="fas fa-plus" style={{ marginRight: "5px" }}></i>
          Create
        </Button>
      </div>
      {/* For Create  */}

      {/* For Label  */}
      <label 
      style={{fontSize : "24px" , marginLeft : "15%" }}>
        PURCHASE ORDER
      </label>
      {/* For Label */}

     
      {/* For Box */}
     
    {/*  */}
       
       <MuiPickersUtilsProvider utils={DateFnsUtils} >
        <KeyboardDatePicker
          style = {{width :"70%" ,  marginLeft : "15%"}}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            id="PO_Date"
            label="P.O Date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
       </MuiPickersUtilsProvider>

      {errors.PO_Date && errors.PO_Date.type === "required" && (
          <p className="form_error">
            {" "}
            <i className="fas fa-exclamation-triangle"></i> This field is required
          </p>
        )}
        {errors.PO_Date && errors.PO_Date.type === "maxLength" && (
          <p className="form_error"> Maximum Length Allowed is 250 </p>
        )} 
    
    {/*  */}
    {/*  */}
    
        <Autocomplete
          id="disable-portal"
          options={suppliers}
          getOptionLabel={option => option.Supplier_Name}
          onChange = {(event, values) => setHeader({ ...header, "Supplier_ID": values.Supplier_ID })}
          style={{  marginBottom: "5px", width: "70%" , margin : "0 15%" }}
          renderInput={params => <TextField {...params} label="Supplier" />}
        />
            {errors.Supplier && errors.Supplier.type === "required" && (
            <p className="form_error">
              {" "}
              <i className="fas fa-exclamation-triangle"></i> This field is required
            </p>
          )}
            {errors.Supplier && errors.Supplier.type === "maxLength" && (
            <p className="form_error"> Maximum Length Allowed is 250 </p>
          )}

    {/*  */}
    {/*  */}

        <Autocomplete
            id="disable-portal"
            options={PaymentType}
            getOptionLabel={option => option.title}
            style={{  marginBottom: "5px", width: "70%" , margin : "0 15%" }}
            onChange = {(event, values) => setHeader({ ...header, "Payment_Type": values.title })}
            renderInput={params => <TextField {...params} label="Payment Type" />}
          />
            {errors.Payment_Type && errors.Payment_Type.type === "required" && (
              <p className="form_error">
                {" "}
                <i className="fas fa-exclamation-triangle"></i> This field is required
              </p>
            )}
            {errors.Payment_Type && errors.Payment_Type.type === "maxLength" && (
              <p className="form_error"> Maximum Length Allowed is 250 </p>
            )} 
  {/*  */}
  {/*  */}
          <Autocomplete
                id="disable-portal"
                options={departments}
                getOptionLabel={option => option.Department_Name}
                onChange = {(event, values) => setHeader({ ...header, "Shift_To_ID": values.Department_ID })}
                style={{  marginBottom: "5px", width: "70%" , margin : "0 15%" }}
                renderInput={params => <TextField {...params} label="Ship To Location" />}
              />
              {errors.Ship_To_Location && errors.Ship_To_Location.type === "required" && (
              <p className="form_error">
                {" "}
                <i className="fas fa-exclamation-triangle"></i> This field is required
              </p>
            )}
              {errors.Ship_To_Location && errors.Ship_To_Location.type === "maxLength" && (
              <p className="form_error"> Maximum Length Allowed is 250 </p>
            )}
      
  {/*  */}
  {/*  */}
  <TextField
              id="standard-search"
              type="Search"
              name="RefNo"
              style={{ width: "70%" , margin : "0 15%" }}
              onChange = {(event) => setHeader({ ...header, "Ref_No": event.target.value })}
              defaultValue={props.type === "update" ? props.record.RefNo : ""}
              inputRef={register({ required: true, maxLength: 255 })}
              label="RefNo"
            />

          {errors.RefNo && errors.RefNo.type === "required" && (
            <p className="form_error">
              {" "}
              <i className="fas fa-exclamation-triangle"></i> This field is required
            </p>
          )}
          {errors.RefNo && errors.RefNo.type === "maxLength" && (
            <p className="form_error"> Maximum Length Allowed is 250 </p>
          )} 

  {/*  */}
  {/*  */}
            <TextField
              id="standard-search"
              type="Search"
              name="Remarks"
              style={{ marginBottom: "5px", width: "90%" , margin : "0 5% 5%"  }}
              onChange = {(event) => setHeader({ ...header, "Remarks": event.target.value })
             }
              defaultValue={props.type === "update" ? props.record.Remarks : ""}
              inputRef={register({ required: true, maxLength: 255 })}
              label="Remarks"
            />
              {errors.Remarks && errors.Remarks.type === "required" && (
              <p className="form_error">
                {" "}
                <i className="fas fa-exclamation-triangle"></i> This field is required
              </p>
            )}
              {errors.Remarks && errors.Remarks.type === "maxLength" && (
              <p className="form_error"> Maximum Length Allowed is 250 </p>
            )}

      {/* For Box */}
         </div>
  );
}

export default PurchaseOrderHeader

const PaymentType = [
  {title : 'Cash'},
  {title : 'Credit Card'},
  {title : 'Online Transfer'},
  {title : 'PayOrder'},
]