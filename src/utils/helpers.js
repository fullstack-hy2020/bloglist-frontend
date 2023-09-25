const setStateTimeout = (setState, component, timeout) => {
  setState(component)

  setTimeout(() => {
    setState('')
  }, timeout)
}

export default { setStateTimeout }
