import React from 'react'
import Sidebar from './Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import ApplicationSearch from './Application/ApplicationSearch'
import RolesSearch from './Roles/RolesSearch'
import RolesFormsSearch from './Roles_Forms/RolesFormsSearch'
import RolesModulesSearch from './Roles_Modules/RolesModulesSearch'
import UserRolesSearch from './User_Roles/UserRolesSearch'
import UsersSearch from './Users/UsersSearch'

//Sample List for Demonstration, later will be fetched from redux store

const formSelector = (form_name) => {
	 switch (form_name) {
  	case 'Application':
  		return <ApplicationSearch/>

  	case 'Roles':
  		return <RolesSearch/>

		case 'Roles Forms':
			return <RolesFormsSearch/>

		case 'Roles Modules':
			return <RolesModulesSearch/>

		case 'User Roles':
			return <UserRolesSearch/>

		case 'Users':
			return <UsersSearch/>

    default:
      return null;
  }
};

 

// Sidebar and Search Styling to be done
const SamplePage = () => {
	const dispatch = useDispatch();
	const { formSelected } = useSelector(state => state.user);

	return (
		<div style={{padding:'10px'}}>
			<Grid container>
				<Grid item xs={2}>
					<Sidebar/>
				</Grid>
				<Grid item xs={10}>
					{
						formSelector(formSelected)
					}
				</Grid>
			</Grid>
		</div>
	)
}

export default SamplePage