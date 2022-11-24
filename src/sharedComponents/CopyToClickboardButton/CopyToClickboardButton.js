import { Button, Snackbar } from "@mui/material";
import React from "react";


const CopyToClipboardButton = ({ textToCopy, size }) => {
    const [open, setOpen] = React.useState(false);
    
    const handleClick = () => {
        setOpen(true);
        navigator.clipboard.writeText(textToCopy);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClick} size={size}>Copy</Button>
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}
                message="Copied"
            />
        </>
    );
}
export default CopyToClipboardButton;