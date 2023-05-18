
import Image from 'next/image'
export default function Game() {

return (
  <main>
  <div id="debug"></div>
  <div id="menu">
    <h1>Shooter Game Demo</h1>
    <button id="start_game">NEW GAME</button>
  </div>
  <div id="game_hud">
    <Image
        src="/ui/crosshair.png"
        alt="crosshair"
        width="20"
        height="20"
        priority
      />
    {/* <img id="crosshair" src="<%=require('./ui/crosshair.png')%>" /> */}
    <div id="ammo_container">
      <span id="current_ammo">0</span>
      <span>|</span>
      <span id="max_ammo">0</span>
    </div>
    <div id="health_container">
      <div id="health_progress"></div>
    </div>
  </div>
  <div id="progress"></div>
  {/* <my-app></my-app> */}
  </main>
  )
}