import './style.css'
import * as THREE from 'three'

// scene
const scene = new THREE.Scene()

// geomertry and material
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })

// creating mesh
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const size = { width: 800, height: 600 }

// camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
scene.add(camera)
camera.position.z = 3

// Renderer
const canvas = document.getElementById('webgl')
const renderer = new THREE.WebGL1Renderer({ canvas })
renderer.setSize(size.width, size.height)

renderer.render(scene, camera)
