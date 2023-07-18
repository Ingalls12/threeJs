import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * Loaders
 */
const loadingManager = new THREE.LoadingManager();
const gltfLoader = new GLTFLoader(loadingManager);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
renderer.setClearColor(0xFEFEFE);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Sets orbit control to move the camera around
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
camera.position.set(6, 8, 14);
orbit.update();

// Sets a 12 by 12 gird helper
const gridHelper = new THREE.GridHelper(12, 12);
// scene.add(gridHelper);

// Sets the x, y, and z axes with each having a length of 4
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

const mouse = new THREE.Vector2();
const intersectionPoint = new THREE.Vector3();
const planeNormal = new THREE.Vector3();
const plane = new THREE.Plane();
const raycaster = new THREE.Raycaster();

/**
 * Models
 */

window.addEventListener('mousemove', function(e){
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    planeNormal.copy(camera.position).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, intersectionPoint);
});

window.addEventListener('click', function(e) {

    gltfLoader.load('/models/Reloj_wNikoUncom.glb', (gltf) => {
        gltf.scene.position.copy(intersectionPoint);
        gltf.scene.scale.set(.5, .5, .5);
        scene.add(gltf.scene);
        console.log("Object Instanced");
    });
})

function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// import * as THREE from 'three';
// import { ARButton } from 'three/addons/webxr/ARButton.js';

// let camera, scene, renderer;
// let controller;

// init();
// animate();

// function init() {

// const container = document.createElement( 'div' );
// document.body.appendChild( container );

// scene = new THREE.Scene();

// camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 );

// const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 3 );
// light.position.set( 0.5, 1, 0.25 );
// scene.add( light );

// //

// renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
// renderer.setPixelRatio( window.devicePixelRatio );
// renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.useLegacyLights = false;
// renderer.xr.enabled = true;
// container.appendChild( renderer.domElement );

// //

// document.body.appendChild( ARButton.createButton( renderer ) );

// //

// const geometry = new THREE.CylinderGeometry( 0, 0.05, 0.2, 32 ).rotateX( Math.PI / 2 );

// function onSelect() {

// 	const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random() } );
// 	const mesh = new THREE.Mesh( geometry, material );
// 	mesh.position.set( 0, 0, - 0.3 ).applyMatrix4( controller.matrixWorld );
// 					mesh.quaternion.setFromRotationMatrix( controller.matrixWorld );
// 	scene.add( mesh );
// }

// 	controller = renderer.xr.getController( 0 );
// 	controller.addEventListener( 'select', onSelect );
// 	scene.add( controller );

// 	//

//     window.addEventListener( 'resize', onWindowResize );

// 	}

// function onWindowResize() {

// 			camera.aspect = window.innerWidth / window.innerHeight;
// 			camera.updateProjectionMatrix();

// 				renderer.setSize( window.innerWidth, window.innerHeight );

// 			}

// //

// function animate() {

// 	renderer.setAnimationLoop( render );

// }

// function render() {

// 	renderer.render( scene, camera );

// }