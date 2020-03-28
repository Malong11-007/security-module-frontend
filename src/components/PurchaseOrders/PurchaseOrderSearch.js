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




const PurchaseOrderSearch = (props) => {
 
  const [Application,setApplication] = useState([]);
  const [showModalUpdate,setShowModalUpdate] = useState(false);
  const [showModalInsert,setShowModalInsert] = useState(false);
  const [rowCount,setRowCount] = useState(10);
  const [pageNumber,setPageNumber] = useState(1);
  const [record,setRecord] = useState();
  const [search,setSearch] = useState('');
  const { register, errors,  handleSubmit } = useForm()


  const columns = [
    {
      Header: "ITEM",
      accessor: "ITEM",
      sortable: true,
      filterable: false
    },
    {
      Header: "UOM",
      accessor: "UOM",
      sortable: true,
      filterable: false
    },
    {
      Header: "QUANTITY",
      accessor: "QUANTITY",
      sortable: true,
      filterable: false
    },
    {
      Header: "PRICE",
      accessor: "PRICE",
      sortable: true,
      filterable: false
    },
    {
      Header: "G.S.T %",
      accessor: "G.S.T%",
      sortable: true,
      filterable: false
    },
    {
      Header: "G.S.T Amt",
      accessor: "G.S.T_Amt",
      sortable: true,
      filterable: false
    },
    {
      Header: "W.H.T %",
      accessor: "W.H.T%",
      sortable: true,
      filterable: false
    },
    {
      Header: "W.H.T Amt",
      accessor: "W.H.T_Amt",
      sortable: true,
      filterable: false
    },
    {
      Header: "TOTAL AMOUNT",
      accessor: "TOTAL_AMOUNT",
      sortable: true,
      filterable: false
    },
    {
      Header: "Actions",
      Cell: props => {
        return (
          <div style={{ textAlign: "center" }}>
            <i
              className="fas fa-edit table_buttons table_edit"
              onClick={() => {
                setRecord(props.original);
                setShowModalUpdate(true);
              }}
            >
            </i>
            <i
              className="fas fa-trash table_buttons table_delete"
              onClick={() => onDelete(props.original)}
            >
            </i>
          </div>
        );
      },
      sortable: true,
      filterable: false
    }
  ]

  

  const onDelete = (item) => {
  	console.log(item)
    if (window.confirm("Are You Sure Want To Delete This Application") === true) {
      API.delete(`/application/delete/${item.Application_ID}`,{
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
    } else {
      return;
    }
  }

	// initializer
  useEffect(() => { 
    ReactModal.setAppElement('body')
    
    // console.log(Application)
  },[]) // eslint-disable-line

  //Checks for change in rowCount and PageNumber
  useEffect(() => {
  	// console.log(Application)
  
  }, [rowCount,pageNumber]) // eslint-disable-line


  //search bar change handler
  const handleChange = event => {
    setSearch(event.target.value);
  };

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = date => {
    setSelectedDate(date);
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
          options={SupplierType}
          getOptionLabel={option => option.title}
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
                options={top100Films}
                getOptionLabel={option => option.title}
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

      
      
      {/* React Table */}
      <ReactTable
        data={Application.results}
        columns={columns}
        noDataText={"Loading..."}
        showPagination={false}
        pageSize={rowCount}
        onPageSizeChange={(size) => {
        	setRowCount(size)
        }}
      />
      {/* React Table */}

      {/* pagination */}
      <CustomPagination
      	rowCount={rowCount}
      	setRowCount={setRowCount}
      	pageNumber={pageNumber}
      	setPageNumber={setPageNumber}
      	totalPages={Application.totalPages}
      	
      />
        {/* pagination */}

        {/* For Total_Label  */}
              <label 
                    style={{fontSize : "15px" , fontWeight: "bold" , marginLeft : "75%" , marginRight : "15%" }}>
                      Total                               
              </label>
              <label 
                    style={{fontSize : "15px" , fontWeight: "-moz-initial" }}>
                        XXXXXXXXXX
              </label>


        {/* For Total_Label */}


      {/* Modal for Update */}
      <ReactModal
        isOpen={showModalUpdate}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
          setShowModalUpdate(false);
          setRecord(null);
          
        }}
        style={customStyles}
        ariaHideApp={true}
      >
        <div>
          <i
            className="fas fa-times table_buttons modal_cross"
            onClick={() => setShowModalUpdate(false)}
          ></i>
          <ApplicationForm
            type="update"
            record={record}
            onClose={setShowModalUpdate}
            
          />
          
        </div>
      </ReactModal>
      
      {/* Modal for Insert */}
      <ReactModal
        isOpen={showModalInsert}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
          setShowModalInsert(false);
        
        }}
        style={customStyles}
        ariaHideApp={true}
      >
        <div>
          <i
            className="fas fa-times table_buttons modal_cross"
            onClick={() => setShowModalInsert(false)}
          ></i>
          <ApplicationForm
            type="insert"
            onClose={setShowModalInsert}
         
          />
        </div>
      </ReactModal>
    </div>
  );
}

export default PurchaseOrderSearch

const PaymentType = [
  {title : 'Cash'},
  {title : 'Credit Card'},
  {title : 'Online Transfer'},
  {title : 'PayOrder'},
]
const SupplierType = [
  {title : 'Trading Companies'},
  {title : 'Manufacturers '},
  {title : 'Wholesalers'},
]

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
];