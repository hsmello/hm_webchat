import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: props => props.width,
        },
    },
}));

export default function MyTextField(props) {
    const classes = useStyles(props);

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                value={props.value}
                id="outlined-basic"
                label={props.label}
                onChange={(e)=>{props.onChange(e.target.value)}}
                variant={props.variant}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && props.OnClickEnter) {
                      event.preventDefault();
                      props.OnClickEnter(event)
                  }
                }}
            />
        </form>
    );
}