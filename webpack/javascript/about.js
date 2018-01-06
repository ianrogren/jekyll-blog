/* jshint esversion: 6 */
/* eslint-env browser */
/* eslint-disable global-require */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* global THREE */

/**
 * Three.js animation based off of a CodePen by Captain Anonymous
 * https://codepen.io/anon/pen/NwVXOR?limit=all&page=3&q=three+js
 */

exports.aboutInit = function aboutInit() {
  /**
   * Settings
   */
  const r = 4.5;
  const numCorners = 1;
  const resolution = 150;
  const lineShape = [
    0.065,
    0.048,
    0.035,
    0.020,
    0.027,
    0.040,
    0.052,
    0.022,
    0.035,
    0.025,
  ];
  const num = 10;
  const colors = [
    0x0c457d,
    0x0b5e56,
    0x2E4952,
    0x1aa3a3,
    0x379392,
    0x00d2ff,
    0x0BC9C7,
    0xb2e5e5,
    0x86becb,
    0xffffff,
  ];
  let counter = 0;
  let mouseMoving = false;
  let additionalCorners = 0;
  let checkDelay = false;

  /**
   * Scene & Render
   */
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(65, windowWidth / windowHeight, 0.1, 1000);
  camera.position.z = 10;

  const renderer = window.WebGLRenderingContext ?
    new THREE.WebGLRenderer({ antialias: true }) : new THREE.CanvasRenderer();
  renderer.setClearColor(new THREE.Color(0x0d0d0e), 1.0);
  renderer.setSize(700, 560);

  document.getElementById('about-animation').appendChild(renderer.domElement);
  const animation = document.getElementById('about-animation');

  const group = new THREE.Object3D();
  const subGroup = new THREE.Object3D();
  const verts = [];
  const objects = [];
  let s_r = (r / 20) + ((Math.sin(0) * r) / 20);

  subGroup.rotation.x = (Math.PI / 180) * 360;
  group.rotation.x = (Math.PI / 180) * 360;
  scene.add(group);
  scene.add(subGroup);


  /**
   * Generate Points
   */
  function generatePoints(radius, wavewindowHeight, animationShape, waveTypes) {
    const newPositions = [];

    for (let i = 0; i <= resolution; i++) {
      const angle = ((2 * Math.PI) / resolution) * i;
      const speedIncrementer = counter / 50;
      const sinePercent = 1;
      let radiusAddon = 0;

      if (i < sinePercent * resolution || i === resolution) {
        const smoothingAmount = 0.25;
        let smoothPercent = 1;

        if (i < sinePercent * resolution * smoothingAmount) {
          smoothPercent = i / (sinePercent * resolution * smoothingAmount);
        }

        if (i > sinePercent * resolution * (1 - smoothingAmount)
          && i <= sinePercent * resolution) {
          smoothPercent = ((sinePercent * resolution) - i) / (sinePercent * resolution * smoothingAmount);
        }

        if (i === resolution) {
          smoothPercent = 0;
        }

        if (waveTypes % 2 === 0) {
          radiusAddon = (wavewindowHeight * smoothPercent) * Math.cos((angle + ((Math.PI / 180) * (30 * waveTypes)) + speedIncrementer) * animationShape);
        } else {
          radiusAddon = (wavewindowHeight * smoothPercent) * Math.sin((angle + ((Math.PI / 180) * ((30 * waveTypes) + 10)) + speedIncrementer) * animationShape);
        }
      }

      const x = (radius + radiusAddon) * Math.cos(angle + speedIncrementer);
      const y = (radius + radiusAddon) * Math.sin(angle + speedIncrementer);
      const z = 0;

      newPositions.push([x, y, z]);
    } //console.log(newPositions);

    return newPositions;
  }


  /**
   * Generate Vertices
   */
  function generateVertices(points, points2) {
    const vertexPositions = [];

    for (let i = 0; i < points.length - 1; i++) {
      vertexPositions.push(points[i], points2[i], points[i + 1]);
      vertexPositions.push(points2[i], points2[i + 1], points[i + 1]);
    }

    vertexPositions.push(points[points.length - 1], points2[points.length - 1], points[0]);
    const vertices = new Float32Array(vertexPositions.length * 3);

    for (let i = 0; i < vertexPositions.length; i++) {
      vertices[(i * 3) + 0] = vertexPositions[i][0];
      vertices[(i * 3) + 1] = vertexPositions[i][1];
      vertices[(i * 3) + 2] = vertexPositions[i][2];
    }

    return vertices;
  }


  /**
   * Create Mesh
   */
  function createMesh(clr, rCoof, verticeArray, waveTypes) {
    const geometry = new THREE.BufferGeometry();
    const points = generatePoints(r, s_r, 5, waveTypes);
    const points2 = generatePoints(r * (1 - rCoof), s_r, 5, waveTypes);
    const vertices = generateVertices(points, points2);
    const material = new THREE.MeshBasicMaterial({
      color: clr,
      wireframe: true,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    verticeArray.push(vertices);
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    mesh.animationShape = numCorners;
    mesh.anim = -1;
    mesh.rCoof = rCoof;
    mesh.waveTypes = waveTypes;
    return mesh;
  }

  for (let i = 0; i < num; i++) {
    const obj = createMesh(colors[i], 1 + (lineShape[i] * 0.9 * i), verts, i);
    objects.push(obj);
    subGroup.add(obj);
    obj.rotation.y = (Math.PI / 180) * 180;
  }


  /**
   * Update Vertices
   */
  function updateVertices(points, points2, vertArray) {
    const vertexPositions = [];

    for (let i = 0; i < points.length - 1; i++) {
      vertexPositions.push(points[i], points2[i], points[i + 1]);
      vertexPositions.push(points2[i], points2[i + 1], points[i + 1]);
    }

    vertexPositions.push(points[points.length - 1], points2[points.length - 1], points[0]);

    for (let i = 0; i < vertexPositions.length; i++) {
      vertArray[(i * 3) + 0] = vertexPositions[i][0];
      vertArray[(i * 3) + 1] = vertexPositions[i][1];
      vertArray[(i * 3) + 2] = vertexPositions[i][2];
    }
  }

  /**
   * Check Additional Corners
   * Mouse movement check to add/subtract wave corners.
   */
  function checkAdditionalCorners() {
    if (checkDelay === false) {
      checkDelay = true;

      if (mouseMoving === true) {
        additionalCorners += 0.001;
      }

      if (mouseMoving === false) {
        if (additionalCorners > 1) {
          additionalCorners -= 0.001;
        }
      }

      setTimeout(() => {
        checkDelay = false;
      }, 20);
      mouseMoving = false;
    }
  }

  /**
   * Loop
   */
  function loop() {
    requestAnimationFrame(loop);

    for (let k = 0; k < objects.length; k++) {
      const obj = objects[k];
      const radius = r * obj.rCoof;
      s_r = radius / 12;
      checkAdditionalCorners();
      const points = generatePoints(radius, s_r, obj.animationShape + additionalCorners, obj.waveTypes);
      const points2 = generatePoints(radius * (1 - lineShape[k]), s_r, obj.animationShape + additionalCorners, obj.waveTypes);
      updateVertices(points, points2, verts[k]);
      // obj.rotation.x += .01;
      obj.geometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
    counter++;
  }

  /**
   * onWindowResize
   */
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(700, 560);
  }

  loop();
  window.addEventListener('resize', onWindowResize, false);
  animation.addEventListener('mousemove', () => {
    mouseMoving = true;
  });
};
