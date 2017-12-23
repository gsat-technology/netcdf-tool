import React, { Component } from 'react'
import './App.css'
import URLField from './components/URLField'
import { Grid, Transition } from 'semantic-ui-react'
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
    header: 'enter a url for a netcdf file or select from recents',
    metadata: null,
    animationVisibility: true
  };

  didFinishExtract = (data) => {

    axios.get(data.locations.header)
      .then(response => {
        this.setState({ ...this.state, header: response.data })

        axios.get(data.locations.metadata)
          .then(response => {
            this.setState({ ...this.state, metadata: response.data, animationVisibility: true })
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  didStartExtract = () => {
    this.setState({
      ...this.state,
      animationVisibility: false
    })
  }

  render() {

    return (
      <Grid columns='equal'>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column width={15}>
          <URLField
            didFinishExtract={this.didFinishExtract}
            didStartExtract={this.didStartExtract}
          />

          <Transition
            visible={this.state.animationVisibility}
            animation='horizontal flip'
            duration={1000}
          >
            <div>
              <div style={styles.metadata}>
                <Metadata metadata={this.state.metadata} />
              </div>
              <HeaderContainer headerText={this.state.header} />
            </div>
          </Transition>
        </Grid.Column>
        <Grid.Column>
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
