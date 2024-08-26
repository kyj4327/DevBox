import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
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