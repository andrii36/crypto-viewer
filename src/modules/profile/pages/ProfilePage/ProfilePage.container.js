import { connect } from "react-redux";
import ProfilePage from "./ProfilePage";
import { clearWalletData } from "../../../shell/actions/shellActions";
import { getDataByWalletAddress } from "../../../shell/actions/shellActions";

const mapStateToProps = ({shellModule}) => ({
    mainWalletData: shellModule.walletSearch.mainWalletData,
});

export default connect(mapStateToProps, {clearWalletData, getDataByWalletAddress})(ProfilePage);