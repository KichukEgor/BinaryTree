import React, { useCallback, useEffect, useState } from 'react'
import Graph from 'react-graph-vis'
import Col from 'react-bootstrap/Col'
import { Button, Row } from 'react-bootstrap'
import { InputForm } from './InputForm'
import { Node } from './Node'
import { TrashIcon } from './Icons'

const defaultTree = {
  edges: [],
  nodes: []
}

const TreeGraph = ({ options }) => {
  const [tree, setTree] = useState(new Node(null))

  const [representation, setRepresentation] = useState(defaultTree)

  const [network, setNetwork] = useState(null)
  const [divElement, setDiv] = useState(null)

  const handleResize = useCallback(async () => {
    if (network) {
      const newOptions = options
      newOptions.height = `${divElement.clientHeight}px`
      await network.setOptions(newOptions)
      network.fit()
    }
  }, [network, divElement, options])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  })

  useEffect(() => {
    handleResize()
  })

  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log('resize')
      if (event.code === 'Space') {
        const newValue = `${Math.floor(Math.random() * 201) - 100}` // Generate random number in range [-100, 100]
        tree.insert(newValue)
        update(tree.toGraph(newValue))
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const update = (newVal) => {
    setRepresentation(newVal)
    if (network) {
      network.setData(newVal)
    }
  }

  const clear = () => {
    update(defaultTree)
    setTree(new Node(null))
  }

  return (
    <div className="container">
      <header className="header">
        <p>
          <b>Press the space bar</b> to generate a random number ir range [-100, 100]
        </p>
        <Row>
          <Col>
            <InputForm update={update} tree={tree} />
          </Col>
          <Col>
            <Button className="btn btn-danger" onClick={() => clear()}>
              <TrashIcon />
              Clear tree
            </Button>
          </Col>
        </Row>
      </header>
      <div>
        <div
          ref={(divElement) => {
            setDiv(divElement)
          }}
          className="border border-dark graph-container"
        >
          <Graph
            options={options}
            updateTrigger={representation}
            graph={{ edges: [], nodes: [] }}
            getNetwork={(network) => {
              setNetwork(network)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export { TreeGraph }
