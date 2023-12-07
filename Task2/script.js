import { 
        PerspectiveCamera,
        MeshBasicMaterial,
        Mesh,
        BoxGeometry,
        Scene,
        Color,
        WebGLRenderer
        } from "three";

const container = document.querySelector("#AR_container");

const scene = new Scene();
scene.background = new Color(0x00dbed);

const camera = new PerspectiveCamera(70, window.devicePixelRatio, 0.01, 20);
camera.position.set(0, 0, 0.1);
camera.lookAt(0, 0, 0);
scene.add(camera);

const box_geo = new BoxGeometry(0.1, 0.1, 0.1);
const box_mat = new MeshBasicMaterial({ color: 0x00ff00 });
const box = new Mesh(box_geo, box_mat);
box.position.set(0, 0, -0.5);
scene.add(box);

const renderer = new THREE.WebGLRenderer({
        alpha: true,
        preserveDrawingBuffer: true,
        canvas: canvas,
        context: gl
});
renderer.autoClear = false;a
renderer.render(scene, camera)
container.appendChild(renderer.domElement);


