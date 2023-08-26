import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const dims = {
	width: document.documentElement.clientWidth,
	height: document.documentElement.clientHeight,
};

const scene = new THREE.Scene();

const sun = new THREE.Mesh(
	new THREE.SphereGeometry(3, 64, 64),
	new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load("./img/sun-map.jpeg"),
	})
);

scene.add(sun);

function addStars(count) {
	const starGeometry = new THREE.BufferGeometry();

	const starMaterial = new THREE.PointsMaterial({
		color: 0xfdf4dc,
	});

	const starPositions = [];

	for (let i = 0; i < count; i++) {
		const x = (Math.random() - 0.5) * 2000;
		const y = (Math.random() - 0.5) * 2000;
		const z = (Math.random() - 0.5) * 2000 + 50;
		starPositions.push(x, y, z);
	}

	starGeometry.setAttribute(
		"position",
		new THREE.Float32BufferAttribute(starPositions, 3)
	);

	const stars = new THREE.Points(starGeometry, starMaterial);

	scene.add(stars);
}

addStars(15000);

const camera = new THREE.PerspectiveCamera(45, dims.width / dims.height);
camera.position.z = 25;
scene.add(camera);

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(dims.width, dims.height);
renderer.setPixelRatio(3);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 2;

window.addEventListener("resize", () => {
	dims.width = document.documentElement.clientWidth;
	dims.height = document.documentElement.clientHeight;
	camera.updateProjectionMatrix();
	camera.aspect = dims.width / dims.height;
	renderer.setSize(dims.width, dims.height);
});

screen.orientation.addEventListener("change", () => {
	window.location.reload();
});

const animationLoop = () => {
	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(animationLoop);
};

animationLoop();
