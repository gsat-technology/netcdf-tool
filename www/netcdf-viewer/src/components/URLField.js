import React from 'react'
import { Input } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import { Checkbox } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios'
import config from '../config'



const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px'
  },
  input: {
    width: '600px',
    marginRight: '5px',
    marginLeft: '10px'
  },
  history: {
    paddingTop: '5px'
  }
}

class URLField extends React.Component {

  state = {
    //input: 'https://www.unidata.ucar.edu/software/netcdf/examples/sresa1b_ncar_ccsm3-example.nc',
    input: ''
  };

  inputChange = (value) => {
    this.setState({
      input: value,
    })
  }

  buttonClick = () => {
    axios.post(`${config.apiEndpoint}/netcdfextractor`, {
      url: this.state.input
    })
      .then(response => {
        this.props.handleExtract(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.history}>
          <Dropdown text='Recent'>
            <Dropdown.Menu>
              <Dropdown.Item text='New' />

            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Input
          value={this.state.input}
          onChange={(event) => this.inputChange(event.target.value)}
          style={styles.input}
          fluid
          label='URL'
          labelPosition='left'
          placeholder='location of NetCDF file'
        />
        <Button
          onClick={this.buttonClick}
        >extract</Button>
      </div>
    )
  }
}

export default URLField
