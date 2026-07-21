import Aurora from "./aurora";
import Grid from "./grid";
import Spotlight from "./spotlight";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-40 overflow-hidden">
      <Grid />
      <Aurora />
      <Spotlight />
    </div>
  );
}