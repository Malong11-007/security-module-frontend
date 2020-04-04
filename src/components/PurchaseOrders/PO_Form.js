import React, { useState, useEffect } from 'react'
import POHeader from './PO_Header'
import POLine from './PO_Line.js';
import API from "../../baseURL";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from 'react-redux';
import { clear_lines } from '../../actions/PO_Actions.js';
import swal from 'sweetalert';


const PO_Form = () => {
	const dispatch = useDispatch();
	const { lines } = useSelector(state => state.PO);
	const [total,setTotal] = useState();
	const [header,setHeader] = useState({});

	const getTotal = () => {
		let tempTotal = 0;
		lines.forEach((line,item) => {
			tempTotal= tempTotal+parseInt(line.Total_Amt)
		})
		setTotal(tempTotal);
	}

	useEffect(() => {
		getTotal()
	}, [lines]) // eslint-disable-line
 
 	const getHeaderInfo = (header) => {
 		setHeader(header)
 	}

 	const onSubmitPO = () => {
 		if(lines.length !== 0){
 			API.post('/purchase-order/add',{lines,header},{
 				header:'application/json'
 			})
 			.then(response => {
 				const { status, data } = response;
 				console.log(data)
 				if(status)
 					swal("Purchase Order Created", {
 						buttons :{
 							clear: {
 								text:"Clear Form",
 								value:'clear'
 							},
 							leave:{
 								text:"Leave",
 								value:'Leave'
 							}
 						}
 					})
 					.then(value => {
 						switch (value) {
					    case "clear":
					    	dispatch(clear_lines())
					      swal("Form Cleared");
					      break;
					 
					    case "leave":
					      break;
					 
					    default:
					    break;    
				  	}
 					})
 				
 			})
 			.catch(error => {
 				if(error.response.status === 400 ||error.response.status === 403){
 					swal("Purchase Order failed", "error");
 				}
 			})
 		}
 		console.log({
 			lines,
 			header
 		})
 	}

	return (
		<div>
			<POHeader sendHeaderInfo={getHeaderInfo} />
			<POLine/>
			<label style={{fontSize : "15px" , fontWeight: "bold" , marginLeft : "75%" , marginRight : "15%" }}>
	      Total                               
	    </label>
	    <label style={{fontSize : "15px" , fontWeight: "-moz-initial" }} >
	    	{total}
	    </label>

			<Button 
				style={{marginLeft:'90%'}}
				variant="contained" 
				onClick={() => onSubmitPO()}
				color="primary"
			>
        Submit
      </Button>
		</div>
	)
}

export default PO_Form