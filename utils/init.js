// 项目初始化
import * as THREE from 'three'
// 引入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js'

// 声明变量
// 场景 相机 渲染器 轨道控制器
export let scene, camera, renderer, controls, css3dRenderer
;(function init() {
  // 场景
  scene = new THREE.Scene()
  // 透视相机
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 0.1)
  // 渲染器 (防锯齿)
  renderer = new THREE.WebGLRenderer({ antialias: true })
  // 设置大小
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 添入到body中
  document.body.appendChild(renderer.domElement)
})()
;(function resizeRender() {
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })
})()
// 创建3d加载渲染器
;(function create3dRenderer() {
  css3dRenderer = new CSS3DRenderer()
  css3dRenderer.setSize(window.innerWidth, window.innerHeight)
  css3dRenderer.domElement.style.position = 'fixed'
  css3dRenderer.domElement.style.top = 0
  css3dRenderer.domElement.style.left = 0
  css3dRenderer.domElement.style.pointerEvents = 'none'
  document.body.appendChild(css3dRenderer.domElement)
})()
// 创建轨道控制器
;(function createControls() {
  // 初始化控制器(相机,渲染器dom)
  controls = new OrbitControls(camera, renderer.domElement)
  // 开启阻尼
  // controls.enableDamping = true
  controls.minPolarAngle = 0.25 * Math.PI
  controls.enableZoom = false
})() // 创建一个辅助线
;(function createHelper() {
  // const axesHelper = new THREE.AxesHelper(5)
  // scene.add(axesHelper)
})() // 渲染渲染器
;(function renderLoop() {
  renderer.render(scene, camera)
  css3dRenderer.render(scene, camera)
  requestAnimationFrame(renderLoop)
})()
