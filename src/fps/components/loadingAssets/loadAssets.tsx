import * as THREE from 'three'

import {  FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import {  GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {  OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
// import {  SkeletonUtils } from 'three/examples/jsm/utils/SkeletonUtils'

import level from '../../../assets/level.glt'
import navmesh from '../../../assets/navmesh.obj'

import mutant from '../../../assets/animations/mutant.fbx'
import idleAnim from './assets/animations/mutant breathing idle.fbx'
import attackAnim from './assets/animations/Mutant Punch.fbx'
import walkAnim from './assets/animations/mutant walking.fbx'
import runAnim from './assets/animations/mutant run.fbx'
import dieAnim from './assets/animations/mutant dying.fbx'

//AK47 Model and textures
import ak47 from './assets/guns/ak47/ak47.glb'
import muzzleFlash from './assets/muzzle_flash.glb'
//Shot sound
import ak47Shot from './assets/sounds/ak47_shot.wav'

//Ammo box
import ammobox from './assets/ammo/AmmoBox.fbx'
import ammoboxTexD from './assets/ammo/AmmoBox_D.tga.png'
import ammoboxTexN from './assets/ammo/AmmoBox_N.tga.png'
import ammoboxTexM from './assets/ammo/AmmoBox_M.tga.png'
import ammoboxTexR from './assets/ammo/AmmoBox_R.tga.png'
import ammoboxTexAO from './assets/ammo/AmmoBox_AO.tga.png'

//Bullet Decal
import decalColor from './assets/decals/decal_c.jpg'
import decalNormal from './assets/decals/decal_n.jpg'
import decalAlpha from './assets/decals/decal_a.jpg'

//Sky
import skyTex from './assets/sky.jpg'


function promiseProgress(promises: Promise<any>[], progress_cb){
  let d = 0;
  progress_cb(0);
  for (const p of promises) {
    p.then(()=> {    
      d++;
      progress_cb( (d / promises.length) * 100 );
    });
  }
  return Promise.all(promises);
}

export async function loadAssets(addAssetHelper: (url: string, loader: GLTFLoader | FBXLoader | OBJLoader | THREE.AudioLoader | THREE.TextureLoader, assetId: string) => Promise<void>, setProgress: (progress: number) => void): Promise<void>{
  const gltfLoader = new GLTFLoader();
  const fbxLoader = new FBXLoader();
  const objLoader = new OBJLoader();
  const audioLoader = new THREE.AudioLoader();
  const texLoader = new THREE.TextureLoader();
  const promises: Promise<void>[] = [];

  //Level
  promises.push(addAssetHelper(level, gltfLoader, "level"));
  promises.push(addAssetHelper(navmesh, objLoader, "navmesh"));
  //Mutant
  promises.push(addAssetHelper(mutant, fbxLoader, "mutant"));
  promises.push(addAssetHelper(idleAnim, fbxLoader, "idleAnim"));
  promises.push(addAssetHelper(walkAnim, fbxLoader, "walkAnim"));
  promises.push(addAssetHelper(runAnim, fbxLoader, "runAnim"));
  promises.push(addAssetHelper(attackAnim, fbxLoader, "attackAnim"));
  promises.push(addAssetHelper(dieAnim, fbxLoader, "dieAnim"));
  //AK47
  promises.push(addAssetHelper(ak47, gltfLoader, "ak47"));
  promises.push(addAssetHelper(muzzleFlash, gltfLoader, "muzzleFlash"));
  promises.push(addAssetHelper(ak47Shot, audioLoader, "ak47Shot"));
  //Ammo box
  promises.push(addAssetHelper(ammobox, fbxLoader, "ammobox"));
  promises.push(addAssetHelper(ammoboxTexD, texLoader, "ammoboxTexD"));
  promises.push(addAssetHelper(ammoboxTexN, texLoader, "ammoboxTexN"));
  promises.push(addAssetHelper(ammoboxTexM, texLoader, "ammoboxTexM"));
  promises.push(addAssetHelper(ammoboxTexR, texLoader, "ammoboxTexR"));
  promises.push(addAssetHelper(ammoboxTexAO, texLoader, "ammoboxTexAO"));
  //Decal
  promises.push(addAssetHelper(decalColor, texLoader, "decalColor"));
  promises.push(addAssetHelper(decalNormal, texLoader, "decalNormal"));
  promises.push(addAssetHelper(decalAlpha, texLoader, "decalAlpha"));

  promises.push(addAssetHelper(skyTex, texLoader, "skyTex"));


  await promiseProgress(promises, setProgress);

  //Extract mutant anims
  this.mutantAnims = {};
  this.SetAnim('idle', this.assets['idleAnim']);
  this.SetAnim('walk', this.assets['walkAnim']);
  this.SetAnim('run', this.assets['runAnim']);
  this.SetAnim('attack', this.assets['attackAnim']);
  this.SetAnim('die', this.assets['dieAnim']);

  this.assets['ak47'].scene.animations = this.assets['ak47'].animations;
  
  //Set ammo box textures and other props
  this.assets['ammobox'].scale.set(0.01, 0.01, 0.01);
  this.assets['ammobox'].traverse(child =>{
    child.castShadow = true;
    child.receiveShadow = true;
    
    child.material = new THREE.MeshStandardMaterial({
      map: this.assets['ammoboxTexD'],
      aoMap: this.assets['ammoboxTexAO'],
      normalMap: this.assets['ammoboxTexN'],
      metalness: 1,
      metalnessMap: this.assets['ammoboxTexM'],
      roughnessMap: this.assets['ammoboxTexR'],
      color: new THREE.Color(0.4, 0.4, 0.4)
    });
    
  });

  this.assets['ammoboxShape'] = createConvexHullShape(this.assets['ammobox']);

  this.HideProgress();
  this.ShowMenu();
}