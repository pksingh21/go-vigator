import FolderImg from "./assets/images/windows11-folder-default.svg";
import JpgImg from "./assets/images/photo.png";
import TxtImg from "./assets/images/txt.png";
import PdfImg from "./assets/images/pdf.png";
import ExeImg from "./assets/images/exe.png";
import RarImg from "./assets/images/rar-icon.png"
import VidImg from "./assets/images/video-icon.png"
import WinImg from "./assets/images/winrar.svg"
import { GetIcon } from "../wailsjs/go/main/App"
import { useState, useEffect } from "react";

// function FolderImage(props: { filename: string, className: string }) {
//   if (props.filename.includes(".png") || props.filename.includes(".jpg") || props.filename.includes(".jpeg")) {
//     return (
//       <img src={JpgImg} id={props.filename} className={"rightPanelIcon " + props.className}></img>
//     );
//   }
//   if (props.filename.includes(".zip") || props.filename.includes(".rar")) {
//     return (
//       <img src={WinImg} id={props.filename} className={"rightPanelIcon " + props.className}></img>
//     );
//   }
//   if (props.filename.includes(".avi") || props.filename.includes(".mp4")) {
//     return (
//       <img src={VidImg} id={props.filename} className={"rightPanelIcon " + props.className}></img>
//     );
//   }
//   if (props.filename.includes(".txt") || props.filename[0] == ".") {
//     return (
//       <img src={TxtImg} id={props.filename} className={"rightPanelIcon " + props.className}></img>
//     );
//   }
//   if (props.filename.includes(".pdf")) {
//     return (
//       <img src={PdfImg} id={props.filename} className={"rightPanelIcon " + props.className}></img>
//     );
//   }
//   if (props.filename.includes(".exe")) {
//     return (
//       <img src={ExeImg} id={props.filename} className={"rightPanelIcon " + props.className}></img>
//     );
//   }
//   return (
//     <img src={FolderImg} id={props.filename} className={"rightPanelIcon " + props.className}></img>
//   );
// }

function FolderImage(props: { filename: string, className: string, currentpath: string }) {
  const [iconData, setIconData] = useState('');



  useEffect(() => {
    GetIcon(props.currentpath, props.filename).then((data: any) => {
      setIconData(data);
    }).catch((err: any) => {
      console.log("icon :", err)
    });
    // }
  }, []);

  return (
    <div>
      {iconData && (
        <img className={"rightPanelIcon " + props.className} src={`data:image/png;base64,${iconData}`} alt="Icon" />
      )}
    </div>
  )


}


export default FolderImage