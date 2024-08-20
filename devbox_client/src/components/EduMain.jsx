import '../assets/img/apple-icon.png';
import '../assets/img/favicon.ico';
import '../assets/css/bootstrap.min.css';
import '../assets/css/boxicon.min.css';
import '../assets/css/templatemo.css';
import '../assets/css/custom.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import EduInfo from '../components/EduInfo';

const EduMain = () => {
    return (
        <div className="EduMain">
            <Header />
            <EduInfo />
            <Pagination />
            <Footer />
        </div>
    );
};

export default EduMain;