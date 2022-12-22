import { connect } from "react-redux";
import MarketPage from "./MarketPage";
import { getTopTokensData } from '../../actions/marketActions';

const mapStateToProps = ({ marketModule }) => ({
    tokens: marketModule.marketData.topTokens,
});

export default connect(mapStateToProps, { getTopTokensData })(MarketPage);