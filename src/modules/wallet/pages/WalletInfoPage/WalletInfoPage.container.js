import { connect } from "react-redux";
import WalletInfoPage from "./WalletInfoPage";
import { clearWalletData } from "../../../shell/actions/shellActions";

const mapStateToProps = ({shellModule}) => ({
    mainWalletData: shellModule.walletSearch.mainWalletData,
});

export default connect(mapStateToProps, {clearWalletData})(WalletInfoPage);