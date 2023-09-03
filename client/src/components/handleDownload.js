import axios from "axios";
import Swal from "sweetalert2";


const url = "http://127.0.0.1:5000/api/v1";
const reg = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;


export const handleDownload = async (e, setLoad, setLink, yt_link) => {
    e.preventDefault();
    try {
        if (reg.test(yt_link)) {
            setLoad(true);
            const response = await axios.post(url, { yt_link: yt_link });
            if (response.data === "Done") {
                setLoad(false);
                Swal.fire({
                    position: 'center',
                    heightAuto: true,
                    icon: 'success',
                    title: 'Downloaded',
                    showConfirmButton: false,
                    timer: 5000
                });
                setLink("");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
                setLink("");
            }
        } else if (yt_link !== "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops!! Wrong Link',
            });
            setLink("");
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Add a Youtube Link',
            });
        }
    } catch (error) {
        console.error("Error: ", error);
        setLoad(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        });
        setLink("");
    }
}
