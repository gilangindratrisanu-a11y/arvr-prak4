import * as THREE from 'three';
import { MindARThree } from '../vendor/mindar/mindar-face-three.prod.js';
import { setStatus, setupStartButton } from './common.js';

const ANCHOR_INDEX = 168;      // Titik antara kedua mata
const CLOWN_SCALE = 1.0;
const CLOWN_OFFSET = { x: 0, y: 0.0, z: 0.0 };

function buildClownAccessory() {
  const g = new THREE.Group();

  // 1. Hidung Merah (Red Nose) - sudah pas
  const noseMat = new THREE.MeshStandardMaterial({ 
    color: 0xff0000, 
    roughness: 0.3, 
    metalness: 0.1 
  });
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.1, 32, 32), noseMat);
  nose.position.set(0, -0.15, 0.1);
  g.add(nose);

  // 2. Rambut Badut Mengembang (Big Afro Puffs di Kiri dan Kanan Kepala)
  const hairColors = [0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x8b00ff, 0xff1493];

  // Fungsi membuat rumpun rambut besar (afro puff) di satu sisi
  function createAfroPuff(centerX, centerY, centerZ) {
    const puffGroup = new THREE.Group();
    // Gunakan banyak bola berukuran agak besar dan saling tumpang tindih agar terlihat lebat/mengembang
    for (let i = 0; i < 12; i++) {
      const color = hairColors[i % hairColors.length];
      const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
      const radius = 0.15 + Math.random() * 0.05; // Bola cukup besar
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 16, 16), mat);

      // Posisi menyebar acak di sekitar pusat sisi kepala
      const offsetX = (Math.random() - 0.5) * 0.2;
      const offsetY = (Math.random() - 0.5) * 0.2;
      const offsetZ = (Math.random() - 0.5) * 0.2;

      sphere.position.set(centerX + offsetX, centerY + offsetY, centerZ + offsetZ);
      puffGroup.add(sphere);
    }
    return puffGroup;
  }

  // Rumpun rambut kiri (posisi melebar ke kiri kepala)
  const leftHair = createAfroPuff(-0.45, 0.15, -0.1);
  g.add(leftHair);

  // Rumpun rambut kanan (posisi melebar ke kanan kepala)
  const rightHair = createAfroPuff(0.45, 0.15, -0.1);
  g.add(rightHair);

  // Tambahan poni/rambut di atas dahi agar lebih penuh
  const topHair = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const color = hairColors[(i + 3) % hairColors.length];
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), mat);
    sphere.position.set((i - 2.5) * 0.12, 0.35 + (i % 2) * 0.05, -0.05);
    topHair.add(sphere);
  }
  g.add(topHair);

  g.scale.setScalar(CLOWN_SCALE);
  g.position.set(CLOWN_OFFSET.x, CLOWN_OFFSET.y, CLOWN_OFFSET.z);
  return g;
}

async function start() {
  const mindarThree = new MindARThree({ container: document.getElementById('container') });
  const { renderer, scene, camera } = mindarThree;

  const anchor = mindarThree.addAnchor(ANCHOR_INDEX);
  anchor.group.add(buildClownAccessory());

  scene.add(new THREE.HemisphereLight(0xffffff, 0x667788, 1.4));
  const dir = new THREE.DirectionalLight(0xffffff, 1.2);
  dir.position.set(0, 1, 2);
  scene.add(dir);

  await mindarThree.start();
  setStatus('Mencari wajah', 'searching');

  let hadFace = false;
  let lostCount = 0;
  renderer.setAnimationLoop(() => {
    const hasFace = mindarThree.getLatestEstimate() !== null;
    if (hasFace !== hadFace) {
      hadFace = hasFace;
      if (hasFace) {
        setStatus('Wajah terdeteksi', 'found');
      } else {
        lostCount++;
        setStatus('Wajah tidak terdeteksi - mencari wajah', 'searching');
      }
      document.getElementById('info').textContent = 'Wajah hilang ' + lostCount + ' kali.';
    }
    renderer.render(scene, camera);
  });
}

setupStartButton(start);
