import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { select_form } from '../actions/userActions.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';



const Sidebar = (props) => {
	const dispatch = useDispatch();
	const { forms, modules } = useSelector(state => state.user);

	return (
		<div style={{padding: '5px',marginTop: '10px'}}>
			<Typography variant="h6">OPTIONS</Typography>
			<List style={{textAlign:'center',margin:'0px 0px 0px 15px'}}>
				{
					modules !== null && 
					modules.map((module,index) => {
						return (
							<ExpansionPanel>
				        <ExpansionPanelSummary
				          aria-controls={`module+${index}`}
				          id="panel1a-header"
				        >
				          <Typography>{module.Module_Name}</Typography>
				        </ExpansionPanelSummary>
				        <ExpansionPanelDetails>
				        	<List>
					        	{
					        		forms.filter(form => form.Module_ID === module.Module_ID)
					        			.map((form,index) => <ListItem key={index} onClick={() => dispatch(select_form(form.Form_Name))}>{form.Form_Name}</ListItem>)
					        	}
				        	</List>
				        </ExpansionPanelDetails>
				      </ExpansionPanel>
						)
					})
				}
			</List>
		</div>
	)
}

export default Sidebar