import "@style/vars.scss";
import Link, { type LinkPayload, LinkType } from "@components/Links/Link";
import Footer from "@/components/Footer/Footer";
import Canvas from "./components/Canvas/Canvas";
import { laberynth } from "./other/laberynth";

function App() {
  const footerData: LinkPayload[] = [];
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
      <Link type={LinkType.navbar} list={[
        { href: "#hero", textClassname: "fa-solid fa-house" },
        { href: "#project", textClassname: "fa-solid fa-file" },
        { href: "#experience", textClassname: "fa-solid fa-handshake" },
        { href: "#contact", textClassname: "fa-solid fa-address-book" },
      ]} />


      <section>
        <h1>Test</h1>
        <Canvas draw={laberynth.draw} options={{ context: '2d' }} width={400} height={400} />
      </section>

      <Footer id="contact"
        links={{ list: footerData, type: LinkType.simple }}
        owner={"Kai Jauregi Azcue"}
        email={"kai.jauregi@proton.me"} />
    </>
  )
}


export default App;

