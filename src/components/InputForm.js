import React, { useState } from 'react'
import { InputGroup } from 'react-bootstrap'
import '../style/treeForm.css'

const InputForm = ({ tree, update }) => {
  const [enabled, setEnabled] = useState(false)

  const handleInput = (event) => {
    event.preventDefault()
    tree.insert(event.target.input.value.toLowerCase())
    event.target.input.value = ''
    update(tree.toGraph())
    setEnabled(false)
  }

  const handleChange = (event) => {
    event.preventDefault()
    const value = event.target.value.toLowerCase()
    setEnabled(value.length !== 0)
  }

  return (
    <form onSubmit={(e) => handleInput(e)}>
      <InputGroup>
        <input
          className="form-control"
          type="text"
          id="input"
          placeholder="Enter number"
          onChange={handleChange}
        />
        <input
          type="submit"
          className="btn btn-primary add-btn"
          value="Add"
          disabled={!enabled}
        />
      </InputGroup>
    </form>
  )
}

export { InputForm }
