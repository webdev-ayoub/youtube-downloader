import { useState } from "react";
import { handleDownload } from "./handleDownload";

import Swal from "sweetalert2";
import { faClipboardCheck, faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function YtLink() {

   const [yt_link, setLink] = useState("");
   const [loader, setLoad] = useState(false);

   const handleinput = (e) => {
      setLink(e.target.value);
   }

   const paste = () => {
      navigator.clipboard.readText()
         .then((cliptext) => { setLink(cliptext) });
   }

   if (loader) {
      Swal.fire({
         title: 'Downloading...',
         position: "bottom",
         allowOutsideClick: false,
         showCancelButton: false,
         showCloseButton: false,
         showConfirmButton: false,
      });
   }

   const launch = (e) => {
      handleDownload(e, setLoad, setLink, yt_link);
   }

   return (
      <>
         <div className="container">
            <form
               onSubmit={launch}
               className="bg-secondary rounded shadow px-2 py-3"
            >
               <div className="form-group mb-3 d-flex gap-2">
                  {
                     yt_link !== "" ?
                        <button type="button" onClick={() => setLink("")} className="btn btn-primary">
                           <FontAwesomeIcon icon={faRotateBack} />
                        </button> : ""
                  }
                  <input
                     name="yt_link"
                     type="text"
                     value={yt_link}
                     onChange={handleinput}
                     className="form-control text-center"
                     placeholder="Paste your link"
                  />
                  <button
                     type="button"
                     id="paste-link"
                     className="btn btn-warning"
                     onClick={paste}
                  >
                     <FontAwesomeIcon icon={faClipboardCheck} className="fs-4 w-auto" />
                  </button>
               </div>
               <div className="text-center">
                  <button
                     type="submit"
                     className="btn btn-info fw-bold shadow"
                  >Start</button>
               </div>
            </form>
         </div>
      </>
   )
}

export default YtLink;