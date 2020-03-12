import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
	return (
		<div style={{padding: '5px',marginTop: '10px'}}>
			<Typography variant="h6">OPTIONS</Typography>
			<List style={{textAlign:'center',margin:'0px 0px 0px 15px'}}>
				{
					props.options !== null && 
					props.options.map((item,index) => {
						return (
							<ListItem key={index}>
								<Link>
									<Typography>
										<strong>{item}</strong>
									</Typography>
								</Link>
							</ListItem>
						)
					})
				}
			</List>
		</div>
	)
}

export default Sidebar