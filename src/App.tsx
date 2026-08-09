import "@style/vars.scss";
import { type LinkPayload, LinkType } from "@components/Links/Link";
import Footer from "@/components/Footer/Footer";
import Maze from "./maze/Maze";



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
      <Maze />
      <Footer id="contact"
        links={{ list: footerData, type: LinkType.simple }}
        owner={"Kai Jauregi Azcue"}
        email={"kai.jauregi@proton.me"} />
    </>
  )
}


export default App;

