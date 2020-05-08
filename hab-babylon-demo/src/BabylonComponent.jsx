import React from "react";
import * as BABYLON from "@babylonjs/core";
import BabylonCanvas　from './BabylonCanvas';

// glTFをロードするためにローダを追加
import "@babylonjs/loaders";


// CanvasとBabylonをセットアップするコンポーネント
export default function BabylonComponent(props) {

  // canvasがマウントされた後に呼ばれる
  // Babylon.jsのSceneに3D Objectをセットアップする
  const onSceneMount = async (e) => {
    const { canvas, scene, engine } = e;

    // コンソールデバッグ用
    console.log(canvas,scene,engine);

    // gltfのモデルをロード
    await BABYLON.SceneLoader.AppendAsync(
        "/",
        "gltf/FWH_with_cp.glb",
        scene)

    // カメラをシーンに座標を指定して設置
    const camera = new BABYLON.FreeCamera(
      "camera",
      new BABYLON.Vector3(0, 5, -10),
      scene
    );

    // ArcRotateCamera
    // const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 180, new BABYLON.Vector3(0, 5, -10), scene);

    // シーンの原点にカメラを向ける
    camera.setTarget(BABYLON.Vector3.Zero());

    // canvasにカメラの制御をアタッチ
    // マウス操作やキーボード操作がBabylon.jsのカメラに反映されるようになる
    camera.attachControl(canvas, true);

    // シーンにライトを追加。光量を設定
    // const light = new BABYLON.HemisphericLight("ligth", new BABYLON.Vector3(0, 1, 0), scene);
    // light.intensity = 0.7;

    // 背景画像設定
    var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
      "textures/environment.dds",
      scene
    );
    hdrTexture.gammaSpace = false;
    scene.environmentTexture = hdrTexture;

    scene.createDefaultSkybox(hdrTexture, true, 100);



    // Babylon.jsのRender Loopに描画処理を登録する
    // 毎フレーム描画処理が実行されるようになる
    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <BabylonCanvas onSceneMount={onSceneMount} />
    </div>
  );
}
