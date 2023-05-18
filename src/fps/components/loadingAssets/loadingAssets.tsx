import { useAssetsStore } from "@/stores/assets";
import { useState } from "react";

export function LoadingAssets() {

  const [percent, setPercent] = useState(0);
  const addAsset = useAssetsStore((state) => state.addAsset);


  function AddAsset(asset: any, loader: any, assetId: string){
    return loader.loadAsync(asset).then( (result: any) =>{
      addAsset(assetId, result)
    });
  }

 function  OnProgress(p: number){
    setPercent(p)
  
  }




  return (
    <div>
      Loading: {percent}/100%
    </div>
  )
}