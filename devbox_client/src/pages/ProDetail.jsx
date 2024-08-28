import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProjectDetail from "./ProjectDetail";

const ProDetail = () => {
    const [pageData, setPageData] = useState({});

    return(
        <div className="ProDetail">
            <Header />
            <ProjectDetail />
            <Footer />
        </div>
    );
};

export default ProDetail;