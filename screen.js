(function() {
  var screen = document.getElementById("screen");

  var map = new Array();
  for(x = 0;x < 200;x++)
  {
    map[x] = new Array();

    for(y = 0;y < 200;y++)
    {
      map[x][y] = "0";
    }
  }

  ctx = screen.getContext('2d');
  ctx.fillStyle = "#000";

  width = window.innerWidth
  height = window.innerHeight;

  screen.width = width;
  screen.height = height;

  size = {};
  size.w = 100 / width;
  size.h = 100 / height;

  for(x = 0;x < 100;x++)
  {
    for(y = 0;y < 100;y++)
    {

    }
  }

  console.log('done');

  // get the canvas DOM element and the 2D drawing context
  var canvas = document.getElementById('screen');

  // create the scene and setup camera, perspective and viewport
  var scene = new Phoria.Scene();
  scene.camera.position = {x:0.5, y:2, z:-2.0};
  scene.camera.lookat = {x:0.5, y:0.5, z:0.5};
  scene.perspective.aspect = canvas.width / canvas.height;
  scene.perspective.fov = 90;
  scene.viewport.width = canvas.width;
  scene.viewport.height = canvas.height;

  // create a canvas renderer
  var renderer = new Phoria.CanvasRenderer(canvas);

  createBox(scene,-2,0,2,5,1,1);
  createBox(scene,2,0,-1,1,1,3);
  createBox(scene,-2,0,-1,1,1,3);
  //floor
  createBox(scene,-1,0,-1,3,0,3);
  createBox(scene,-2,0,-2,5,1,1);

  // add a light
  var visibleLightObj = Phoria.Entity.create({
     points: [{x:0.5, y:3.5, z:0.5}],
     style: {
        color: [0, 0, 0],
        drawmode: "point",
        shademode: "plain",
        linewidth: 5,
        linescale: 2
     }
  });
  scene.graph.push(visibleLightObj);
  var light = Phoria.PointLight.create({
     color: [1, 1, 1],
     position: {x:0.5, y:3.5, z:0.5},
     intensity: 1,
     attenuation: 0.25
  });
  visibleLightObj.children.push(light);

  var pause = false;
  var fnAnimate = function()
  {
    if(!pause)
    {
      // the light position is edited directly via the GUI - update the visible indicator
      visibleLightObj.points[0].x = light.position.x;
      visibleLightObj.points[0].y = light.position.y;
      visibleLightObj.points[0].z = light.position.z;

      // execute the model view 3D pipeline
      scene.modelView();
      // and render the scene
      renderer.render(scene);
    }

    requestAnimFrame(fnAnimate);
  };

  // add GUI controls
  var gui = new dat.GUI();
  var f = gui.addFolder('Perspective');
  f.add(scene.perspective, "fov").min(5).max(175);
  f.add(scene.perspective, "near").min(1).max(100);
  f.add(scene.perspective, "far").min(1).max(1000);
  f = gui.addFolder('Camera LookAt');
  f.add(scene.camera.lookat, "x").min(-100).max(100);
  f.add(scene.camera.lookat, "y").min(-100).max(100);
  f.add(scene.camera.lookat, "z").min(-100).max(100);
  f = gui.addFolder('Camera Position');
  f.add(scene.camera.position, "x").min(-100).max(100);
  f.add(scene.camera.position, "y").min(-100).max(100);
  f.add(scene.camera.position, "z").min(-100).max(100);
  f.open();
  f = gui.addFolder('Camera Up');
  f.add(scene.camera.up, "x").min(-10).max(10).step(0.1);
  f.add(scene.camera.up, "y").min(-10).max(10).step(0.1);
  f.add(scene.camera.up, "z").min(-10).max(10).step(0.1);
  f = gui.addFolder('Light');
  f.add(light.position, "x").min(-25).max(25).step(0.1);
  f.add(light.position, "y").min(-25).max(25).step(0.1);
  f.add(light.position, "z").min(-25).max(25).step(0.1);
  f.add(light.color, "0").min(0).max(1).step(0.1).name("red");
  f.add(light.color, "1").min(0).max(1).step(0.1).name("green");
  f.add(light.color, "2").min(0).max(1).step(0.1).name("blue");
  f.add(light, "intensity").min(0).max(1).step(0.1);
  f.add(light, "attenuation").min(0.01).max(0.25).step(0.01);
  f.open();

  // key binding
  document.addEventListener('keydown', function(e) {
     switch (e.keyCode)
     {
        case 37: // LEFT
           rot.y = -2;
           break;
        case 39: // RIGHT
           rot.y += 2;
           break;
        case 38: // UP
           rot.x -= 2;
           e.preventDefault();
           break;
        case 40: // DOWN
           rot.x += 2;
           e.preventDefault();
           break;
        case 90: // Z
           rot.z += 2;
           break;
        case 88: // X
           rot.z -= 2;
           break;
        case 27:
        {
           pause = !pause;
           break;
        }
     }
  }, false);

  // start animation
  requestAnimFrame(fnAnimate);
})();
