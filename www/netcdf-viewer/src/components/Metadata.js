import React from 'react'
import { Icon, Label } from 'semantic-ui-react'

const Metadata = ({ metadata }) => {

  if (metadata !== null) {
    return (
      <Label>
        <Icon name='file outline' />{metadata.filesize}
      </Label>
    )
  } else {
    return null
  }
}

export default Metadata
