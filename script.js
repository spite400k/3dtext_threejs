import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";
import { FontLoader} from "./loaders/FontLoader.js";
import { TextGeometry } from "./geometries/TextGeometry.js";

// Scene
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// const helper = new THREE.AxesHelper();
// scene.add(helper);

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(1, 1, 2);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

//Fonts
const fontLoader = new FontLoader();
fontLoader.load("./fonts/helvetiker_regular.typeface.json", function(font){
  console.log(font);

  const textGeometry = new TextGeometry("haruto yuto" , {
    font:font,
    size:0.5,
    height:0.2,
    curveSegment:12,
    bevelEnabled:true,
    bevelThickness:0.04,
    bevelSize:0.02,
    bevelOffset:0,
    bevelSegment:5,
  });
  textGeometry.center();

  //material
  // const textMaterial = new THREE.MeshNormalMaterial();
  const textMaterial = new THREE.MeshBasicMaterial({color: 0xA63744});
  // const textMaterial = new THREE.MeshLambertMaterial({color: 0xA63744});


  //mesh
  const text = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(text);

  //boxGeometry
  const boxGeometry = new THREE.BoxGeometry(0.5, 0.5,0.5);
  const material = new THREE.MeshNormalMaterial(); 

  for(let i=0; i<100;i++){
    const box = new THREE.Mesh(boxGeometry,material);

    box.position.x = (Math.random() - 0.5) * 10;
    box.position.y = (Math.random() - 0.5) * 10;
    box.position.z = (Math.random() - 0.5) * 10;

    box.rotation.x = Math.random() * Math.PI;
    box.rotation.y = Math.random() * Math.PI;
    box.rotation.z = Math.random() * Math.PI;

    const scale = Math.random();
    box.scale.x = scale;
    box.scale.y = scale;
    box.scale.z = scale;
    scene.add(box);

    // // 平行光源
    // const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    // directionalLight.position.set(1, 1, 1);
    // // シーンに追加
    // scene.add(directionalLight);
  }
});

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Animate
const animate = () => {
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

animate();
