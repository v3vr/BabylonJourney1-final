import {
  Engine,
  Scene,
  Vector3,
  SceneLoader,
  ArcRotateCamera
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF/2.0";
import "@babylonjs/core/Helpers/sceneHelpers";
import damagedHelmet from "../src/assets/DamagedHelmet.glb";
import forest from "../src/assets/forest.env";

const canvas = document.getElementById("renderCanvas");
const engine = new Engine(canvas, true);

const scene = new Scene(engine);
const camera = new ArcRotateCamera("camera", 1, 1, 4, new Vector3(0, 0, 0));
camera.attachControl(canvas, true);

scene.createDefaultEnvironment({
  environmentTexture: forest,
  skyboxTexture: forest
});

engine.runRenderLoop(function () {
  scene.render();
});
window.addEventListener("resize", () => {
  engine.resize();
});

SceneLoader.ImportMeshAsync("", damagedHelmet, null, scene).then((helmet) => {
  helmet.meshes[0].position.y = 2;
  camera.setTarget(helmet.meshes[0]);

  scene.onBeforeRenderObservable.add(() => {
    helmet.meshes[0].rotate(new Vector3(0, 1, 0), 0.001);
  });
});
