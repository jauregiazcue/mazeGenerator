import Canvas from "@/components/Canvas/Canvas";

import { useEffect, useRef, useState } from "react";
import { maze } from "./mazeGeneration";
import useWindowDimensions from "@/tools/WindowsDimension";
import "./Maze.scss";
import Card, { CardType } from "@/components/Card/Card";

function Maze() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [json, setJSON] = useState("The Json file will be displayed here");
  const { width } = useWindowDimensions();

  const size = width > 600 ? 600 : width - 100;
  function getCTX() {
    if (canvasRef != null
      && canvasRef.current != null) {
      return canvasRef.current.getContext("2d") as
        CanvasRenderingContext2D;
    }
    return null;
  }
  function OnGenPress() {
    const ctx = getCTX();
    if (!ctx) return;

    if (maze.size < 10) { maze.errorDraw(ctx); return; }
    maze.init();
    setJSON(maze.jsonString);
  }

  useEffect(() => {
    const ctx = getCTX();
    if (!ctx) return;
    maze.draw(ctx);
  });

  function OnSizeChange(event: React.ChangeEvent<HTMLInputElement>) {
    maze.handleSizeInputChange(event)
  }

  function OnStepXChange(add: number) {
    const ctx = getCTX();
    if (!ctx) return;
    maze.handleStepXInputChange(add, ctx);
  }

  function OnStepYChange(add: number) {
    const ctx = getCTX();
    if (!ctx) return;
    maze.handleStepYInputChange(add, ctx);
  }

  const body: React.ReactNode = <div className="maze--form">
    <div>

      <h4>Generation Algorithm:</h4>
      <select id="mazeGenType">
        <option value="a">Aldous Broder</option>
        <option value="b">Aldous 2</option>
      </select>

      <h4>Size:</h4>
      <input type="number"
        id="width" name="width"
        defaultValue="10" min="10" max="1000"
        onChange={OnSizeChange} />

      <button
        onClick={OnGenPress}>
        Generate</button>
      <h3>Movement</h3>

      <div id="btn-container">
        <button onClick={() => { OnStepYChange(-1) }} id="up"><div>{"V"}</div></button>
        <button onClick={() => { OnStepYChange(1) }} id="down"><div>{"V"}</div></button>
        <button onClick={() => { OnStepXChange(-1) }} id="left"><div>{"V"}</div></button>
        <button onClick={() => { OnStepXChange(1) }} id="right"><div>{"V"}</div></button>
      </div>
    </div>
  </div>;

  const header: React.ReactNode = <div className="maze--json">
    <h3>Maze JSON</h3>
    <button onClick={() => { navigator.clipboard.writeText(json); }}>Save to clipboard</button></div>;

  return <section className="maze">
    <Canvas width={size} height={size}
      ref={canvasRef} init={maze.firstDraw} />
    <Card type={CardType.sizelessInHeight} head={<h3>Maze Generation Settings</h3>} body={body} />
    <Card type={CardType.simple} head={header} body={json} />
  </section >
}

export default Maze;