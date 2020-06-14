import { initBuffers, drawScene, initShaderProgram, loadShader } from './BackgroundGL'
import React, { useState, useEffect } from 'react'

// Vertex shader program

const vsSource = `
  attribute vec4 aVertexPosition;
  attribute vec4 aVertexColor;
  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;
  varying lowp vec4 vColor;
  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vColor = aVertexColor;
  }
`;

// Fragment shader program

const fsSource = `
  varying lowp vec4 vColor;
  void main(void) {
    gl_FragColor = vColor;
  }
`;

export default function Background (props) {
  const canvas = React.createRef()
  let gl, programInfo, shaderProgram, buffers
  
  useEffect(() => {
    canvas.current.height = 10*(window.innerHeight/window.innerWidth)
    canvas.current.width = 10*(window.innerWidth/window.innerHeight)
    gl = canvas.current.getContext('webgl')
    shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      },
    }

    setInterval(_ => {
      buffers = initBuffers(gl, Date.now())
      drawScene(gl, programInfo, buffers)
    }, 1000 / 30)
  }, [])

  return (
    <canvas ref={canvas} {...props}/>
  )
}
