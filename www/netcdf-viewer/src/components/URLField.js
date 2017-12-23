import React from 'react'
import { Input } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
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
    input: '',
    recent: [],
    buttonDisabled: false
  };

  inputChange = (value) => {
    this.setState({
      ...this.state,
      input: value
    })
  }

  buttonClick = (url) => {

    this.props.didStartExtract()

    axios.post(`${config.apiEndpoint}/netcdfextractor`, {
      url: url || this.state.input
    })
      .then(response => {

        if (response.data.source === "download") this.loadRecents()
        this.props.didFinishExtract(response.data)
        this.setState({ ...this.state, buttonDisabled: false })
      })
      .catch(err => {
        console.log(err)
      })
  }

  loadRecents = () => {
    axios.get(`${config.apiEndpoint}/netcdflist`)
      .then(response => {
        this.setState({ ...this.state, recent: response.data.list })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentWillMount() {
    this.loadRecents()
  }

  onRecentSelected = (url) => {
    this.setState({
      ...this.state,
      input: url,
      buttonDisabled: true
    })
    this.buttonClick(url)
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.history}>
          <Dropdown
            onChange={this.onRecentSelected}
            text='Recent'
          >
            <Dropdown.Menu>
              {this.state.recent.length > 0 ? this.state.recent.map(metadata => {
                return (
                  <Dropdown.Item
                    key={metadata.url}
                    text={metadata.url}
                    onClick={() => this.onRecentSelected(metadata.url)}
                  />)
              }) : <Dropdown.Item disabled text='there are no recent items' />}
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
          disabled={this.state.buttonDisabled}
          onClick={() => this.buttonClick()}
        >extract</Button>
      </div >
    )
  }
}

export default URLField
