import React from "react";
import { Divider, Grid, Typography } from "@mui/material";
import styles from './MarketPage.module.css';

const MarketPage = ({ tokens, getTopTokensData }) => {
    React.useEffect(() => {
        getTopTokensData();
    }, []);

    const filteredTokens = tokens?.filter(({price}) => price);

    const renderTokenRow = ({ name, price, address }) => {
        const { rate, diff7d } = price;
        const diffIsPositive = Math.abs(diff7d) === diff7d;
        const diff7dFormatted = (diffIsPositive && diff7d !== 0 ? '+' : '') + diff7d;

        return (
            <Grid key={address} item container sx={{ color: 'white'}}>
                <Grid item xs={6} sx={{textAlign: 'left'}}>
                    <Typography>{name}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{'$' + Number(rate).toFixed(2)}</Typography>
                    <Typography 
                        color={diffIsPositive ? 'green' : 'red'} 
                        sx={{fontSize: '12px', marginBottom: '3px'}}
                    >
                        {diff7dFormatted}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider light sx={{ bgcolor: '#797979' }} />
                </Grid>
            </Grid>
        );
    };

    return (
        <Grid item container padding='19px'>
            <Grid item container>
                <Grid item xs={6} className={styles.market_label_row} sx={{textAlign: 'left'}}>Token</Grid>
                <Grid item xs={6} className={styles.market_label_row}>Price / 7d</Grid>
            </Grid>
            {filteredTokens?.map(renderTokenRow)}
        </Grid>
    )
};

export default MarketPage;