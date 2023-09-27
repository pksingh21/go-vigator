import FolderImg from "./assets/images/windows11-folder-default.svg";
import JpgImg from "./assets/images/photo.png";
import TxtImg from "./assets/images/txt.png";
import PdfImg from "./assets/images/pdf.png";
import ExeImg from "./assets/images/exe.png";

function FolderImage(props: { filename: string }) {
  if (props.filename.includes(".png") || props.filename.includes(".jpg")) {
    return (
      <img src={JpgImg} id={props.filename} className="rightPanelIcon"></img>
    );
  }
  if (props.filename.includes(".txt") || props.filename[0] == ".") {
    return (
      <img src={TxtImg} id={props.filename} className="rightPanelIcon"></img>
    );
  }
  if (props.filename.includes(".pdf")) {
    return (
      <img src={PdfImg} id={props.filename} className="rightPanelIcon"></img>
    );
  }
  if (props.filename.includes(".exe")) {
    return (
      <img src={ExeImg} id={props.filename} className="rightPanelIcon"></img>
    );
  }
  return (
    <img src={FolderImg} id={props.filename} className="rightPanelIcon"></img>
  );
}


export default FolderImage