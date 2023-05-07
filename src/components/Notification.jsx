
import { Snackbar, Alert} from "@mui/material";



export const Notification = (props) => {
    const {notify, setNotify} = props;

    const handleClose = (event, reason) => {
       
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
        open={notify.isOpen}
        autoHideDuration={3000}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
        }}
        onClose={handleClose}>
            <Alert severity={notify.type}
            onClose={handleClose}>
                {notify.message}
                
            </Alert>
        </Snackbar>
    )

}