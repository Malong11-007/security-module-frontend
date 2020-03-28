import React from 'react'
import Sidebar from './Sidebar';
import ApplicationTable from './Application/ApplicationTable.js'
import Grid from '@material-ui/core/Grid';


//Sample List for Demonstration, later will be fetched from redux store
const list = [
	'Option1',
	'Option2',
	'Option3',
	'Option4',
	'Option5',
]


// Sidebar and Table Styling to be done
const SamplePage = () => {
	return (
		<div style={{padding:'10px'}}>
			<Grid container>
				<Grid item xs={2}>
					<Sidebar options={list}/>
				</Grid>
				<Grid item xs={10}>
					<ApplicationTable/>
				</Grid>
			</Grid>
		</div>
	)
}

export default SamplePage