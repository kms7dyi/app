import React from 'react'
import { Typography, Button, CircularProgress, Grid, TextField, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import FlashonIcon from '@material-ui/icons/FlashOn'
import FlashoffIcon from '@material-ui/icons/FlashOff'
import green from '@material-ui/core/colors/green'
import Slider from '@material-ui/lab/Slider'

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit * 2
  },
  control: {
    marginTop: theme.spacing.unit * 2
  },
  controlHeading: {
    marginBottom: theme.spacing.unit
  },
  wrapper: {
    position: 'relative',
    display: 'inline-block',
    marginTop: theme.spacing.uint * 2
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
})


const SendButton = withStyles(styles, { withTheme: true })(({color, classes, sending, sendCommand, command, children, style}) => (
  <div className={classes.wrapper}>
    <Button variant="contained" color={color} className={classes.button}
      size="large" disabled={sending} onClick={() => sendCommand(command)} style={style}>
      {children}
    </Button>
    {sending && <CircularProgress size={24} className={classes.buttonProgress} />}
  </div>
))

const PowerControl = withStyles(styles, { withTheme: true })(({classes, sending, sendCommand}) => (
  <div className={classes.control}>
    <Typography variant="h6" className={classes.controlHeading}>An/Aus</Typography>
    <SendButton color="primary" sending={sending} sendCommand={sendCommand} command={{ command: 'on' }}>
      <FlashonIcon/>An
    </SendButton>
    <SendButton color="secondary" sending={sending} sendCommand={sendCommand} command={{ command: 'off' }}>
      <FlashoffIcon/>Aus
    </SendButton>
  </div>
))

const ColorButton = ({ r, g, b, onClick}) => (
  <Button style={{ backgroundColor: `rgb(${r},${g},${b})`, minWidth: 0, width: '100%'}} onClick={() => onClick(r,g,b)}>&nbsp;</Button>
)

class _ColorControl extends React.Component {
  state = {
    r: 255,
    g: 0,
    b: 0
  }

  handleChangeColorTextField = (event) => {
    const target = event.target
    this.setState({ [target.name]: target.value })
  }

  handleColorButtonPressed = (r,g,b) => {
    this.setState({ r, g, b })
  }

  render () {
    const { classes, sending, sendCommand } = this.props
    const { r,g,b } = this.state
    const colorFiledInputProps = {min: "0", max: "255", step: 1}
    return (
      <div className={classes.control}>
        <Typography variant="h6" className={classes.controlHeading}>Farbe</Typography>
        <Grid container spacing={16}>
          <Grid item xs={2}>
            <ColorButton r="255" g="0" b="0" onClick={this.handleColorButtonPressed} />
          </Grid>
          <Grid item xs={2}>
            <ColorButton r="0" g="255" b="0" onClick={this.handleColorButtonPressed} />
          </Grid>
          <Grid item xs={2}>
            <ColorButton r="0" g="0" b="255" onClick={this.handleColorButtonPressed} />
          </Grid>
          <Grid item xs={2}>
            <ColorButton r="255" g="255" b="0" onClick={this.handleColorButtonPressed} />
          </Grid>
          <Grid item xs={2}>
            <ColorButton r="255" g="0" b="255" onClick={this.handleColorButtonPressed} />
          </Grid>
          <Grid item xs={2}>
            <ColorButton r="0" g="255" b="255" onClick={this.handleColorButtonPressed} />
          </Grid>
          <Grid item xs={2}>
            <ColorButton r="255" g="255" b="255" onClick={this.handleColorButtonPressed} />
          </Grid>
          <Grid item xs={2}>
            <ColorButton r="127" g="127" b="127" onClick={this.handleColorButtonPressed} />
          </Grid>
          <Grid item xs={2}>
            <ColorButton r="0" g="0" b="0" onClick={this.handleColorButtonPressed} />
          </Grid>
          <Grid item xs={2}>
            <ColorButton r="127" g="0" b="0" onClick={this.handleColorButtonPressed} />
          </Grid>
          <Grid item xs={2}>
            <ColorButton r="0" g="127" b="0" onClick={this.handleColorButtonPressed} />
          </Grid>
          <Grid item xs={2}>
            <ColorButton r="0" g="0" b="127" onClick={this.handleColorButtonPressed} />
          </Grid>
        </Grid>
        <Grid container style={{marginTop: '16px'}}>
          <Grid item xs={4}>
            <TextField value={r} onChange={this.handleChangeColorTextField} name="r" label="Rot" type="number" inputProps={colorFiledInputProps} />
          </Grid>
          <Grid item xs={4}>
            <TextField value={g} onChange={this.handleChangeColorTextField} name="g" label="Grün" type="number" inputProps={colorFiledInputProps} />
          </Grid>
          <Grid item xs={4}>
            <TextField value={b} onChange={this.handleChangeColorTextField} name="b" label="Blau" type="number" inputProps={colorFiledInputProps} />
          </Grid>
        </Grid>
        <div className={classes.control}>
          <SendButton color="primary" sending={sending} sendCommand={sendCommand} command={{ command: 'color', args: [r,g,b] }} style={{ backgroundColor: `rgb(${r},${g},${b})` }}>
            Senden
          </SendButton>
        </div>
      </div>
    )
  }
}
const ColorControl = withStyles(styles, { withTheme: true})(_ColorControl)


class _EffectControl extends React.Component {
  state = {
    effect: 0x25,
    speed: 10
  }

  handleEffectChange = (event) => {
    this.setState({ effect: event.target.value })
  }

  handleSpeedChange = (event, value) => {
    this.setState({ speed: value })
  }

  render () {
    const { classes, sending, sendCommand } = this.props
    const { effect, speed } = this.state

    return (
      <div className={classes.control}>
        <Typography variant="h6" className={classes.controlHeading}>Effekt</Typography>
        <FormControl fullWidth style={{ marginBottom: '8px' }}>
          <InputLabel htmlFor="effect">Effekt</InputLabel>
            <Select value={effect} onChange={this.handleEffectChange}
              inputProps={{
                id: 'effect',
              }}
            >
              <MenuItem value={0x25}>Sieben Farbüberblendungen</MenuItem>
              <MenuItem value={0x26}>Rot allmähliche Veränderung</MenuItem>
              <MenuItem value={0x27}>Grün allmähliche Veränderung</MenuItem>
              <MenuItem value={0X28}>Blau allmähliche Veränderung</MenuItem>
              <MenuItem value={0x29}>Gelb allmähliche Veränderung</MenuItem>
              <MenuItem value={0x2A}>Cyan allmähliche Veränderung</MenuItem>
              <MenuItem value={0x2B}>Lila allmähliche Veränderung</MenuItem>
              <MenuItem value={0x2C}>Weiß allmähliche Veränderung</MenuItem>
              <MenuItem value={0x2D}>Rot grüne Überblendung</MenuItem>
              <MenuItem value={0x2E}>Rot blue Überblendung</MenuItem>
              <MenuItem value={0x2F}>Grün blue Überblendung</MenuItem>
              <MenuItem value={0x30}>Blitz mit sieben Farben</MenuItem>
              <MenuItem value={0x31}>Rotes Blitzlicht</MenuItem>
              <MenuItem value={0x32}>Grün Blitzlicht</MenuItem>
              <MenuItem value={0x33}>Blau Blitzlicht</MenuItem>
              <MenuItem value={0x34}>Gelb Blitzlicht</MenuItem>
              <MenuItem value={0x35}>Cyan Blitzlicht</MenuItem>
              <MenuItem value={0x36}>Lila Blitzlicht</MenuItem>
              <MenuItem value={0x37}>Weiß Blitzlicht</MenuItem>
              <MenuItem value={0x38}>Sieben Farbsprungwechsel</MenuItem>
            </Select>
        </FormControl>
        <InputLabel>Geschwindigkeit</InputLabel>
        <Slider className={classes.control}
          value={speed}
          min={0}
          max={20}
          step={1}
          onChange={this.handleSpeedChange}
        />
        <div style={{ marginTop: '48px' }} />
        <SendButton color="primary" sending={sending} sendCommand={sendCommand} command={{ command: 'effect', args: [effect, speed] }}>
          Senden
        </SendButton>
      </div>
    )
  }
}

const EffectControl = withStyles(styles, { withTheme: true })(_EffectControl)

class _WarmwhiteControl extends React.Component {
  state = {
    brightness: 255
  }

  handleBrightnessChange = (event, value) => {
    this.setState({ brightness: value })
  }

  render () {
    const { classes, sending, sendCommand } = this.props
    const { brightness } = this.state
    return (
      <div className={classes.control}>
        <Typography variant="h6" className={classes.controlHeading}>Warmweiß</Typography>
        <InputLabel>Helligkeit</InputLabel>
        <Slider className={classes.control}
          value={brightness}
          min={0}
          max={255}
          step={1}
          onChange={this.handleBrightnessChange}
        />
        <div style={{ marginTop: '48px' }} />
        <SendButton color="primary" sending={sending} sendCommand={sendCommand} command={{ command: 'warmwhite', args: [brightness] }}>
          Senden
        </SendButton>
      </div>
    )
  }
}
const WarmwhiteControl = withStyles(styles, { withTheme: true })(_WarmwhiteControl)

export {
  PowerControl,
  ColorControl,
  EffectControl,
  WarmwhiteControl
}