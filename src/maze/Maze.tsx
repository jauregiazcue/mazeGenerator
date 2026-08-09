import Canvas from "@/components/Canvas/Canvas";

import { useRef } from "react";
import { maze } from "./mazeGeneration";
import useWindowDimensions from "@/tools/WindowsDimension";
import "./Maze.scss";
import Card, { CardType } from "@/components/Card/Card";

function Maze() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width } = useWindowDimensions();

  const size = width > 600 ? 600 : width;
  function OnGenPress() {
    if (canvasRef != null
      && canvasRef.current != null) {

      const ctx =
        canvasRef.current.getContext("2d") as
        CanvasRenderingContext2D;

      if (maze.size < 10) { maze.errorDraw(ctx); return; }
      maze.init();
      maze.draw(ctx);
    }
  }

  function OnSizeChange(event: React.ChangeEvent<HTMLInputElement>) {
    maze.handleSizeInputChange(event)
  }

  const body: React.ReactNode = <>
    <input type="number"
      id="width"
      name="width" defaultValue="10" min="10" max="1000" onChange={OnSizeChange} />
    <select id="mazeGenType">
      <option value="a">Aldous Broder</option>
      <option value="b">Aldous 2</option>
    </select>
    <button
      onClick={OnGenPress}>
      Generate</button>
  </>

  return <section className = "maze">
    <Canvas width={size} height={size}
    ref={canvasRef} init={maze.firstDraw} />
    <Card type={CardType.sizelessInHeight} head={<h3>Maze Generation Settings</h3>} body={body} />
  </section >
}

export default Maze;