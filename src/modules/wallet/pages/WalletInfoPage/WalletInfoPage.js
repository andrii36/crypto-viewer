import React, { useEffect } from "react";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, IconButton, Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";

const WalletInfoPage = ({ mainWalletData, clearWalletData, getDataByWalletAddress }) => {
    const navigate = useNavigate();

    const { tokens, ETH, address } = mainWalletData;

    useEffect(() => {
        getDataByWalletAddress(address);
    }, []);

    useEffect(() => {
        if (Object.keys(mainWalletData).length === 0) {
            navigate('/');
        };
    }, [mainWalletData]);

    const convertWei = (wei, decimals) => {
        let balance = Number(wei) / Math.pow(10, decimals);
        if (decimals === "6") balance = balance.toFixed(2);
        return balance;
    };

    const calculateUSDHoldings = (price, amount) => (price * amount).toFixed(2);

    const calculateTotalTokensUSD = (tokens) => {
        return tokens?.reduce((acc, { tokenInfo, rawBalance }) => {
            const balance = convertWei(rawBalance, tokenInfo.decimals);
            const price = tokenInfo.price ? `$${tokenInfo.price.rate}` : 0;
            const balanceUSD = balance * price;
            return acc + balanceUSD;
        }, 0);
    };

    const mainCryptoBalance = convertWei(ETH?.rawBalance, 18);
    const mainCryptoBalanceUSD = Number(calculateUSDHoldings(ETH?.price.rate, mainCryptoBalance));

    const shortenContractAddress = (fullAddress) => {
        return fullAddress?.substring(fullAddress.length - 12);
    };

    const deleteHandler = () => {
        clearWalletData();
    };

    const renderTokenRow = ({ tokenInfo, rawBalance }) => {

        const balance = convertWei(rawBalance, tokenInfo.decimals);
        const price = tokenInfo.price && `$${tokenInfo.price.rate?.toFixed(2)}`;
        const contractAddress = shortenContractAddress(tokenInfo.address);

        return (
            <TableRow
                key={tokenInfo.address}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {tokenInfo.name}
                </TableCell>
                <TableCell align="right">...{contractAddress}</TableCell>
                <TableCell align="right">{price}</TableCell>
                <TableCell align="right">{`${balance} ${tokenInfo.symbol}`}</TableCell>
                <TableCell align="right">${calculateUSDHoldings(price, balance)}</TableCell>
            </TableRow>
        )
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Box sx={{ border: '1px grey solid', marginTop: '10px' }}>
                    <Typography>Current address:</Typography>
                    <Typography>{address}</Typography>
                    <IconButton edge="start" onClick={deleteHandler}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Grid>
            <Grid item xs={8}>
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
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">Etherium</TableCell>
                                <TableCell align="right">...{shortenContractAddress(address)}</TableCell>
                                <TableCell align="right">${ETH?.price.rate.toFixed(2)}</TableCell>
                                <TableCell align="right">{mainCryptoBalance} Ether</TableCell>
                                <TableCell align="right">${mainCryptoBalanceUSD.toFixed(2)}</TableCell>
                            </TableRow>
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