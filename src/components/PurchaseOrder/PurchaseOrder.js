import React from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PurchaseOrderTable from './PurchaseOrderTable.js';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const PurchaseOrder = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Typography variant="h3" component="h4" gutterBottom>
        PURCHASE ORDER
      </Typography>
      <Paper elevation={1} style={{margin:'0px 10%'}}>
      	<Grid container alignItems="center" justify="center">
	    		<Grid container alignItems="center" justify="center" spacing={4}>
						<Grid item xs={4}>
							<TextField
			          label="Normal"
			          fullWidth
			          size="small"
			          id="outlined-margin-normal"
			          defaultValue="Default Value"
			          margin="normal"
			          variant="standard"
			        />
			      </Grid>
						<Grid item xs={4}>
			      	<TextField
			          label="Normal"
			          fullWidth
			          size="small"
			          id="outlined-margin-normal"
			          defaultValue="Default Value"
			          margin="normal"
			          variant="standard"
			        />
		       	</Grid>
					</Grid>
					<Grid container alignItems="center" justify="center" spacing={4}>
						<Grid item xs={4}>
							<InputLabel id="demo-simple-select-label">Age</InputLabel>
			        <Select
			          labelId="demo-simple-select-label"
			          fullWidth
			          id="demo-simple-select"
			        >
			          <MenuItem value={10}>Ten</MenuItem>
			          <MenuItem value={20}>Twenty</MenuItem>
			          <MenuItem value={30}>Thirty</MenuItem>
			        </Select>
			      </Grid>
						<Grid item xs={4}>
		      		<InputLabel id="demo-simple-select-label">Age</InputLabel>
			        <Select
			          labelId="demo-simple-select-label"
			          fullWidth
			          id="demo-simple-select"
			        >
			          <MenuItem value={10}>Ten</MenuItem>
			          <MenuItem value={20}>Twenty</MenuItem>
			          <MenuItem value={30}>Thirty</MenuItem>
			        </Select>
		       	</Grid>
					</Grid>
					<Grid container alignItems="center" justify="center" spacing={4}>
						<Grid item xs={4}>
							<InputLabel id="demo-simple-select-label">Age</InputLabel>
			        <Select
			          labelId="demo-simple-select-label"
			          fullWidth
			          id="demo-simple-select"
			        >
			          <MenuItem value={10}>Ten</MenuItem>
			          <MenuItem value={20}>Twenty</MenuItem>
			          <MenuItem value={30}>Thirty</MenuItem>
			        </Select>
			      </Grid>
						<Grid item xs={4}>
			      	<TextField
			          label="Normal"
			          fullWidth
			          size="small"
			          id="outlined-margin-normal"
			          defaultValue="Default Value"
			          margin="normal"
			          variant="standard"
			        />
		       	</Grid>
					</Grid>
					<Grid container alignItems="center" justify="center" spacing={4}>
						<Grid item xs={4}>
							<TextField
			          label="Normal"
			          fullWidth
			          size="small"
			          id="outlined-margin-normal"
			          defaultValue="Default Value"
			          margin="normal"
			          variant="standard"
			        />
			      </Grid>
					</Grid>
      	</Grid>
			</Paper>
			<br/>
			<Grid style={{margin:'0px 5%'}}>
				<PurchaseOrderTable/>
			</Grid>
		</div>
	)
}

export default PurchaseOrder