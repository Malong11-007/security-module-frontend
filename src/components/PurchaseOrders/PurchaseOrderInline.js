import React,{ useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form'
import Box from '@material-ui/core/Box';
import { borders } from '@material-ui/system';
import API from '../../baseURL';
import CustomPagination from '../Pagination';
import ReactTable from 'react-table-6';
import ReactModal from 'react-modal';
import ApplicationForm from './PurchaseInsertModal';
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



const PurchaseOrderSearch = (props) => {
 
  const [Application,setApplication] = useState([]);
  const [showModalUpdate,setShowModalUpdate] = useState(false);
  const [showModalInsert,setShowModalInsert] = useState(false);
  const [suppliers,setSuppliers] = useState([]);
  const [departments,setdepartments] = useState([]);
  
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
          Add ITEM
        </Button>
      </div>
      {/* For Create  */}

     

     
      
      
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

