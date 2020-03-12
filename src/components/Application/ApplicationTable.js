import React,{ useState, useEffect } from 'react'
import API from '../../baseURL';
import CustomPagination from '../Pagination';
import ReactTable from 'react-table-6';
import ReactModal from 'react-modal';
import ApplicationForm from './ApplicationForm';
import Button from '@material-ui/core/Button';
import SearchBar from '../SearchBar.js';

const ApplicationTable = () => {
  const [Application,setApplication] = useState([]);
  const [showModalUpdate,setShowModalUpdate] = useState(false);
  const [showModalInsert,setShowModalInsert] = useState(false);
  const [rowCount,setRowCount] = useState(10);
  const [pageNumber,setPageNumber] = useState(1);
  const [record,setRecord] = useState();
  const [search,setSearch] = useState('');

  const columns = [
    {
      Header: "Application Name",
      accessor: "Application_Name",
      sortable: true,
      filterable: false
    },
    {
      Header: "Application Short Name ",
      accessor: "Application_Short_Name",
      sortable: true,
      filterable: false
    },
    {
      Header: "Application Description",
      accessor: "Application_Desc",
      sortable: true,
      filterable: false
    },
    {
      Header: "Enabled Flag",
      accessor: "Enabled_Flag",
      sortable: true,
      filterable: false
    },
    {
      Header: "Actions",
      Cell: props => {
        return (
          <div style={{ textAlign: "center" }}>
            <i
              className="fas fa-edit"
              style={{
                color: "#007bff",
                fontSize: "1.2rem",
                margin: "0px 15px"
              }}
              onClick={() => {
                setRecord(props.original);
                setShowModalUpdate(true);
              }}
            >
            </i>
            <i
              className="fas fa-trash"
              style={{
                color: "#dc3545",
                fontSize: "1.2rem",
                margin: "0px 15px"
              }}
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

  const getApplications = () => {
  	console.log(pageNumber)
    API.get(`/application/get?limit=${rowCount}&page=${pageNumber}&search=${search}` , {
      headers:{
        "Content-Type" : "application/json"
      }
    })
    .then(response => {
      // console.log(responce.data);
      if(response.data.results !== Application){
        setApplication(response.data) 
      }
      // console.log(response.data.results)
    })
    .catch(err => {
      console.log(err);
    })
  }

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
        getApplications();
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
    getApplications()
    // console.log(Application)
  },[]) // eslint-disable-line

  //Checks for change in rowCount and PageNumber
  useEffect(() => {
  	// console.log(Application)
  	getApplications()
  }, [rowCount,pageNumber]) // eslint-disable-line


  //search bar change handler
  const handleChange = event => {
    setSearch(event.target.value);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "60%",
      transform: "translate(-50%, -50%)"
    }
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

      <SearchBar search={search} handleChange={handleChange} onSearch={getApplications}/>
      
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
      <CustomPagination
      	rowCount={rowCount}
      	setRowCount={setRowCount}
      	pageNumber={pageNumber}
      	setPageNumber={setPageNumber}
      	totalPages={Application.totalPages}
      	newPage={getApplications}
      />

      {/* Modal for Update */}
      <ReactModal
        isOpen={showModalUpdate}
        onRequestClose={() => {
          setShowModalUpdate(false);
          setRecord(null);
          getApplications();
        }}
        style={customStyles}
        ariaHideApp={true}
      >
        <div>
          <i
            className="fas fa-times"
            style={{
              color: "#007bff",
              fontSize: "1.2rem",
              margin: "0px 15px",
              marginLeft: "96%"
            }}
            onClick={() => setShowModalUpdate(false)}
          ></i>
          <ApplicationForm
            type="update"
            record={record}
            onClose={setShowModalUpdate}
            getApplications={getApplications}
          />
          
        </div>
      </ReactModal>
      
      {/* Modal for Insert */}
      <ReactModal
        isOpen={showModalInsert}
        onRequestClose={() => {
          setShowModalInsert(false);
          getApplications();
        }}
        style={customStyles}
        ariaHideApp={true}
      >
        <div>
          <i
            className="fas fa-times"
            style={{
              color: "#007bff",
              fontSize: "1.2rem",
              margin: "0px 15px",
              marginLeft: "96%"
            }}
            onClick={() => setShowModalInsert(false)}
          ></i>
          <ApplicationForm
            type="insert"
            onClose={setShowModalInsert}
            getApplications={getApplications}
          />
        </div>
      </ReactModal>
    </div>
  );
}



export default ApplicationTable