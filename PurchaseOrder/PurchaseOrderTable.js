import React from 'react'
// import MaterialTable from 'material-table';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PurchaseOrderRow from './PurchaseOrderRow.js';

const PurchaseOrderTable = () => {
	function createData(name, calories, fat, carbs, protein) {
  	return { name, calories, fat, carbs, protein };
	}

	const rows = [
	  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	  createData('Eclair', 262, 16.0, 24, 6.0),
	  createData('Cupcake', 305, 3.7, 67, 4.3),
	  createData('Gingerbread', 356, 16.0, 49, 3.9),
	];


	return (
		<TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) =>  <PurchaseOrderRow row={row} key={index}/>)}
        </TableBody>
      </Table>
    </TableContainer>
	)
}

export default PurchaseOrderTable