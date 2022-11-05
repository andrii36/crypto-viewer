import React, { useEffect } from "react";
import { Button, Container, Input, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = ({mainWalletAddress, getDataByWalletAddress}) => {
    const [walletAddress, setWalletAddress] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if(mainWalletAddress){
            navigate('/wallet');
            return;
        };
    }, [mainWalletAddress]);

    const handleWalletAddressChange = (e) => {
        setWalletAddress(e.target.value);
    }
    const handleSubmitClick = () => {
        if (walletAddress) {
            getDataByWalletAddress(walletAddress);
            setWalletAddress('');
        }
    }

    return (
        <Container maxWidth={false}>
            <Typography
                variant='h6'
            >
                Welcome to the Crypto Viewer
            </Typography>
            <Input
                id="standard-input"
                placeholder="Wallet address"
                onChange={handleWalletAddressChange}
                value={walletAddress}
                fullWidth
            />
            <Button
                variant="contained"
                color="success"
                size='small'
                onClick={handleSubmitClick}
            >
                Submit
            </Button>
        </Container>
    )
}

export default HomePage;