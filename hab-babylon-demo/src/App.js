// Reactのアプリケーションのトップレベルコンポーネント

import React from 'react';
import BabylonComponent from './BabylonComponent';
import '@csstools/normalize.css';

const App = () => {
  return (
    // 画面幅いっぱいにしとく
    <div style={{width: "100vw"}}>
        <BabylonComponent />
    </div>
  );
}

export default App;