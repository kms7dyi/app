
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'

import { PowerControl, ColorControl, EffectControl, WarmwhiteControl } from '../components/Controls'

import { sendCommand } from '../actions'

const styles = theme => ({
})

class Area extends React.Component {
  render() {
    const { servers, sendCommand } = this.props
    const { server, index } = this.props.match.params
    const area = servers[server].areas[index]

    const areaSendCommand = (command) => sendCommand({...command,
      url: servers[server].address,
      password: servers[server].password,
      scope: 'area',
      index, server
    })

    const sending = servers[server].command_sending

    return (
      <div>
        <Typography variant="h5">{area.name}</Typography>

        <PowerControl sending={sending} sendCommand={areaSendCommand} />
        <ColorControl sending={sending} sendCommand={areaSendCommand} />
        <EffectControl sending={sending} sendCommand={areaSendCommand} />
        <WarmwhiteControl sending={sending} sendCommand={areaSendCommand} />

      </div>
    )
  }
}

export default connect(state => ({ servers: state.servers }), { sendCommand })(withStyles(styles, { withTheme: true })(Area))
