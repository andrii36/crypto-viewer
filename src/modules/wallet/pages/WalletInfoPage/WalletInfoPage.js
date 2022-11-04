import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material";
import React from "react";

const WalletInfoPage = ({ mainWalletData }) => {
    const { tokens } = mainWalletData;

    const convertWei = (wei, decimals) => {
        let balance = Number(wei) / Math.pow(10, decimals);
        if(decimals === "6") balance = balance.toFixed(2);
        return balance;
    };

    const renderTokenRow = ({ tokenInfo, rawBalance }) => {

        const balance = convertWei(rawBalance, tokenInfo.decimals);
        const price = tokenInfo.price && `$${tokenInfo.price.rate?.toFixed(2)}`;
        const contractAddress = tokenInfo.address.substring(tokenInfo.address.length - 12);

        return (
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {tokenInfo.name}
                </TableCell>
                <TableCell align="right">...{contractAddress}</TableCell>
                <TableCell align="right">{price}</TableCell>
                <TableCell align="right">{`${balance} ${tokenInfo.symbol}`}</TableCell>
            </TableRow>
        )
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>

            </Grid>
            <Grid item xs={8}>
                <Typography variant="h5">Portfolio</Typography>
                <TableContainer component={Paper}>
                    <Typography variant="h6" align="left">Etherium</Typography>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Token</TableCell>
                                <TableCell align="right">Contract Address</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Holdings</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tokens.map(renderTokenRow)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default WalletInfoPage;