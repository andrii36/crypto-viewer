import { connect } from "react-redux";
import HomePage from "./HomePage";
import { getDataByWalletAddress } from "../../actions/shellActions";

const mapStateToProps = ({shellModule}) => ({
    mainWalletAddress: shellModule.walletSearch.mainWalletData?.address,
});

export default connect(mapStateToProps, {getDataByWalletAddress})(HomePage);