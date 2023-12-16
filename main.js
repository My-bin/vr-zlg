// 引入初始化函数
import { scene, camera } from './utils/init.js'
import * as THREE from 'three'
// 引入gui方法
import { guiMover } from './utils/gui.js'
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js'
const group = new THREE.Group() // group 创建一个组用来装当前场景下得热点标记
const sceneInfoObj = {
  one: {
    // 统一地址
    publicPath: 'technology/1/',
    // 图片地址
    imgUrlArr: ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    // 当前空间中所有标记信息对象
    markList: [
      {
        name: 'landMark',
        imgUrl: 'other/landmark.png',
        wh: [0.05, 0.05],
        position: [-0.44, -0.15, -0.11],
        rotation: [1.42, 0.68, 1.63],
        targetAttr: 'two',
      },
    ],
  },
  two: {
    publicPath: 'technology/2/',
    imgUrlArr: ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    markList: [
      {
        name: 'landMark',
        imgUrl: 'other/landmark.png',
        wh: [0.05, 0.05],
        position: [0.47, -0.2, 0],
        rotation: [1.48, 0.26, -1.78],
        targetAttr: 'one', // 目标场景信息对象属性
      },
      {
        name: 'landMark',
        imgUrl: 'other/landmark.png',
        wh: [0.05, 0.05],
        position: [-0.46, -0.16, -0.3],
        rotation: [1.21, 0.78, 0],
        targetAttr: 'three', // 目标场景信息对象属性
      },
    ],
  },
  three: {
    publicPath: 'technology/3/',
    imgUrlArr: ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    markList: [
      {
        name: 'landMark',
        imgUrl: 'other/landmark.png',
        wh: [0.05, 0.05],
        position: [0.4, -0.18, 0.32],
        rotation: [-1.53, -0.04, -1.26],
        targetAttr: 'two', // 目标场景信息对象属性
      },
      {
        name: 'landMark',
        imgUrl: 'other/landmark.png',
        wh: [0.05, 0.05],
        position: [0.32, -0.16, -0.33],
        rotation: [1.46, 0.1, -0.17],
        targetAttr: 'four', // 目标场景信息对象属性
      },
    ],
  },
  four: {
    publicPath: 'technology/4/',
    imgUrlArr: ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    markList: [
      {
        name: 'landMark',
        imgUrl: 'other/landmark.png',
        wh: [0.05, 0.05],
        position: [-0.35, -0.22, 0.4],
        rotation: [-0.85, -0.45, -1.8],
        targetAttr: 'three', // 目标场景信息对象属性
      },
      {
        name: 'dom',
        position: [0.49, 0, 0],
        rotation: [0, -0.5 * Math.PI, 0],
        targetAttr: 'five', // 目标场景信息对象属性
        active(e) {
          setMaterialCube(sceneInfoObj.five)
        },
      },
    ],
  },
  five: {
    publicPath: 'technology/5/',
    imgUrlArr: ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    markList: [
      {
        name: 'landMark',
        imgUrl: 'other/landmark.png',
        wh: [0.03, 0.03],
        position: [-0.05, -0.05, 0.4],
        rotation: [1.21, -0.15, -0.69],
        targetAttr: 'four', // 目标场景信息对象属性
      },
      {
        name: 'video',
        imgUrl: 'video/mouse_cat.mp4',
        wh: [0.2, 0.1],
        position: [0.49, 0.04, 0.045],
        rotation: [0, -0.5 * Math.PI, 0],
      },
    ],
  },
}
// 创建一个立方体
function createCube() {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  const cube = new THREE.Mesh(geometry, material)
  cube.scale.set(1, 1, -1)
  scene.add(cube)

  return cube
}
// 创建清除韩式
function clear() {
  // 清除组内物体
  const list = [...group.children]
  list.forEach((item) => {
    if (!item.isCSS3DObject) {
      item.geometry.dispose()
      item.material.dispose()
    }
    group.remove(item)
  })
}
// 创建one
function setMaterialCube(infoObj) {
  clear() //清除之前的热点标记
  const { publicPath, imgUrlArr, markList } = infoObj
  // 创建纹理
  const textureLoader = new THREE.TextureLoader()
  // 纹理前缀地址
  textureLoader.setPath(publicPath)
  // 遍历纹理图
  const materialArr = imgUrlArr.map((imgUrl) => {
    // 加载纹理图
    const texture = textureLoader.load(imgUrl)
    // 设置纹理图rgb渲染
    texture.colorSpace = THREE.SRGBColorSpace
    // 纹理图贴到材质
    return new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    })
  })
  // 替换原本得材质
  cubeObj.material = materialArr
  // 创建底部热点标记
  markList.forEach((item) => {
    if (item.name == 'landMark') createLandMark(item)
    else if (item.name == 'dom') createDomMark(item)
    else if (item.name == 'video') createVideoMark(item)
  })
  // 全部热点标记加载完毕吧组加入到场景中
  scene.add(group)
}
// 创建热点标记
function createLandMark(markInfoObj) {
  const { imgUrl, wh, position, rotation, targetAttr, name } = markInfoObj
  // 创建几何体 ，原型
  const geometry = new THREE.PlaneGeometry(...wh)
  // 创建材质 网格基础材质 、、直接加载纹理
  const material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(imgUrl),
    side: THREE.DoubleSide,
    transparent: true,
  })
  const cylinder = new THREE.Mesh(geometry, material)
  cylinder.position.set(...position)
  cylinder.rotation.set(...rotation)
  // 给地上热点标记添加名字-方便点击时进行区分
  cylinder.name = name
  // three.js 3D 物体也可以自定义属性和值（方便后续获取绑定的这个数据）
  // 绑定这个地上热点标记，要切换到哪个场景信息对象，对应名字属性
  cylinder.userData.attr = targetAttr
  // guiMover(cylinder)
  group.add(cylinder)
}
// 创建3ddom
function createDomMark(infoObj) {
  const { active, position, rotation } = infoObj
  const span = document.createElement('span')
  span.className = 'mark-span'
  span.innerHTML = '前进'
  span.pointerEvents = 'all'
  span.addEventListener('click', (e) => {
    active(e)
  })
  const tag3d = new CSS3DObject(span)
  tag3d.scale.set(1 / 800, 1 / 800, 1 / 800)

  tag3d.position.set(...position)
  tag3d.rotation.set(...rotation)
  group.add(tag3d)
}
// 创建视频
function createVideoMark(infoObj) {
  const { name, imgUrl, wh, position, rotation } = infoObj
  const video = document.createElement('video')
  video.src = imgUrl
  video.loop = true
  video.muted = true
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  const plane = new THREE.PlaneGeometry(...wh)
  const material = new THREE.MeshBasicMaterial({
    map: new THREE.VideoTexture(video),
  })
  const mesh = new THREE.Mesh(plane, material)
  mesh.position.set(...position)
  mesh.rotation.set(...rotation)
  group.add(mesh)
}
// 注册点击事件
function bindClick() {
  //创建光设投影
  const raycaster = new THREE.Raycaster()
  // 创建二维向量
  const pointer = new THREE.Vector2()
  window.addEventListener('click', (e) => {
    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(pointer, camera)
    // 计算物体和射线的焦点
    const intersects = raycaster.intersectObjects(scene.children)
    const obj = intersects.find((item) => item.object.name == 'landMark')
    if (obj) {
      // 拆解obj拿到当前点击的热点标记
      const { attr } = obj.object.userData
      // 更新渲染贴图
      setMaterialCube(sceneInfoObj[attr])
    }
  })
}
const cubeObj = createCube()
setMaterialCube(sceneInfoObj.one)
bindClick()
