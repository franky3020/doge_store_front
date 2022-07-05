import * as React from 'react';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

export interface IView3DProps {
  height: number;
  width: number;
  style: React.CSSProperties;
}

export interface IView3DState {
}

export default class View3D extends React.Component<IView3DProps, IView3DState> {

  renderer = new THREE.WebGLRenderer();
  scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera;

  modelView: React.RefObject<any>;

  loadedModel: GLTF | any = null;

  constructor(props: IView3DProps) {
    super(props);

    this.state = {
    }

    this.camera = new THREE.PerspectiveCamera(50, this.props.height / this.props.width, 0.1, 10000);

    this.modelView = React.createRef();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(props.height, props.width);

    this.camera.position.x = 0;
    this.camera.position.y = 2800;
    this.camera.position.z = 4000;

    let ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 5;
    this.scene.add(ambientLight);


  }

  animate() {
    requestAnimationFrame(this.animate.bind(this)); // 必須加上 bind, 因為有遞迴呼叫

    this.loadedModel.scene.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  };

  componentDidMount() {

    const textloader = new THREE.TextureLoader();
    const bgTexture = textloader.load(require(__dirname + '/../3d_models/white-bg2.jpg'));
    this.scene.background = bgTexture;


    const loader = new GLTFLoader();

    let that = this;

    if (that.loadedModel === null) {
      that.loadedModel = 1; // TODO: 暫時讓它只跑一次

      loader.load(require(__dirname + '/../3d_models/Gipsy_Dange.glb'), function (gltf) {

        that.loadedModel = gltf;
        that.scene.add(gltf.scene);

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

    this.camera.aspect = this.props.height / this.props.width;
    this.renderer.setSize(this.props.width, this.props.height);

    return (
      <div style={this.props.style} ref={this.modelView}>

      </div>
    );
  }
}
