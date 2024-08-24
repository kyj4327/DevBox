const ProjectDetail = () => {
    return (
        <div>

            <div id="work_single_banner" class="bg-light w-100">
                <div class="container-fluid text-light d-flex justify-content-center align-items-center border-0 rounded-0 p-0 py-5">
                    <div class="banner-content col-lg-8 m-lg-auto text-center py-5 px-3">
                        <h1 class="banner-heading h2 pb-5 typo-space-line-center">제목</h1>
                    </div>
                </div>
            </div>

            <div class="row justify-content-center pb-4">
                <div class="col-lg-8">
                    <div id="templatemo-slide-link-target" class="card mb-3">
                        <img class="img-fluid border rounded" src="./assets/img/work-slide-04.jpg" alt="Card image cap"></img>
                    </div>
                    <div class="worksingle-slide-footer row">

                        <div class="col-1 align-self-center">
                            <a href="#multi-item-example" role="button" data-bs-slide="prev">
                                <i class='bx bxs-chevron-left bx-sm text-dark'></i>
                            </a>
                        </div>

                        <div id="multi-item-example" class="col-10 carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner" role="listbox">

                                <div class="carousel-item active">
                                    <div class="row">
                                        <div class="col">
                                            <a class="templatemo-slide-link" href="./assets/img/work-slide-06.jpg">
                                                <img class="img-fluid border rounded" src="./assets/img/work-slide-06-small.jpg" alt="Product Image"></img>
                                            </a>
                                        </div>
                                        <div class="col">
                                            <a class="templatemo-slide-link" href="./assets/img/work-slide-05.jpg">
                                                <img class="img-fluid border rounded" src="./assets/img/work-slide-05-small.jpg" alt="Product Image"></img>
                                            </a>
                                        </div>
                                        <div class="col">
                                            <a class="templatemo-slide-link" href="./assets/img/work-slide-04.jpg">
                                                <img class="img-fluid border rounded" src="./assets/img/work-slide-04-small.jpg" alt="Product Image"></img>
                                            </a>
                                        </div>
                                        <div class="col">
                                            <a class="templatemo-slide-link" href="./assets/img/work-slide-03.jpg">
                                                <img class="img-fluid border rounded" src="./assets/img/work-slide-03-small.jpg" alt="Product Image"></img>
                                            </a>
                                        </div>
                                        <div class="col">
                                            <a class="templatemo-slide-link" href="./assets/img/work-slide-01.jpg">
                                                <img class="img-fluid border rounded" src="./assets/img/work-slide-01-small.jpg" alt="Product Image"></img>
                                            </a>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div class="col-1 align-self-center text-end">
                            <a href="#multi-item-example" role="button" data-bs-slide="next">
                                <i class='bx bxs-chevron-right bx-sm text-dark'></i>
                            </a>
                        </div>

                    </div>
                </div>
            </div>

            <div class="row justify-content-center">
                <div class="col-lg-8 pt-4 pb-4">
                    <div class="ratio ratio-16x9">
                        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/1z--ZRS5x5U" allowfullscreen></iframe>
                    </div>
                </div>
            </div>

            <div class="row pt-5">
                <div class="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                    <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">프로젝트 자랑</h2>
                    <p class="worksingle-footer py-3 text-muted light-300">
                        <li>내용 {}</li>
                    </p>
                </div>
            </div>
            <a href="">목록</a>
            <a href="">수정</a>
            <a href="">삭제</a>
        </div>

    );
};

export default ProjectDetail;