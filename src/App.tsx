import "@style/vars.scss";
import { type LinkPayload, LinkType } from "@components/Links/Link";
import Footer from "@/components/Footer/Footer";
import { maze } from "./other/maze";
import { useRef } from "react";
import Canvas from "./components/Canvas/Canvas";

function App() {
  const footerData: LinkPayload[] = [];
  const canvasRef = useRef<HTMLCanvasElement>(null);

  footerData.push({
    href: "https://www.linkedin.com/in/kaijauregi/",
    target: "_blank",
    textClassname: "fa-brands fa-linkedin",
  });
  footerData.push({
    href: "https://github.com/jauregiazcue",
    target: "_blank",
    textClassname: "fa-brands fa-square-github",
  });

  return (
    <>
      <section>
        <Canvas width={600} height={600}
          ref={canvasRef} init={maze.firstDraw} />

        <div>
          <input type="number"
            id="width"
            name="width" defaultValue="10" min="10" max="1000" onChange={
              (event: React.ChangeEvent<HTMLInputElement>) => { maze.handleWidthInputChange(event) }} />
          <input type="number"
            id="height"
            name="height" defaultValue="10" min="10" max="1000" onChange={
              (event: React.ChangeEvent<HTMLInputElement>) => { maze.handleHeightInputChange(event) }} />
          <select>
            <option value="someOption">Aldous Broder</option>
          </select>
          <button
            onClick={() => {
              if (maze.width < 10 || maze.height < 10) {
                if (canvasRef != null
                  && canvasRef.current != null) {
                  maze.errorDraw(
                    canvasRef.current.getContext("2d") as
                    CanvasRenderingContext2D);
                }
                return;
              }
              maze.init();
              if (canvasRef != null
                && canvasRef.current != null) {
                maze.draw(
                  canvasRef.current.getContext("2d") as
                  CanvasRenderingContext2D);
              }
            }}>
            Generate</button>
        </div>
      </section >



      <Footer id="contact"
        links={{ list: footerData, type: LinkType.simple }}
        owner={"Kai Jauregi Azcue"}
        email={"kai.jauregi@proton.me"} />
    </>
  )
}


export default App;

