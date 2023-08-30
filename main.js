import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import sunMap from "./img/sun-map.jpeg";
import mercuryMap from "./img/mercury-map.jpeg";
import venusMap from "./img/venus-map.jpeg";
import earthMap from "./img/earth-map.jpg";
import marsMap from "./img/mars-map.jpeg";
import jupiterMap from "./img/jupiter-map.jpeg";
import saturnMap from "./img/saturn-map.jpeg";
import uranusMap from "./img/uranus-map.jpeg";
import neptuneMap from "./img/neptune-map.jpeg";

const dims = {
	width: document.documentElement.clientWidth,
	height: document.documentElement.clientHeight,
};

const scene = new THREE.Scene();

const sun = new THREE.Mesh(
	new THREE.SphereGeometry(10, 64, 64),
	new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load(sunMap),
	})
);

scene.add(sun);

function addStars(count, color) {
	const starPositions = [];

	for (let i = 0; i < count; i++) {
		const x = (Math.random() - 0.5) * 2000 + 200;
		const y = (Math.random() - 0.5) * 2000 + 200;
		const z = (Math.random() - 0.5) * 2000 + 200;
		starPositions.push(x, y, z);
	}

	const starGeometry = new THREE.BufferGeometry().setAttribute(
		"position",
		new THREE.Float32BufferAttribute(starPositions, 3)
	);

	const starMaterial = new THREE.PointsMaterial({
		color,
	});

	const stars = new THREE.Points(starGeometry, starMaterial);

	scene.add(stars);
}

addStars(15000, 0xfdf4dc);

function addPlanet(size, map, tilt, position) {
	const mesh = new THREE.Mesh(
		new THREE.SphereGeometry(size, 64, 64),
		new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader().load(map),
		})
	);
	mesh.rotateZ((tilt * Math.PI) / 180);
	mesh.position.x = position;

	const group = new THREE.Group();
	group.add(mesh);
	group.rotateY(Math.random() * Math.PI * 2);
	scene.add(group);
	return { mesh, group };
}

const mercury = addPlanet(1, mercuryMap, 0, 18);
const venus = addPlanet(1.5, venusMap, 180, 22);
const earth = addPlanet(2, earthMap, 0, 27);
const mars = addPlanet(2, marsMap, 0, 34);
const jupiter = addPlanet(3, jupiterMap, 0, 44);
const saturn = addPlanet(4, saturnMap, 0, 56);
const uranus = addPlanet(5, uranusMap, 0, 69);
const neptune = addPlanet(4, neptuneMap, 0, 85);

const camera = new THREE.PerspectiveCamera(45, dims.width / dims.height);
camera.position.y = 125;
camera.position.z = 200;
scene.add(camera);

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(dims.width, dims.height);
renderer.setPixelRatio(3);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = true;
controls.enableZoom = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.5;

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
	sun.rotateY(0.004);
	mercury.mesh.rotateY(0.015);
	venus.mesh.rotateY(0.02);
	earth.mesh.rotateY(0.01);
	mars.mesh.rotateY(0.01);
	jupiter.mesh.rotateY(0.01);
	saturn.mesh.rotateY(0.01);
	uranus.mesh.rotateY(0.01);
	neptune.mesh.rotateY(0.01);

	mercury.group.rotateY(0.026);
	venus.group.rotateY(0.018);
	earth.group.rotateY(0.005);
	mars.group.rotateY(0.008);
	jupiter.group.rotateY(0.03);
	saturn.group.rotateY(0.026);
	uranus.group.rotateY(0.01);
	neptune.group.rotateY(0.0081);

	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(animationLoop);
};

animationLoop();
