import React, { useEffect } from "react";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Box, Button, Divider } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import styles from './WalletInfoPage.module.css';
import json2mq from 'json2mq';
import useMediaQuery from '@mui/material/useMediaQuery';
import CopyToClipboardButton from "../../../../sharedComponents/CopyToClickboardButton";
import { shortenContractAddress } from "../../../../utils/portfolioDataUtils";
import ModalComponent from "../../../../sharedComponents/ModalComponent";

const WalletInfoPage = ({ mainWalletData, clearWalletData, getDataByWalletAddress }) => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalAddress, setModalAddress] = React.useState('');

    const matches = useMediaQuery(
        json2mq({
            maxWidth: 540,
        }),
    );

    const { tokens, ETH, address } = mainWalletData;

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
        clearWalletData();
    };

    const handleOpenModal = (address) => {
        setModalAddress(address);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const renderTokenRow = ({ tokenInfo, rawBalance }) => {
        const balance = convertWei(rawBalance, tokenInfo.decimals);
        const price = tokenInfo.price ? tokenInfo.price.rate : null;
        const balanceUSD = calculateUSDHoldings(price, balance);

        return (
            <>
                <TableRow
                    key={tokenInfo.address}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {tokenInfo.name}
                    </TableCell>
                    <TableCell align="right">
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{ width: '120px', textTransform: 'none' }}
                            onClick={() => handleOpenModal(tokenInfo.address)}
                        >
                            {`...${shortenContractAddress(tokenInfo.address)}`}
                        </Button>
                    </TableCell>
                    <TableCell align="right">{price && `$${price.toFixed(2)}`}</TableCell>
                    <TableCell align="right">{`${balance} ${tokenInfo.symbol}`}</TableCell>
                    <TableCell align="right">${balanceUSD.toFixed(2)}</TableCell>
                </TableRow>
                <ModalComponent open={modalOpen} onClose={handleCloseModal}>
                    <Grid container>
                        <Grid item xs={10} textAlign='center'>
                            <Typography>{modalAddress}</Typography>
                        </Grid>
                        <Grid item xs={2} textAlign='center'>
                            <CopyToClipboardButton textToCopy={modalAddress} size='small' />
                        </Grid>
                    </Grid>
                </ModalComponent>
            </>
        )
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={matches ? 12 : 4} className={styles.currentAddress}>
                <Box className={styles.currentAddressBox}>
                    <Typography>
                        Current address:
                    </Typography>
                    <Typography>{address}</Typography>
                    <Grid container >
                        <Grid item xs={5} textAlign='right'>
                            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteHandler} size="small">
                                Remove
                            </Button>
                        </Grid>
                        <Grid item xs={2} textAlign='center'>
                            <Divider orientation="vertical" sx={{width: '3px', margin: 'auto'}}/>
                        </Grid>
                        <Grid item xs={5} textAlign='left'>
                            <CopyToClipboardButton textToCopy={address} size='small' />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Grid item xs={matches ? 12 : 8}>
                <Typography variant="h5">Portfolio</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Token</TableCell>
                                <TableCell align="right">Contract Address</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Holdings</TableCell>
                                <TableCell align="right">USD Holdings</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ETH && renderTokenRow({
                                tokenInfo: {address, name: 'Etherium', symbol: 'Ether', decimals: "18", price: {rate: ETH.price.rate}},
                                rawBalance: ETH.rawBalance,
                            })}
                            {tokens?.map(renderTokenRow)}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography variant="h6">Total holdings: ${(calculateTotalTokensUSD(tokens) + mainCryptoBalanceUSD).toFixed(2)}</Typography>
            </Grid>
        </Grid>
    );
};

export default WalletInfoPage;