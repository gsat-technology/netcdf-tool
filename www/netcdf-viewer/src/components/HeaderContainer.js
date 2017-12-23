import React from 'react'
import { Container } from 'semantic-ui-react'

const styles = {
  container: {
    marginTop: '20px',
    backgroundColor: '#555555',
    color: 'white',
    borderRadius: '5px',
    height: '100%'
  },
  pre: {
    fontSize: '10px',
    padding: '10px 10px 10px 10px'
  }
}

class HeaderContainer extends React.Component {

  render() {

    return (
      <div>
        <Container style={styles.container} text>
          <pre style={styles.pre}>{this.props.headerText}</pre>
        </Container>
      </div>
    )
  }
}

export default HeaderContainer
