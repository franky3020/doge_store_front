import * as React from 'react';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

export interface IView3DProps {
}

export interface IView3DState {
}

export default class View3D extends React.Component<IView3DProps, IView3DState> {

  renderer = new THREE.WebGLRenderer();
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;

  modelView: React.RefObject<any>;

  loadedModel: GLTF | any;

  constructor(props: IView3DProps) {
    super(props);

    this.state = {
    }

    this.modelView = React.createRef();
    this.loadedModel = null;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    // this.scene.add(this.cube);

    this.camera.position.x = 150;
    this.camera.position.y = 3000;
    this.camera.position.z = 4000;

    let ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 5;
    this.scene.add(ambientLight);


  }

  animate() {
    requestAnimationFrame(this.animate.bind(this)); // 必須加上 bind, 因為有遞迴呼叫

    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;

    // this.loadedModel.scene.rotation.x += 0.01;
    this.loadedModel.scene.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);


  };

  componentDidMount() {
    const loader = new GLTFLoader();

    let that = this;

    if (that.loadedModel === null) {
      that.loadedModel = 1; // Todo 暫時讓它只跑一次

      loader.load(require(__dirname + '/../testGlbModel/Gipsy_Dange.glb'), function (gltf) {

        that.loadedModel = gltf;
        that.scene.add(gltf.scene);

        console.log(that.scene);

        that.renderer.render(that.scene, that.camera);
        that.modelView.current.appendChild(that.renderer.domElement);
        that.render();
        that.animate();


      }, undefined, function (error) {

        console.error(error);

      });
    }


  }

  public render() {
    return (
      <div ref={this.modelView}>

      </div>
    );
  }
}
