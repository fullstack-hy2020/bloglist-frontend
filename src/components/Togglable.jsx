import { forwardRef, useImperativeHandle, useState } from 'react'
import propType from 'prop-types'

const Togglable = forwardRef((props,ref) => {
    const [visible, setVisible] = useState(false)
  
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
  
    const toggleVisibility = () => {
      setVisible(!visible)
    }

    useImperativeHandle(ref,()=>{
        return {toggleVisibility}
    })
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
        
          <button onClick={toggleVisibility}>{props?.buttonHide || 'cancel'}</button>
          {props.children}
        </div>
      </div>
    )
  }


) 
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'
export default Togglable