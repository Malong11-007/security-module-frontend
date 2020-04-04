import React,{ useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ReactTable from 'react-table-6';
import ReactModal from 'react-modal';
import Button from '@material-ui/core/Button';
import POModal from './PO_Modal';
import { customStyles } from '../../style.js';
import { remove_line } from '../../actions/PO_Actions.js';


const PurchaseOrderLine = (props) => {
	const dispatch = useDispatch();
	const { lines } = useSelector(state => state.PO)
	const [modal,showModal] = useState(false);
	
	// initializer
  useEffect(() => { 
    ReactModal.setAppElement('body')
  },[]) // eslint-disable-line


  const columns = [
    {
      Header: "ITEM",
      accessor: "Item_Name",
      sortable: true,
      filterable: false
    },
    {
      Header: "UOM",
      accessor: "UOM_Name",
      sortable: true,
      filterable: false
    },
    {
      Header: "QUANTITY",
      accessor: "quantity",
      sortable: true,
      filterable: false
    },
    {
      Header: "PRICE",
      accessor: "Price",
      sortable: true,
      filterable: false
    },
    {
      Header: "G.S.T %",
      accessor: "GST_Per",
      sortable: true,
      filterable: false
    },
    {
      Header: "G.S.T Amt",
      accessor: "GST_Amt",
      sortable: true,
      filterable: false
    },
    {
      Header: "W.H.T %",
      accessor: "WHT_Per",
      sortable: true,
      filterable: false
    },
    {
      Header: "W.H.T Amt",
      accessor: "WHT_Per",
      sortable: true,
      filterable: false
    },
    {
      Header: "TOTAL AMOUNT",
      accessor: "Total_Amt",
      sortable: true,
      filterable: false
    },
    {
      Header: 'Actions',
      Cell : props => { 
        return(
        	<i
						className="fas fa-trash table_buttons table_delete"
						onClick={() => dispatch(remove_line(props.original.Item_ID))}
					></i>
        )      
      },
      sortable: true,
      filterable: false,
    }
  ]
  return (
    <div>
      
      <div style={{ marginLeft: "90%", marginBottom: "10px" }}>
        <Button 
          variant="outlined" 
          color="primary"
          onClick={() => showModal(true)}
        >
          <i className="fas fa-plus" style={{ marginRight: "5px" }}></i>
          Add ITEM
        </Button>
      </div>

      <ReactTable
        data={lines}
        columns={columns}
        noDataText="no item"
        pageSize={10}
        showPagination={false}
      />
     	
      <ReactModal
      	isOpen={modal}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
          showModal(false)
        }}
        style={customStyles}
        ariaHideApp={true}
      >
      	<i
          className="fas fa-times table_buttons modal_cross"
          onClick={() => showModal(false)}
        ></i>
      	<POModal/>
      </ReactModal>

	   
    </div>
  );
}

export default PurchaseOrderLine


