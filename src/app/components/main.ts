import { Component, ElementRef, NgZone, OnInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { LineBasicMaterial } from 'three';

@Component({
  selector: 'main-page',
  template: ``
})
export class MainPage implements OnInit, OnDestroy {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private objLoader!: OBJLoader;

  constructor(private ngZone: NgZone, private elementRef: ElementRef) {}

  ngOnInit() {
    this.createScene();
    this.createCamera();
    this.loadOBJModel();
    this.render();
  }

  ngOnDestroy() {
    // Clean up resources when the component is destroyed
  }

  private createScene() {
    this.scene = new THREE.Scene();

    // Create a lightning line
    const points = [];
    points.push(new THREE.Vector3(0, 0, 0)); // Start point
    points.push(new THREE.Vector3(0, 3, 0)); // End point
    const lightningGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const lightningMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const lightning = new THREE.Line(lightningGeometry, lightningMaterial);
    lightning.name = 'lightning'; // Set a name for identification
    this.scene.add(lightning);
  }

  private createCamera() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 10000);
    this.camera.position.z = 130;
    this.camera.position.y = 100;
  }

  private loadOBJModel() {
    this.objLoader = new OBJLoader();
    this.objLoader.load('../../assets/3d/dk.obj', (object) => {
      // Adjust the position, scale, or other properties of the loaded model if needed
      this.scene.add(object);
    });
  }

  private render() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.elementRef.nativeElement.appendChild(this.renderer.domElement);
    this.renderer.setClearColor(0xffffff);

    const animate = () => {
      this.ngZone.run(() => {
        this.update();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }

  private update() {
    // Update the lightning position and appearance

      this.renderer.render(this.scene, this.camera);

  }
}
