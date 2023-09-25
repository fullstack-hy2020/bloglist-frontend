const setStateTimeout = (component, setState, timeout) => {
  setState(component)

  setTimeout(() => {
    setState('')
  }, timeout)
}

export default {
  setStateTimeout
}
