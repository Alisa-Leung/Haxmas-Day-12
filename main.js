import './style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(33, 24, 50)");
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setSize( window.innerWidth, window.innerHeight );

const sphereGeo = new THREE.SphereGeometry(1, 24, 25);
const sphereMat = new THREE.MeshBasicMaterial ({color: 0xffffff});
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
scene.add(sphere);

const donut_geo = new THREE.TorusGeometry(10, 1, 16, 100);
const donut_tex = new THREE.MeshBasicMaterial({color: 0xffffff});
const donut = new THREE.Mesh(donut_geo, donut_tex);
scene.add(donut);

const donut_geo2 = new THREE.TorusGeometry(6, 1, 16, 100);
const donut_tex2 = new THREE.MeshBasicMaterial({color: 0xffffff});
const donut2 = new THREE.Mesh(donut_geo2, donut_tex2);
scene.add(donut2);

const donut_geo3 = new THREE.TorusGeometry(3, 1, 16, 100);
const donut_tex3 = new THREE.MeshBasicMaterial({color: 0xffffff});
const donut3 = new THREE.Mesh(donut_geo3, donut_tex3);
scene.add(donut3);

function animate() {
    donut.rotation.x += 0.01;
    donut.rotation.y += 0.01;

    donut2.rotation.x += -0.01;
    donut2.rotation.z += -0.01;

    donut3.rotation.z += 0.01;
    donut3.rotation.y += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

function add_star(){
    const star_geometry = new THREE.SphereGeometry(0.25, 24, 25);
    const star_material = new THREE.MeshBasicMaterial({color: 0xffffff});
    const star = new THREE.Mesh(star_geometry, star_material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(200));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(add_star);

function moveCamera(){
    const camOffset = 20
    const t = document.body.getBoundingClientRect().top;

    sphere.rotation.y += 0.01;
    sphere.rotation.z += 0.01;
    
    camera.position.z = t * -0.01 + camOffset;
    camera.position.x = t * -0.0000;
    camera.rotation.y = t * -0.0000;
}

document.body.onscroll = moveCamera;
moveCamera();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});