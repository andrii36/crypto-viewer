import React from "react";
import { Button } from "@mui/material";
import { shortenContractAddress } from "../../utils/portfolioDataUtils";

const ReadMoreButton = ({ content, sx }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const expandedButtonStyles = isExpanded ? { width: '330px' } : {};

    const onClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Button
            variant='outlined'
            size='small'
            sx={{ ...sx, textTransform: 'none', ...expandedButtonStyles }}
            onClick={onClick}
        >
            {isExpanded ? content : `...${shortenContractAddress(content)}`}
        </Button>
    );
};

export default ReadMoreButton;