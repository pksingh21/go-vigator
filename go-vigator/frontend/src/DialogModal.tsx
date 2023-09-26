import { useEffect, useRef, useState } from "react";
import { CreateNewFile, CreateNewFolder } from "../wailsjs/go/main/App";

function DialogModal(props: { closeModal: (e: any) => void, openedModal: any, getFileInfo: any, setOpenedModal: any, Title: any, path: any }) {
    const dialogModal: any = useRef(null);
    const inputModal: any = useRef(null);
    const [isError, setisError] = useState(false);

    useEffect(() => {
        if (props.openedModal) {
            dialogModal.current?.showModal();
        } else {
            // console.log("ran ")
            dialogModal.current?.close();
        }
    }, [props.openedModal]);

    function submitForm(e: any) {
        e.preventDefault();
        console.log("Paths : ", inputModal.current.value, inputModal)
        if (props.Title == "New_File") {

            CreateNewFile(props.path, inputModal.current.value).then((val: boolean) => {
                if (val) {
                    console.log("Created : ");
                    props.closeModal(e);
                    props.getFileInfo();
                }
                else {
                    console.log("Fail: ");
                    setisError(true);
                }
            }).catch(() => { setisError(true); })

        }
        if (props.Title == "New_Folder") {
            CreateNewFolder(props.path, inputModal.current.value).then((val: boolean) => {
                if (val) {
                    console.log("Created : ");
                    props.closeModal(e);
                    props.getFileInfo();
                }
                else {
                    console.log("Fail: ");
                    setisError(true);
                }
            }).catch(() => { setisError(true); })
        }
        if (props.Title == "Refresh") {

        }
    }

    return (<dialog className="dialogModal" ref={dialogModal}>
        <form style={{ display: "flex" }} onSubmit={submitForm}>
            <div className="labelModal">
                <div>{props.Title}</div>
                <div onClick={props.closeModal}>X</div>
            </div>
            <input ref={inputModal} type="text" id="FileName"></input>
            {isError && <div style={{ color: "red", marginTop: "10px" }}>Can't Create a {props.Title} with this NAME</div>}
        </form>
    </dialog>);
}

export default DialogModal;