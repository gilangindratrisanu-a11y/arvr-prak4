import * as THREE from 'three';
import { MindARThree } from '../vendor/mindar/mindar-image-three.prod.js';
import { setStatus, setupStartButton } from './common.js';

const TARGET_SRC = './targets/target-card.mind';
const TARGET_ASPECT = 372 / 674;
let foundCount = 0;

async function start() {
  const mindarThree = new MindARThree({
    container: document.getElementById('container'),
    imageTargetSrc: TARGET_SRC,
  });
  const { renderer, scene, camera } = mindarThree;

  const anchor = mindarThree.addAnchor(0);

  const frame = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.PlaneGeometry(1, TARGET_ASPECT)),
    new THREE.LineBasicMaterial({ color: 0x14b8a6 })
  );
  anchor.group.add(frame);

  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.12, 0.04, 100, 16),
    new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4, metalness: 0.2 })
  );
  knot.position.set(0, 0, 0.2);
  anchor.group.add(knot);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x667788, 1.2));
  const dir = new THREE.DirectionalLight(0xffffff, 1.5);
  dir.position.set(0.5, 1, 1);
  scene.add(dir);

  anchor.onTargetFound = () => {
    foundCount++;
    setStatus('Target terdeteksi', 'found');
    document.getElementById('info').textContent = 'Target ditemukan ' + foundCount + ' kali.';
  };

  anchor.onTargetLost = () => {
    setStatus('Target hilang - mencari target', 'searching');
  };

  await mindarThree.start();
  setStatus('Mencari target', 'searching');

  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    knot.rotation.y += clock.getDelta() * 1.5;
    renderer.render(scene, camera);
  });
}

setupStartButton(start);
