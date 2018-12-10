
import React from 'react'
import Fab from '@material-ui/core/Fab'
import { Typography, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import RouterIcon from '@material-ui/icons/Router'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save'
import { connect } from 'react-redux'
import { addServer, removeServer } from '../actions'

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  textField: {
    marginTop: theme.spacing.unit * 2
  }
})

class Server extends React.Component {
  state = {
    addMode: false,
    name: '',
    address: '',
    password: ''
  }

  switchToAddView = () => {
    this.setState({ addMode: true })
  }

  saveServer = () => {
    const { name, address, password } = this.state
    this.props.addServer({
      name, address, password
    })
    this.setState({ 
      addMode: false,
      name: '',
      address: '',
      password: ''
    })
  }

  handleInputChange = (event) => {
    const name = event.target.name
    this.setState({[name]: event.target.value})
  }

  render() {
    const { classes, servers, removeServer } = this.props
    const { name, address, password, addMode } = this.state

    if(addMode) {
      return (
        <div>
          <Typography variant="h5">
            Server hinzufügen
          </Typography>
          <TextField
            name="name"
            label="Name"
            placeholder="Great Server"
            fullWidth
            className={classes.textField}
            value={name}
            onChange={this.handleInputChange}
          />
          <TextField
            name="address"
            label="Address"
            placeholder="http://192.168.178.19"
            fullWidth
            className={classes.textField}
            value={address}
            onChange={this.handleInputChange}
          />
          <TextField
            name="password"
            label="Password"
            placeholder="geheim"
            helperText="optional"
            fullWidth
            className={classes.textField}
            value={password}
            onChange={this.handleInputChange}
          />
          <Fab className={classes.fab} color="secondary" onClick={this.saveServer}>
            <SaveIcon />
          </Fab>
        </div>
      )
    }
    else {
      return (
        <div>
          <Typography variant="h5">
            Server
          </Typography>
          <List>
            {servers.map((server,i) => (
              <ListItem key={i}>
                <ListItemIcon><RouterIcon /></ListItemIcon>
                <ListItemText primary={server.name} secondary={server.address} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => removeServer(i)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Fab className={classes.fab} color="primary" onClick={this.switchToAddView}>
            <AddIcon />
          </Fab>
        </div>
      )  
    }
  }
}

// fuck this line
export default connect(state => ({ servers: state.servers }), { addServer, removeServer })(withStyles(styles, { withTheme: true })(Server))
