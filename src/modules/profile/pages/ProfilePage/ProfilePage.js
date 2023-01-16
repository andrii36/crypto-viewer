import React, { useEffect } from "react";
import { Grid, Typography, Box, Button, Divider, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import styles from './ProfilePage.module.css';
import CopyToClipboardButton from "../../../../sharedComponents/CopyToClickboardButton";
import ModalComponent from "../../../../sharedComponents/ModalComponent";
import QRCode from "react-qr-code";

const ProfilePage = ({ mainWalletData, clearWalletAddress, getDataByWalletAddress }) => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalAddress, setModalAddress] = React.useState('');

    // const matches = useMediaQuery(
    //     json2mq({
    //         maxWidth: 540,
    //     }),
    // );

    const { tokens, ETH, address } = mainWalletData;
    const filteredTokens = tokens?.filter(({ tokenInfo }) => tokenInfo.price);

    useEffect(() => {
        getDataByWalletAddress(address);
    }, []);

    useEffect(() => {
        if (Object.keys(mainWalletData).length === 0) {
            navigate('/');
            return;
        };
    }, [mainWalletData]);

    const convertWei = (wei, decimals) => {
        let balance = Number(wei) / Math.pow(10, decimals);
        if (decimals === "6") balance = balance.toFixed(2);
        return balance;
    };

    const calculateUSDHoldings = (price, amount) => (price && amount) ? price * amount : 0;

    const calculateTotalTokensUSD = (tokens) => {
        return tokens?.reduce((acc, { tokenInfo, rawBalance }) => {
            const balance = convertWei(rawBalance, tokenInfo.decimals);
            const price = tokenInfo.price ? tokenInfo.price.rate : 0;
            const balanceUSD = balance * price;
            return acc + balanceUSD;
        }, 0);
    };

    const mainCryptoBalance = convertWei(ETH?.rawBalance, 18);
    const mainCryptoBalanceUSD = Number(calculateUSDHoldings(ETH?.price.rate, mainCryptoBalance));

    const deleteHandler = () => {
        clearWalletAddress();
    };

    const handleOpenQRModal = (address) => {
        setModalAddress(address);
        setModalOpen(true);
    };

    const handleCloseQRModal = () => {
        setModalOpen(false);
    };

    const renderTokenRow = ({ tokenInfo, rawBalance }) => {
        const balance = convertWei(rawBalance, tokenInfo.decimals);
        const price = tokenInfo.price ? tokenInfo.price.rate : null;
        const balanceUSD = calculateUSDHoldings(price, balance);

        return (
            <Grid item xs={12} textAlign='left' container className={styles.token_grid_row}>
                <Grid item xs={4} >{tokenInfo.name}</Grid>
                <Grid item xs={4} >{price && `$${price.toFixed(2)}`}</Grid>
                <Grid item xs={4} >{`${tokenInfo.symbol} ${Number(balance).toFixed(5)} / $${balanceUSD.toFixed(2)}`}</Grid>
            </Grid>
        )
    };

    return (
        <Grid item spacing={2} container direction='column'>
            <Grid item>
                <Box className={styles.currentAddressBox}>
                    <Grid container alignItems='center'>
                        <Grid item xs={11}>
                            <Typography sx={{color: '#797979', fontSize: '14px'}}>Current address:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton onClick={deleteHandler} color='primary' size="small">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} sx={{marginBottom: '10px'}}>
                            <Typography>{address}</Typography>
                        </Grid>
                        <Grid item xs={12} textAlign='right'>
                            <CopyToClipboardButton textToCopy={address} size='small' />
                            <Button variant="outlined" size="small" onClick={() => handleOpenQRModal(address)} sx={{marginLeft: '10px'}}>
                                Generate QR
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Grid item >
                <Box className={styles.portfolioBox}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ margin: '5px 0 19px 0' }}>
                                Portfolio total: ${(calculateTotalTokensUSD(filteredTokens) + mainCryptoBalanceUSD).toFixed(2)}
                            </Typography>
                            <Divider light sx={{ bgcolor: '#797979' }} />
                        </Grid>
                        <Grid item xs={12} textAlign='left' >
                            <Box className={styles.portfolio_label_row}>
                                <Grid container>
                                    <Grid item xs={4} >Token</Grid>
                                    <Grid item xs={4} >Price</Grid>
                                    <Grid item xs={4} >Holdings / USD</Grid>
                                </Grid>
                            </Box>
                        </Grid>

                        {ETH && renderTokenRow({
                            tokenInfo: { address, name: 'Etherium', symbol: 'Ether', decimals: "18", price: { rate: ETH.price.rate } },
                            rawBalance: ETH.rawBalance,
                        })}
                        {filteredTokens?.map(renderTokenRow)}
                    </Grid>
                </Box>
            </Grid>
            <ModalComponent open={modalOpen} onClose={handleCloseQRModal} sx={{width: 260}}>
                <QRCode value={modalAddress} />
            </ModalComponent>
        </Grid>
    );
};

export default ProfilePage;