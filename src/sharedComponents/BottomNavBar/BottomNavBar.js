import React from "react";
import { BottomNavigation, BottomNavigationAction, Box, Grid } from "@mui/material";
import { MarketIcon, ProfileIcon, SettingsIcon } from "../Icons";
import { useNavigate } from "react-router-dom";

const routes = ['market', 'profile', 'settings'];

const BottomNavBar = () => {
    const [value, setValue] = React.useState(1);
    const navigate = useNavigate();

    return (
        <Grid item>
            <Box>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        navigate(`/${routes[newValue]}`);
                    }}
                    sx={{
                        height: '45px',
                        width: '100%',
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}
                >
                    <BottomNavigationAction label="Market" icon={<MarketIcon />} />
                    <BottomNavigationAction label="Profile" icon={<ProfileIcon />} />
                    <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
                </BottomNavigation>
            </Box>
        </Grid>
    );
};

export default BottomNavBar;