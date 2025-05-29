import { Bounce, toast } from "react-toastify";

const options = {
    position: "top-center" as const,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce
};
type toastType = "success" | "error" | "info" | "warning";
export const notify = (message: string, toastType: toastType) => {
    switch (toastType) {
        case "success":
            toast.success(message, options);
            break;
        case "error":
            toast.error(message, options);
            break;
        case "info":
            toast.info(message, options);
            break;
        case "warning":
            toast.warning(message, options);
            break;
        default:
            toast(message, options);
    }
};
