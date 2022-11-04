import { connect } from "react-redux";
import WalletInfoPage from "./WalletInfoPage";

const mapStateToProps = ({shellModule}) => ({
    mainWalletData: shellModule.walletSearch.mainWalletData,
});

export default connect(mapStateToProps, null)(WalletInfoPage);