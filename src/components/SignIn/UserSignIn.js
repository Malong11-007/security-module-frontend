import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form'
import API from "../../baseURL"; 
import swal from 'sweetalert';



      const useStyles = makeStyles(theme => ({
        
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));

      const UserSignIn = (props) => {
        const classes = useStyles();
        const { register, errors,  handleSubmit } = useForm()
       
        const onSubmit = data => {
          console.log(data);

          API.post("/login", data, {
            header: {
              "Content-Type": "application/json"
            }
          })
          
          .then(function(response) {
            console.log(response);
              // swal (Success)
                if(response.status === 200)
                {
                swal("Submited", "Your New User's Body Is Successfully Updated", "success");
                }
                //
                // swal (validate)
                else if(response.status === 403)
                {
                  swal("Not Submited", "Your New User's Body Is Missing Or Validate", "warning");
                }
                //
                // swal (error)
                else if(response.status === 400)
                {
                  swal("Not Submited", "Your New User's Body Is not Updated Successfully ", "error");
                }
                //
          })
          .catch(function(error) {
            console.log(error);
          });
        };
      
        
        
        return (
          <form onSubmit={handleSubmit(onSubmit)}>
                  <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                      <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                        Sign in
                      </Typography>
                      
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          inputRef={register({ required: true })}
                          autoComplete="email"
                          autoFocus
                        />
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          inputRef={register({ required: true })}
                          autoComplete="current-password"
                        />
                        <FormControlLabel
                          control={<Checkbox value="remember" color="primary" />}
                          label="Remember me"
                        />
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                        >
                          Sign In
                        </Button>
                        <Grid container>
                          <Grid item xs>
                            <Link href="#" variant="body2">
                              Forgot password?
                            </Link>
                          </Grid>
                          <Grid item>
                            <Link href="#" variant="body2">
                              {"Don't have an account? Sign Up"}
                            </Link>
                          </Grid>
                        </Grid>
             
            </div>
          
          </Container>
          </form>
  );
}

export default UserSignIn;