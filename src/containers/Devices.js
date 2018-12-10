
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { loadDevices } from '../actions'
import { CircularProgress, MenuList, MenuItem, ListItemIcon, ListItemText, Chip } from '@material-ui/core'
import HighlightIcon from '@material-ui/icons/Highlight'
import Link from 'react-router-dom/Link'

const styles = theme => ({
  server: {
    marginTop: theme.spacing.unit * 2
  },
  error: {
    color: 'red'
  },
  menuItem: {
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3
  },
  chip: {
    marginLeft: theme.spacing.unit,
    fontSize: '70%'
  }
})

const capToText = (cap) => {
  switch(cap) {
    case 'power':
      return 'An/Aus'
    case 'color':
      return 'Farbe'
    case 'effect':
      return 'Effekte'
    case 'warmwhite':
      return 'Warmweiß'
    default:
      return cap
  }
}

const _DeviceItem = (props) => (
  <MenuItem className={props.classes.menuItem} component={Link} to={`/device/${props.server}/${props.index}`}>
    <ListItemIcon>
      <HighlightIcon />
    </ListItemIcon>
    <ListItemText primary={props.name} secondary={
      <React.Fragment>
        {props.address}
        {props.caps.map((cap, index) => (
          <Chip component="span" key={index} label={capToText(cap)} className={props.classes.chip} color="secondary" />
        ))}
      </React.Fragment>
    } />
  </MenuItem>
)

const DeviceItem = withStyles(styles, { withTheme: true })(_DeviceItem)

class Devices extends React.Component {
  componentWillMount() {
    const { servers, loadDevices } = this.props

    for(const [index, server] of servers.entries()) {
      loadDevices({
        server: index,
        url: server.address,
        password: server.password
      })
    }
  }

  render() {
    const { servers, classes } = this.props
    return (
      <div>
        <Typography variant="h5">
          Geräte
        </Typography>
        {servers.map((server, index) => (
          <div className={classes.server} key={index}>
            <Typography variant="h6" className={classes.server}>{server.name}</Typography>
            { server.devices_fetching ? (
              <CircularProgress />
            ) : (
              <div>
                {
                  server.devices_error ? (
                    <Typography vatiant="p" className={classes.error}>Verbindung fehlgeschlagen.</Typography>
                  ) : (
                    <MenuList>
                      {server.devices.map((device) => (
                        <DeviceItem {...device } server={index} key={device.index} />
                      ))}
                    </MenuList>
                  )
                }
              </div>
            ) }
          </div>
        ))}
      </div>
    )
  }
}

export default connect(state => ({ servers: state.servers }), { loadDevices })(withStyles(styles, { withTheme: true })(Devices))
