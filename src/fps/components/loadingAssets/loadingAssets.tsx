import { useAssetsStore } from "@/stores/assets";
import { useEffect, useState } from "react";
import { loadAssets } from "./loadAssets";


import {  FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import {  GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {  OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as THREE from 'three'


export function LoadingAssets() {

  const [progress, setProgress] = useState(0);
  const addAsset = useAssetsStore((state) => state.addAsset);

  async function addAssetHelper(url: string, loader: GLTFLoader | FBXLoader | OBJLoader | THREE.AudioLoader | THREE.TextureLoader, assetId: string): Promise<void>{
    const result = await loader.loadAsync(url)


    switch(assetId) {
      case "level":
        addAsset(assetId, result.scene)
        break;
      case 'muzzleFlash':
        addAsset(assetId, result.scene)
        break;
      deflaut:
        addAsset(assetId, result)
    }
  }

  useEffect(() => {
    async function doIt() {
      await loadAssets(addAssetHelper, setProgress)
      // TODO: set Loading Done
    }
    
    doIt()
  })



  return (
    <div>
      Loading: {progress}/100%
    </div>
  )
}