import * as React from 'react';
import * as BABYLON from 'babylonjs';
// SceneEventArgsのimportを追加
import BabylonCanvas　from './BabylonCanvas'; // import the component above linking to file we just created.

export default function BabylonComponent(props) {
    
    // canvasがマウントされた後に呼ばれる
    // Babylon.jsのSceneに3D Objectをセットアップする
    const onSceneMount = (e) => {
        const { canvas, scene, engine } = e;

        // カメラをシーンに座標を指定して設置
        var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);

        // シーンの原点にカメラを向ける
        camera.setTarget(BABYLON.Vector3.Zero());

        // canvasにカメラの制御をアタッチ
        // マウス操作やキーボード操作がBabylon.jsのカメラに反映されるようになる
        camera.attachControl(canvas, true);

        // シーンにライトを追加。光量を設定
        var light = new BABYLON.HemisphericLight("ligth", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        // Babylon.jsのRender Loopに描画処理を登録する
        // 毎フレーム描画処理が実行されるようになる
        engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
            }
        });
    }

        return (
            <div>
                <BabylonCanvas onSceneMount={onSceneMount} />
            </div>
        )
}