// CanvasとBabylonをセットアップするコンポーネント
import React, { useState } from "react";
import * as BABYLON from "@babylonjs/core";

// glTFをロードするためにローダを追加
import "@babylonjs/loaders";

import BabylonCanvas from "./BabylonCanvas"; // import the component above linking to file we just created.

export default function BabylonComponent(props) {
  // hookでscene更新する
  const [scene, setScene] = useState();
  const [toggle, setToggle] = useState(false);

  // canvasがマウントされた後に呼ばれる
  // Babylon.jsのSceneに3D Objectをセットアップする
  const onSceneMount = async (e) => {
    const { canvas, scene, engine } = e;

    // コンソールデバッグ用
    console.log(canvas, scene, engine);

    // gltfのモデルをロード
    await BABYLON.SceneLoader.AppendAsync("/", "gltf/FWH_with_cp.glb", scene);

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
      "/textures/environment.dds",
      scene
    );
    hdrTexture.gammaSpace = false;
    scene.environmentTexture = hdrTexture;

    scene.createDefaultSkybox(hdrTexture, true, 100);

    // stateを更新
    setScene(scene);

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
      {scene ? (
        <button
          onClick={() => {
            click(scene, toggle, setToggle);
          }}
        >
          {toggle ? "表示" : "非表示"}
        </button>
      ) : null}
    </div>
  );
}

function click(scene, toggle, setToggle) {
  scene.meshes.forEach((e) => {
    if (toggle) {
      e.isVisible = true;
      return;
    }

    if (e.metadata && e.metadata.gltf.extras) {
      e.isVisible = true;
      return;
    }
    e.isVisible = false;
  });
  setToggle(!toggle);
}
