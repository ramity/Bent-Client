var requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
                       window.mozRequestAnimationFrame || window.msRequestAnimationFrame ||
                       function(c) {window.setTimeout(c, 15)};

function createBox(scene, x, y, z, l, h, w)
{
  var plane = generateBox({x:x,y:y,z:z},{x:x+l,y:y+h,z:z+w});

  var cube = Phoria.Entity.create({
    points: plane.points,
    edges: plane.edges,
    polygons: plane.polygons,
    // style: {
    //   drawmode: "solid",
    //   shademode: "lightsource",
    //   fillmode: "filltwice"
    // }
    style: {
      color: [128,128,128],      // RGB colour of the object surface
      specular: 0,               // if not zero, specifies specular shinyness power - e.g. values like 16 or 64
      diffuse: 1.0,              // material diffusion generally ranges from 0-1
      emit: 0.0,                 // material emission (glow) 0-1
      opacity: 1.0,              // material opacity 0-1
      drawmode: "solid",         // one of "point", "wireframe", "solid"
      shademode: "lightsource",  // one of "plain", "lightsource", "sprite", "callback" (only for point rendering)
      fillmode: "filltwice",       // one of "fill", "filltwice", "inflate", "fillstroke", "hiddenline"
      objectsortmode: "sorted",  // coarse object sort - one of "sorted", "front", "back"
      geometrysortmode: "automatic",   // point, edge or polygon sorting mode - one of "sorted", "automatic", "none"
      linewidth: 1.0,            // wireframe line thickness
      linescale: 0.0,            // depth based scaling factor for wireframes - can be zero for no scaling
      doublesided: false,        // true to always render polygons - i.e. do not perform hidden surface test
      texture: undefined         // default texture index to use for polygons if not specified - e.g. when UVs are used
    }
  });
  scene.graph.push(cube);
}

//modified version of Phoria.Util.generateCuboid(desc) to use two coords
function generateBox(pointA, pointB)
{
  w = Math.abs(pointA.z - pointB.z);
  h = Math.abs(pointA.y - pointB.y);
  l = Math.abs(pointA.x - pointB.x);

  //pointA
  //bot left front
  //pointB
  //top right back

  return {
    points:[{x: pointA.x, y: pointB.y, z: pointA.z},//top left front
            {x: pointB.x, y: pointB.y, z: pointA.z},//top right front
            {x: pointB.x, y: pointA.y, z: pointA.z},//bot right front
            {x: pointA.x, y: pointA.y, z: pointA.z},//bot left front
            {x: pointA.x, y: pointB.y, z: pointB.z},//top left back
            {x: pointB.x, y: pointB.y, z: pointB.z},//top right back
            {x: pointB.x, y: pointA.y, z: pointB.z},//bot right back
            {x: pointA.x, y: pointA.y, z: pointB.z}],//bot left back
    edges: [{a:0,b:1}, {a:1,b:2}, {a:2,b:3},
            {a:3,b:0}, {a:4,b:5}, {a:5,b:6},
            {a:6,b:7}, {a:7,b:4}, {a:0,b:4},
            {a:1,b:5}, {a:2,b:6}, {a:3,b:7}],
    polygons:[{vertices:[0,1,2,3]},
              {vertices:[0,4,5,1]},
              {vertices:[1,5,6,2]},
              {vertices:[2,6,7,3]},
              {vertices:[4,0,3,7]},
              {vertices:[5,4,7,6]}]
  };
}
