import React, { Component } from 'react'
import './App.css'
import URLField from './components/URLField'
import { Grid } from 'semantic-ui-react'
import HeaderContainer from './components/HeaderContainer'
import axios from 'axios'
import Metadata from './components/Metadata'

const styles = {
  metadata: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px'
  }
}

class App extends Component {

  state = {
    header: null,
    metadata: null
  };

  handleExtract = (data) => {

    axios.get(data.locations.header)
      .then(response => {
        this.setState({ header: response.data })

        axios.get(data.locations.metadata)
          .then(response => {
            this.setState({ metadata: response.data })
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <Grid columns='equal'>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column width={15}>
          <URLField handleExtract={this.handleExtract} />
          <div style={styles.metadata}>
            {this.state.metadata !== null ? <Metadata metadata={this.state.metadata} /> : null}
          </div>
          {this.state.header !== null ? <HeaderContainer headerText={this.state.header} /> : null}
        </Grid.Column>
        <Grid.Column>
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
