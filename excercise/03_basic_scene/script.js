// Creating a scene
const scene = new THREE.Scene()

// MESH: combination of shapes/geometry & MATREIAL: how our mesh look like info goes here
//(we're creating a red cube)
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })

// making a mesh using geometry and material
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Size
const size = { height: 600, width: 800 }

// Camera for POV (it takes parameters) we pass vert. vision angle in degrees & aspect ratio
const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
scene.add(camera)
camera.position.z = 3

// RENDERER to render the mesh on screen (Canvas)
const canvas = document.getElementById('webgl')
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(size.width, size.height)

renderer.render(scene, camera)
