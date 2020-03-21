import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const PurchaseOrderRow = (props) => {


	return (
		<TableRow key={props.row.name}>
      <TableCell component="th" scope="row">
        <InputLabel id="demo-simple-select-label">Select Item</InputLabel>
        <Select
					autoWidth
					labelWidth={1}        	
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </TableCell>
      <TableCell align="right">
      	<TextField 
      		id="standard-basic"
          margin="none"
      		disabled
      		defaultValue={props.row.calories}
       	/>
      </TableCell>
      <TableCell align="right">
      	<TextField 
      		id="standard-basic"
      		defaultValue={props.row.fat}
       	/>
      </TableCell>
      <TableCell align="right">
      	<TextField 
      		id="standard-basic"
      		defaultValue={props.row.carbs}
       	/>
      </TableCell>
      <TableCell align="right">
      	<TextField 
      		id="standard-basic"
      		defaultValue={props.row.protein}
       	/>
      </TableCell>
      <TableCell align="right">
      	<TextField 
      		id="standard-basic"
      		defaultValue={props.row.protein}
       	/>
      </TableCell>
      <TableCell align="right">
      	<TextField 
      		id="standard-basic"
      		defaultValue={props.row.protein}
       	/>
      </TableCell>
      <TableCell align="right">
      	<TextField 
      		id="standard-basic"
      		defaultValue={props.row.protein}
       	/>
      </TableCell>
      <TableCell align="right">
      	<TextField 
      		id="standard-basic"
      		defaultValue={props.row.protein}
       	/>
      </TableCell>
    </TableRow>
	)
}

export default PurchaseOrderRow