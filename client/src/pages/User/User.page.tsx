import React, { ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import UserInfo from "src/components/UserInfo/UserInfo.component";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
}));

interface Props { }
const userDetails = {
  Email: "email address",
  FullName: "Full Name",
  Telephone: "telephone number",
  Address: "address",
  City: "city",
  Description: "description",
};

const ListItems = () =>
  Object.entries(userDetails).map((item) => {
    return (
      <ListItem>
        <ListItemText primary={item[0]} />
        <ListItemText secondary={item[1]} />
      </ListItem>
    );
  });

const User = (props: Props): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Avatar className={classes.orange}>UN</Avatar>
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
              User Info
            </Typography>
            <div className={classes.demo}>
              <UserInfo />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default User;
