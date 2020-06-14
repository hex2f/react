import mat4 from 'gl-mat4'
import SimplexNoise from 'simplex-noise'
const simplex = new SimplexNoise()

function color(time, offset, speed) {
  let brightness = 0.4
  let base = Math.abs(1/brightness-1)
  let r = simplex.noise2D(offset+1, time/1000/speed)/brightness
  let g = simplex.noise2D(offset+2, time/1000/speed)/brightness
  let b = simplex.noise2D(offset+3, time/1000/speed)/brightness
  
  return [
    Math.min((base + r)/2 + 0.5, 1),
    Math.min((base + (g * b))/2 + 0.5, 1),
    Math.min((base + b)/2 + 0.5, 1)
    , 1.0]
}

export function initBuffers(gl, time) {
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  const positions = [
     1.0,  1.0,
    -1.0,  1.0,
     1.0, -1.0,
    -1.0, -1.0,
  ]

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

  var colors = [
    ...color(time, 0, 25),
    ...color(time, 0.2, 25),
    ...color(time, 1.2, 25),
    ...color(time, 1, 25),
  ]

  const colorBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)

  return {
    position: positionBuffer,
    color: colorBuffer,
  }
}

export function drawScene(gl, programInfo, buffers) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clearDepth(1.0)
  gl.enable(gl.DEPTH_TEST)
  gl.depthFunc(gl.LEQUAL)

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  const projectionMatrix = mat4.create()

  mat4.ortho(projectionMatrix, -1.0, 1.0, -1.0, 1.0, 0.1, 100)

  const modelViewMatrix = mat4.create()
  mat4.translate(modelViewMatrix,
                 modelViewMatrix,
                 [-0.0, 0.0, -6.0])

  {
    const numComponents = 2
    const type = gl.FLOAT
    const normalize = false
    const stride = 0
    const offset = 0
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset)
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition)
  }

  {
    const numComponents = 4
    const type = gl.FLOAT
    const normalize = false
    const stride = 0
    const offset = 0
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color)
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset)
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor)
  }

  gl.useProgram(programInfo.program)

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix)
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix)

  {
    const offset = 0
    const vertexCount = 4
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount)
  }
}

export function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

  const shaderProgram = gl.createProgram()
  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  gl.linkProgram(shaderProgram)

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram))
    return null
  }

  return shaderProgram
}

export function loadShader(gl, type, source) {
  const shader = gl.createShader(type)

  gl.shaderSource(shader, source)

  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}