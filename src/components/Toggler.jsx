import { forwardRef, useImperativeHandle, useState } from "react"
import propTypes from 'prop-types'

const Toggler = forwardRef((props, refs) =>
{
  const [visible, setVisiblity] = useState(false)
  const { buttonLable, children } = props
  const visibleWhenVisible = { display: visible? '' : 'none' }
  const visibleWhenNotVisible = { display: visible? 'none' : '' }

  const flipVisibility = () =>
  {
    setVisiblity(!visible)
  }
  useImperativeHandle(refs, () =>
    {
      return { flipVisibility }
    })

  return (
    <>
      <button style={visibleWhenNotVisible} onClick={flipVisibility}>{ buttonLable }</button>
      <div style={visibleWhenVisible}>
        {children}
        <button onClick={flipVisibility}>cancle</button>
      </div>
    </>
  )
})

Toggler.propTypes = {
  buttonLable: propTypes.string.isRequired
}

Toggler.displayName = 'Toggler'

export default Toggler