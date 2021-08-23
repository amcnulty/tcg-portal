import LightLogoSVG from './lightLogo.svg';
import LightLogoTransparentSVG from './lightLogoTransparent.svg';
import LightLogoTransparentTextOnlySVG from './lightLogoTransparentTextOnly.svg';
import SquareLightTransparentSVG from './squareLightTransparent.svg';
import DarkLogoSVG from './darkLogo.svg';
import DarkLogoTransparentSVG from './darkLogoTransparent.svg';
import SquareDarkTransparentSVG from './squareDarkTransparent.svg';

const CompanyLogo = (props) => {
    if (props.textOnly) {
        return <img
            className="CompanyLogo"
            src={LightLogoTransparentTextOnlySVG}
            alt="Contractors Garage"
        />
    }
    else if (props.square) {
        return <img
            className="CompanyLogo"
            src={props.dark ? SquareDarkTransparentSVG : SquareLightTransparentSVG}
            alt="Contractors Garage"
        />
    }
    return (
        props.dark
        ?
            <img
                className="CompanyLogo"
                src={props.transparent ? DarkLogoTransparentSVG : DarkLogoSVG}
                alt="Contractors Garage"
            />  
        :
            <img
                className="CompanyLogo"
                src={props.transparent ? LightLogoTransparentSVG : LightLogoSVG}
                alt="Contractors Garage"
            />
    );
};

export default CompanyLogo;