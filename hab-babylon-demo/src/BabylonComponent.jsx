// CanvasとBabylonをセットアップするコンポーネント

import * as React from "react";
import * as BABYLON from "babylonjs";
// SceneEventArgsのimportを追加
import BabylonCanvas from "./BabylonCanvas"; // import the component above linking to file we just created.

export default function BabylonComponent(props) {
  // canvasがマウントされた後に呼ばれる
  // Babylon.jsのSceneに3D Objectをセットアップする
  const onSceneMount = async (e) => {
    const { canvas, scene, engine } = e;

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

    // 横に10個くらい並べる
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    array.forEach((idx) => {
      const sphere = BABYLON.MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 2 },
        scene
      );
      sphere.position.x = idx * 4;
      // PBRマテリアルを球に設定してみる
      const metalicPbr = new BABYLON.PBRMetallicRoughnessMaterial("pbr", scene);
      metalicPbr.baseColor = new BABYLON.Color3(1.0, 0.766, 0.336 * idx);
      metalicPbr.metallic = 1.0;
      metalicPbr.roughness = 0.0;

      sphere.material = metalicPbr;
    });

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
