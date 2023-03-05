import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { OrbitControls } from './OrbitControls.js'; var controls;
var tick = 0;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  42,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const color2 = new THREE.Color( 'skyblue' );
//scene.background = color2
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const rectLight = new THREE.PointLight(0x444444,2, 640);
rectLight.position.set(0, 20, 0);
rectLight.lookAt(0, 0, 0);
scene.add(rectLight);
const alight = new THREE.AmbientLight( 0x898989 );
scene.add( alight );

const stagearea = new THREE.PlaneGeometry(200,200);
stagearea.rotateX( - Math.PI / 2 );
const stagemat = new THREE.MeshStandardMaterial({ color: 0xffffff})
const stage = new THREE.Mesh(stagearea,stagemat); //scene.add(stage)
stage.receiveShadow = true; stage.castShadow=true;

const cube = new THREE.BoxGeometry(10,10,10);



class boxes{
    constructor(posx,posy,posz,direction,speed,duration,sx,sy,sz,cw,ydirection){
      const CubeMat = new THREE.MeshStandardMaterial({ color: cw});
      this.birthtick = tick;
      if(ydirection){
        this.yd = ydirection;
      }else{this.yd=0}
      this.boxItem = new THREE.Mesh(cube,CubeMat);
        this.velocity={
            ang:direction,
            spd:speed
        };
        this.du = duration
        this.position={
            x:posx-sx,
            y:posy-sy,
            z:posz-sz
            
        };
        this.scale={
          x:sx,y:sy,z:sz
        }
        this.boxItem.scale.set(sx,sy,sz);
        this.boxItem.position.x = this.position.x;
        this.boxItem.position.y = this.position.y;
        this.boxItem.position.z = this.position.z;
        
        scene.add(this.boxItem);
        this.boxItem.receiveShadow = true;
        this.boxItem.castShadow = true;
    }
    update(){
        if (tick - this.birthtick<=this.du){
          if(this.yd == 0){this.position.x += this.velocity.spd/100 * Math.cos(this.velocity.ang);
        this.position.z += this.velocity.spd/100 * Math.sin(this.velocity.ang);}
        this.position.y += this.velocity.spd/100 * this.yd
        }
        this.boxItem.position.x = this.position.x;
        this.boxItem.position.y = this.position.y;
        this.boxItem.position.z = this.position.z;
        //this.boxItem.scale.y += 0.01;
    }
}

const cubeStorage=[];

camera.position.x = -38;
camera.position.z = 15
camera.position.y=13
camera.lookAt(0,0,0)
stage.position.y = camera.position.y - 8
controls = new OrbitControls(camera, renderer.domElement)
function ntick() {
    requestAnimationFrame(ntick);
    renderer.render(scene, camera);
    document.getElementById("campos").innerHTML = 'x:'+String(camera.position.x)+', y='+String(camera.position.y)+', z='+String(camera.position.z);
    tick++;

    for(var ax=0; ax < cubeStorage.length; ax++){
      cubeStorage[ax].update()
    }
    //camera.position.x = Math.sin(Math.cos(tick/100))*400*Math.abs(Math.sin(tick/90)+1.2);
    //camera.position.z = Math.sin(Math.sin(tick/100))*400*Math.abs(Math.sin(tick/90)+1.2);
    //camera.position.y = Math.sin(tick/90)*160
    
}

//begin scriptin


setTimeout(function(){

  for(var g=0;g<8;g++){
    for(var i=0;i<8;i++){
      for(var c=0;c<8;c++){
        cubeStorage.push(new boxes(0,g*1,c,0,-i,100,0.05,0.05,0.05,0xfafaff))
      }
    }
}

},120)

cubeStorage.push(new boxes(6,4,8,0,0,0,0.05,0.05,0.05,0xfafaff))

function antcheck(){
  for(var ga=0;ga<8;ga++){
    for(var ca=0;ca<8;ca++){
      cubeStorage.push(new boxes(2,ga*1,ca,0,-10,100,0.03,0.03,0.03,0xff4444))
    }
    for(var cb=0;cb<8;cb++){
      cubeStorage.push(new boxes(-cb,ga*1,-2,Math.PI/2,10,100,0.03,0.03,0.03,0xff4444))
    }
    for(var cb=0;cb<8;cb++){
      cubeStorage.push(new boxes(-cb,9,ga,0,10,100,0.03,0.03,0.03,0xff4444,-1))
    }
  }
}


setTimeout(function(){
  antcheck()
},3200)

  ntick();