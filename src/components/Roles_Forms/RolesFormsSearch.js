import React,{ useState, useEffect } from 'react'
import API from '../../baseURL';
import CustomPagination from '../Pagination';
import ReactTable from 'react-table-6';
import ReactModal from 'react-modal';
import RolesFormsForm from './RolesFormsForm';
import Button from '@material-ui/core/Button';
import SearchBar from '../SearchBar.js';
import { customStyles } from '../../style.js'
import swal from 'sweetalert';

const RolesFormsSearch = () => {
  const [RolesForms,setRolesForms] = useState([]);
  const [showModalUpdate,setShowModalUpdate] = useState(false);
  const [showModalInsert,setShowModalInsert] = useState(false);
  const [rowCount,setRowCount] = useState(10);
  const [pageNumber,setPageNumber] = useState(1);
  const [record,setRecord] = useState();
  const [search,setSearch] = useState('');

  const columns = [
    {
      Header: 'Role_ID',
      accessor: 'Role_ID',
      sortable: true,
      filterable: false,
    },
    {
      Header: 'Form_ID',
      accessor: 'Form_ID',
      sortable: true,
      filterable: false,
    },
    {
      Header: 'Enabled Flag',
      accessor: 'Enabled_Flag',
      sortable: true,
      filterable: false,
      
    },
    {
        Header: 'Actions',
        Cell : props =>
        {return(
          <div style={{ textAlign: "center" }}>
						<i
							className="fas fa-edit table_buttons table_edit"
							onClick={() => {
								setRecord(props.original);
								setShowModalUpdate(true);
							}}
						></i>
						<i
							className="fas fa-trash table_buttons table_delete"
							onClick={() => onDelete(props.original)}
						></i>
					</div>
          )      
        },
        sortable: true,
      filterable: false,
      }
  ]
 
  const getRolesForms = () => {
  	console.log(pageNumber)
    API.get(`/roles-forms/get?limit=${rowCount}&page=${pageNumber}&search=${search}` , {
      headers:{
        "Content-Type" : "application/json"
      }
    })
    .then(response => {
      // console.log(responce.data);
      if(response.data.results !== RolesForms){
        setRolesForms(response.data) 
      }
      // console.log(response.data.results)
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  const onDelete = (item) => {
  	console.log(item)
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
       API.delete(`/roles-forms/delete/${item.Role_Form_ID}`,{
          header: {
            "Content-Type": "application/json"
          }
        })
        .then(function(response) {
          console.log(response);
          getRolesForms();
          
        })
        .catch(function(error) {
          console.log(error);
          // swal (validate)
      if(error.status === 403)
      {
        swal("Not Deleted", "Your New Application's Body Is Missing Or Validate", "warning");
      }                                                                                                      
      //
      // swal (error)
      else if(error.status === 403)
      {
        swal("Not Deleted", "Your New Application's Body Is not Deleted Successfully ", "error");
      }
      //
        });
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });

  
  }

	// initializer
  useEffect(() => { 
    ReactModal.setAppElement('body')
    getRolesForms()
    // console.log(Application)
  },[]) // eslint-disable-line

  //Checks for change in rowCount and PageNumber
  useEffect(() => {
  	// console.log(Application)
  	getRolesForms()
  }, [rowCount,pageNumber]) // eslint-disable-line

  //search bar change handler
  const handleChange = event => {
    setSearch(event.target.value);
  };

  return (
    <div>
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

      <SearchBar search={search} handleChange={handleChange} onSearch={getRolesForms}/>
      <ReactTable
        data={RolesForms.results}
        columns={columns}
        noDataText={"Loading..."}
        showPagination={false}
        pageSize={rowCount}
        onPageSizeChange={(size) => {
        	setRowCount(size)
        }}
      />

      <CustomPagination
      	rowCount={rowCount}
      	setRowCount={setRowCount}
      	pageNumber={pageNumber}
      	setPageNumber={setPageNumber}
      	totalPages={RolesForms.totalPages}
      	newPage={getRolesForms}
      />

      {/* Modal for Update */}
      <ReactModal
        isOpen={showModalUpdate}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
          setShowModalUpdate(false);
          setRecord(null);
          getRolesForms();
        }}
        style={customStyles}
        ariaHideApp={true}
      >
        <div>
          <i
            className="fas fa-times table_buttons modal_cross"
            onClick={() => setShowModalUpdate(false)}
          ></i>
          <RolesFormsForm
            type="update"
            record={record}
            onClose={setShowModalUpdate}
            getRolesForms={getRolesForms}
          />
          
        </div>
      </ReactModal>
      
      {/* Modal for Insert */}
      <ReactModal
        isOpen={showModalInsert}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
          setShowModalInsert(false);
          getRolesForms();
        }}
        style={customStyles}
        ariaHideApp={true}
      >
        <div>
          <i
            className="fas fa-times table_buttons modal_cross"
            onClick={() => setShowModalInsert(false)}
          ></i>
          <RolesFormsForm
            type="insert"
            onClose={setShowModalInsert}
            getRolesForms={getRolesForms}
          />
        </div>
      </ReactModal> 
    </div>
  )
}



export default RolesFormsSearch