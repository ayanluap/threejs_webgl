import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import doorClr from '../static/textures/door/color.jpg'
import ambientClr from '../static/textures/door/ambientOcclusion.jpg'
import alphaClr from '../static/textures/door/alpha.jpg'
import heightClr from '../static/textures/door/height.jpg'
import normalClr from '../static/textures/door/normal.jpg'
import metalnessClr from '../static/textures/door/metalness.jpg'
import roughClr from '../static/textures/door/roughness.jpg'
import matcapClr from '../static/textures/matcaps/1.png'
import gradientClr from '../static/textures/gradients/3.jpg'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * Texture
 */

const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load(doorClr)
const doorAlphaTexture = textureLoader.load(alphaClr)
const doorAmbientTexture = textureLoader.load(ambientClr)
const doorheightTexture = textureLoader.load(heightClr)
const doorNormalTexture = textureLoader.load(normalClr)
const doorMetalnessTexture = textureLoader.load(metalnessClr)
const doorRoughnessTexture = textureLoader.load(doorClr)
const matcapTexture = textureLoader.load(matcapClr)
const gradientTexture = textureLoader.load(gradientClr)

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const planeMaterial = new THREE.MeshBasicMaterial({
  map: gradientTexture,
})
const sphereMaterial = new THREE.MeshBasicMaterial({
  map: matcapTexture,
})
const torusMaterial = new THREE.MeshBasicMaterial({
  map: doorColorTexture,
})

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  sphereMaterial
)

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), planeMaterial)
plane.position.x = 1.2

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  torusMaterial
)
torus.position.x = -1.2

scene.add(sphere, plane, torus)

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
// camera.position.x = 1
// camera.position.y = 1
camera.position.z = 3
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

  torus.rotation.y = 0.1 * elapsedTime
  sphere.rotation.y = 0.1 * elapsedTime
  plane.rotation.y = 0.1 * elapsedTime

  torus.rotation.x = 0.2 * elapsedTime
  sphere.rotation.x = 0.2 * elapsedTime
  plane.rotation.x = 0.2 * elapsedTime

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
