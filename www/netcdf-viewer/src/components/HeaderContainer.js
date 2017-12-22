import React from 'react'
import { Container } from 'semantic-ui-react'

const styles = {
    container: {
        marginTop: '20px',
        backgroundColor: '#555555',
        color: 'white',
        borderRadius: '5px'
    },
    pre: {
        fontSize: '10px',
        padding: '10px 10px 10px 10px'
    }
}

const HeaderContainer = ({ headerText }) => (
    <div>
        <Container style={styles.container} text>
            <pre style={styles.pre}>{headerText}</pre>
        </Container>
    </div>
)

export default HeaderContainer
