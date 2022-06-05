import * as React from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

export interface IView3DProps {
}

export interface IView3DState {
}

export default class View3D extends React.Component<IView3DProps, IView3DState> {

  renderer = new THREE.WebGLRenderer();
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;

  modelView: React.RefObject<any>;

  constructor(props: IView3DProps) {
    super(props);

    this.state = {
    }

    this.modelView = React.createRef();


    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.camera.position.z = 5;


  }

  animate() {
    requestAnimationFrame(this.animate.bind(this)); // 必須加上 bind, 因為有遞迴呼叫

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);

    
  };

  componentDidMount() {
    this.modelView.current.appendChild(this.renderer.domElement);
    this.animate();
  }

  public render() {
    return (
      <div ref={this.modelView}>

      </div>
    );
  }
}
