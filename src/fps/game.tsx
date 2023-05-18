import { Progress } from "./components/progress/progress";
import { Hud } from "./components/hud/hud";
import { Debug } from "./components/debug/debug";

export default function Game() {
  return (
    <main>
      <Debug />
      <Hud />
      <Progress />

      {/* <my-app></my-app> */}
    </main>
  );
}
