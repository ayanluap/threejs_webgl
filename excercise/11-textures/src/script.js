import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import ColorImg from '../static/textures/door/color.jpg'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * textures
 */

/////////////////////////////////////////////// Method 01 [basic]
/*
const img = new Image()
const texture = new THREE.Texture(img)

img.onload = () => {
  texture.needsUpdate = true
}

img.src = '/textures/door/color.jpg'
*/

/////////////////////////////////////////////// Method 02 [easy]
const loadingManger = new THREE.LoadingManager()
loadingManger.onStart = (e) => {
  console.log('loading manager start : ', e)
}

loadingManger.onProgress = (e) => {
  console.log('loading manger progress : ', e)
}

loadingManger.onLoad = (e) => {
  console.log('loading manger loaded : ', e)
}

loadingManger.onError = (e) => console.log('loading manager error : ', e)

const textureLoader = new THREE.TextureLoader(loadingManger)

const texture = textureLoader.load(ColorImg)

// texture.minFilter = THREE.NearestFilter
// texture.magFilter = THREE.NearestFilter

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const material = new THREE.MeshBasicMaterial({ map: texture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
