import {
        BoxGeometry,
        Color,
        Mesh,
        MeshBasicMaterial,
        PerspectiveCamera,
        Scene,
        WebGLRenderer,
      } from 'three';
      
      // Get a reference to the container element that will hold our scene
      const container = document.querySelector('#AR_container');
      let XR;
      // create a Scene
      const scene = new Scene();
      
      // Set the background color
      //scene.background = new Color("#0aB0FF");
      
      // Create a camera
      const fov = 35; // AKA Field of View
      const aspect = container.clientWidth / container.clientHeight;
      const near = 0.1; // the near clipping plane
      const far = 100; // the far clipping plane
      
      const camera = new PerspectiveCamera(fov, aspect, near, far);
      
      // every object is initially created at ( 0, 0, 0 )
      // move the camera back so we can view the scene
      camera.position.set(0, 0, 10);
      // create a geometry
      const geometry = new BoxGeometry(2, 2, 2);
     
      // create a default (white) Basic material
      const material = new MeshBasicMaterial();
      
      // create a Mesh containing the geometry and material
      const cube = new Mesh(geometry, material);
        cube.position.set(0, 0, -2);
      // add the mesh to the scene
      scene.add(cube);
      
      // create the renderer
      const flatRenderer = new WebGLRenderer();
      // next, set the renderer to the same size as our container element
      flatRenderer.setSize(container.clientWidth, container.clientHeight);
      
      // finally, set the pixel ratio so that our scene will look good on HiDPI displays
      flatRenderer.setPixelRatio(window.devicePixelRatio);
      
      // add the automatically created <canvas> element to the page
      container.append(flatRenderer.domElement);
      
      // render, or 'create a still image', of the scene
      flatRenderer.render(scene, camera);

      document.getElementById("XR_Button").onclick = activateXR;

      async function activateXR() {
        console.log("activateXR");
        
        if (!XR) {
                XR = true;
                //container.removeChild(flatRenderer.domElement);
                const XR_canvas = document.createElement("canvas");
                XR_canvas.id = "XR_canvas";
                XR_canvas.style.width = "100%";
                XR_canvas.style.height = "100%";
                //XR_canvas.style.position = "absolute";
                document.body.appendChild(XR_canvas);
                const gl = XR_canvas.getContext("webgl", { xrCompatible: true });

                const XR_Renderer = new WebGLRenderer({
                  alpha: true,
                  preserveDrawingBuffer: true,
                  canvas: XR_canvas,
                  context: gl
                });
                XR_Renderer.autoClear = false;

                const XR_camera = new PerspectiveCamera();
                XR_camera.matrixAutoUpdate = false;

                const XR_session =  await navigator.xr.requestSession("immersive-ar");
                XR_session.updateRenderState({
                  baseLayer: new XRWebGLLayer(XR_session, gl),
                });

                const referenceSpace = await XR_session.requestReferenceSpace("local");



                const onXRFrame = (time, frame) => {
                        XR_session.requestAnimationFrame(onXRFrame);
                        gl.bindFramebuffer(gl.FRAMEBUFFER, XR_session.renderState.baseLayer.framebuffer)

                        const pose = frame.getViewerPose(referenceSpace);
                        if(pose) {
                                const view = pose.views[0];

                                const viewport = XR_session.renderState.baseLayer.getViewport(view);
                                XR_Renderer.setSize(viewport.width, viewport.height);

                                XR_camera.matrix.fromArray(view.transform.matrix);
                                XR_camera.projectionMatrix.fromArray(view.projectionMatrix);
                                XR_camera.updateMatrixWorld(true);

                        }
                        XR_Renderer.render(scene, XR_camera);
                }
                XR_session.requestAnimationFrame(onXRFrame);
        }else{
                console.log("XR_canvas already exists");
        }
        
        }
