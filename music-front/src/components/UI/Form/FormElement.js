import React from 'react'
import { Grid, MenuItem, TextField } from '@material-ui/core';
import PropTypes from 'prop-types'

const FormElement = ({name, label, required, onChange, select, options, multiline, rows, error, type, value}) => {
  let inputChildren = null
  if(select){
    inputChildren = options.map((option) => (
      <MenuItem key={option._id} value={option._id}>
        {option.title}
      </MenuItem>
    ))
  }  
  return (
        <Grid item xs={12}>
              <TextField
                autoComplete={name}
                name={name}
                variant="outlined"
                required={required}
                fullWidth
                id={name}
                label={label}
                type={type}
                select={select}
                value={value}
                rows={rows}
                multiline={multiline}
                onChange={onChange}
                error={!!error}
                helperText={error}
              > {inputChildren} </TextField>
            </Grid>
    )
}
FormElement.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    type: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    value: PropTypes.string,
    error: PropTypes.string,
}

export default FormElement
