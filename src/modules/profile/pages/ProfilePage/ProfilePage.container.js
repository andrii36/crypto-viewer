import { connect } from "react-redux";
import ProfilePage from "./ProfilePage";
import { getDataByWalletAddress } from "../../../shell/actions/shellActions";
import { clearWalletAddress } from "../../../shell/reducers/walletSearch";

const mapStateToProps = ({shellModule}) => ({
    mainWalletData: shellModule.walletSearch.mainWalletData,
});

export default connect(mapStateToProps, {clearWalletAddress, getDataByWalletAddress})(ProfilePage);