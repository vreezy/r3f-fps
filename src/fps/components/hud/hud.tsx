import { Crosshair } from "./crosshair";
import { Ammo } from "./ammo";
import { Health } from "./health";

export function Hud() {
  return (
    <div id="game_hud">
      <Crosshair />
      <Ammo />
      <Health />
    </div>
  );
}
