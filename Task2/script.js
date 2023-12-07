import { 
        PerspectiveCamera,
        Mesh,
        BoxBufferGeometry,
        Scene,
        Color
        } from "https://github.com/mrdoob/three.js/tree/dev/build/three.module.js";

const container = document.querySelector("#AR_container");

const scene = new Scene();
scene.background = new Color(0x00dbed);

const camera = new PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 20);
camera.position.set(0, 0, 0.1);
camera.lookAt(0, 0, 0);
scene.add(camera);

const box_geo = new BoxBufferGeometry(0.1, 0.1, 0.1);
const box_mat = new MeshBasicMaterial({ color: 0x00ff00 });
const box = new Mesh(box_geo, box_mat);
box.position.set(0, 0, -0.5);
scene.add(box);

const renderer = new WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.xr.enabled = true;

container.appendChild(renderer.domElement);


