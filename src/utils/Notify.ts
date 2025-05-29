import { Bounce, toast } from "react-toastify";

export const notify = (message:string)=> toast(message,{
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,});
