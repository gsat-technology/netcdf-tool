import React from 'react'
import { Icon, Label } from 'semantic-ui-react'

const Metadata = ({ metadata }) => {

  return (
    <Label>
      <Icon name='file outline' /> {metadata.filesize}
    </Label>
  )
}

export default Metadata
