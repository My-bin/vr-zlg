import * as dat from 'dat.gui'
const gui = new dat.GUI()
export function guiMover(materialobj) {
  gui.add(materialobj.position, 'x', -1, 1, 0.01).name('位移x')
  gui.add(materialobj.position, 'y', -1, 1, 0.01).name('位移y')
  gui.add(materialobj.position, 'z', -1, 1, 0.01).name('位移z')

  gui.add(materialobj.rotation, 'x', 0, 2 * Math.PI, 0.01).name('旋转x')
  gui.add(materialobj.rotation, 'y', 0, 2 * Math.PI, 0.01).name('旋转y')
  gui.add(materialobj.rotation, 'z', 0, 2 * Math.PI, 0.01).name('旋转z')
}
