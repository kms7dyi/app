
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { loadAreas } from '../actions'
import { CircularProgress, MenuList, MenuItem, ListItemIcon, ListItemText, Chip } from '@material-ui/core'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
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

const _AreaItem = (props) => (
  <MenuItem className={props.classes.menuItem} component={Link} to={`/area/${props.server}/${props.index}`}>
    <ListItemIcon>
      <MeetingRoomIcon />
    </ListItemIcon>
    <ListItemText primary={props.name} secondary={
      <React.Fragment>
        {props.devices.map(device => <Chip component="span" key={device.index} label={device.name} className={props.classes.chip} color="secondary" />)}
        
      </React.Fragment>
    } />
  </MenuItem>
)

const AreaItem = withStyles(styles, { withTheme: true })(_AreaItem)

class Areas extends React.Component {
  componentWillMount() {
    const { servers, loadAreas } = this.props

    for(const [index, server] of servers.entries()) {
      loadAreas({
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
          Bereiche
        </Typography>
        {servers.map((server, index) => (
          <div className={classes.server} key={index}>
            <Typography variant="h6" className={classes.server}>{server.name}</Typography>
            { server.areas_fetching ? (
              <CircularProgress />
            ) : (
              <div>
                {
                  server.areas_error ? (
                    <Typography vatiant="p" className={classes.error}>Verbindung fehlgeschlagen.</Typography>
                  ) : (
                    <MenuList>
                      {server.areas.map((device) => (
                        <AreaItem {...device} server={index} key={device.index} />
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

export default connect(state => ({ servers: state.servers }), { loadAreas })(withStyles(styles, { withTheme: true })(Areas))
