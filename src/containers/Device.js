
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'

import { PowerControl, ColorControl, EffectControl, WarmwhiteControl } from '../components/Controls'

import { sendCommand } from '../actions'

const styles = theme => ({
})

class Device extends React.Component {
  render() {
    const { servers, sendCommand } = this.props
    const { server, index } = this.props.match.params
    const device = servers[server].devices[index]

    const deviceSendCommand = (command) => sendCommand({...command,
      url: servers[server].address,
      password: servers[server].password,
      scope: 'device',
      index, server
    })

    const sending = servers[server].command_sending

    return (
      <div>
        <Typography variant="h5">{device.name}</Typography>

        {device.caps.indexOf('power') !== -1 ? (
          <PowerControl sending={sending} sendCommand={deviceSendCommand} />
        ) : ( <div /> )}

        {device.caps.indexOf('color') !== -1 ? (
          <ColorControl sending={sending} sendCommand={deviceSendCommand} />
        ) : ( <div /> )}

        {device.caps.indexOf('effect') !== -1 ? (
          <EffectControl sending={sending} sendCommand={deviceSendCommand} />
        ) : ( <div /> )}

        {device.caps.indexOf('warmwhite') !== -1 ? (
          <WarmwhiteControl sending={sending} sendCommand={deviceSendCommand} />
        ) : ( <div /> )}

      </div>
    )
  }
}

export default connect(state => ({ servers: state.servers }), { sendCommand })(withStyles(styles, { withTheme: true })(Device))
