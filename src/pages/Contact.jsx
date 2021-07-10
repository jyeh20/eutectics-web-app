import React, { useState } from 'react'

import colors from '../scripts/colors'
import emailFunctions from '../scripts/emailutils'

import { makeStyles, withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const Contact = (props) => {
  const { lightMode, bgColor } = props
  const { sendEmail } = emailFunctions
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [messageError, setMessageError] = useState(false)
  const [messageSent, setMessageSent] = useState(false)

  const useStyles = makeStyles((theme) => ({
    layout: {
      height: '90vh',
      backgroundColor: bgColor,
      paddingTop: '15vh',
    },

    container: {
      display: 'grid',
      gridTemplateRows: '25% 55% 10%',
      gridTemplateColumns: '50% 50%',
      // paddingTop: '15vh',
      margin: 'auto',
      height: '60%',
      width: '60%',
    },

    name: {
      marginRight: 'auto',
      marginBottom: 'auto',
      backgroundColor: colors.white,
      width: '80%',
      gridColumnStart: 1,
      gridColumnEnd: 2,
      gridRowStart: 1,
      gridRowEnd: 2,
      borderRadius: 5
    },

    email: {
      marginLeft: 'auto',
      marginBottom: 'auto',
      backgroundColor: colors.white,
      borderColor: colors.blue,
      borderStyle: 'solid',
      borderWidth: '2px',
      width: '80%',
      gridColumnStart: 2,
      gridColumnEnd: 3,
      gridRowStart: 1,
      gridRowEnd: 2,
      borderRadius: 10
    },

    message: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      backgroundColor: colors.white,
      borderColor: colors.blue,
      borderStyle: 'solid',
      borderWidth: '2px',
      width:'99%',
      gridColumnStart: 1,
      gridColumnEnd: 3,
      gridRowStart: 2,
      gridRowEnd: 3,
      borderRadius: 5
    },

    send: {
      marginTop: 'auto',
      marginLeft: 'auto',
      gridColumnStart: 2,
      gridColumnEnd: 3,
      gridRowStart: 3,
      gridRowEnd: 4,
    }
  }))
  const classes = useStyles()

  const SendButton = withStyles({
    root: {
      backgroundColor: colors.blue,
      color: lightMode ? colors.black : colors.white,
      '&:hover': {
        backgroundColor: colors.hoverBlue
      }
    }
  })(Button)

  // handlers

  const handleNameChange = (e) => {
    setName(e.target.value)
    setNameError((name === "") ? true : false)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setEmailError(!validateEmail() ? true : false)
  }

  const handleMessageChange = (e) => {
    setMessage(e.target.value)
    setMessageError((message === "") ? true : false)
  }

  // error checking

  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const setErrors = () => {
    let errorState = false
    // name
    if (name === "") {
      setNameError(true)
      errorState = true
    } else {
      setNameError(false)
    }

    // email
    if (!validateEmail()) {
      setEmailError(true)
      errorState = true
    } else {
      setEmailError(false)
    }

    // message
    if (message === "") {
      setMessageError(true)
      errorState = true
    } else {
      setMessageError(false)
    }

    return errorState
  }

  // send message

  const sendMessage = (e) => {
    e.preventDefault()

    if (setErrors()) {
      return
    }

    if (sendEmail(e)) {
      setMessageSent(true)
    }
  }

  return (
    <div className={classes.layout}>
      <form
        className={classes.container}
        onSubmit={sendMessage}
        autoComplete="off"
      >
        <TextField
          error={nameError}
          helperText={nameError ? "Name must not be empty" : null}
          variant="filled"
          label="Your Name"
          id="from_name"
          name="from_name"
          className={classes.name}
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          error={emailError}
          helperText={emailError ? "Must be a valid email" : null}
          type="email"
          label="Your Email"
          id="from_email"
          name="from_email"
          variant="filled"
          className={classes.email}
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          error={messageError}
          helperText={messageError ? "Message must not be empty" : null}
          label="Message"
          id="message"
          name="message"
          variant="filled"
          multiline
          rows={7}
          className={classes.message}
          value={message}
          onChange={handleMessageChange}
        />
        <SendButton
          className={classes.send}
          type="submit"
          value="Submit"
        >
          Send Message
        </SendButton>
      </form>
    </div>
  )
}

export default Contact