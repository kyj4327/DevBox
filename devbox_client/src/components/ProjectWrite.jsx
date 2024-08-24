const ProjectWrite = () => {
    return (
        <div>

            <div class="col-lg-8 ">
                <form class="contact-form row" method="post" action="#" role="form">

                    <div class="col-lg-6 mb-4">
                        <div class="form-floating">
                            <input type="text" class="form-control form-control-lg light-300" id="floatingname" name="inputname" placeholder="Name"></input>
                            <label for="floatingname light-300">title</label>
                        </div>
                    </div>

                    <div class="col-lg-6 mb-4">
                        <div class="form-floating">
                            <input type="text" class="form-control form-control-lg light-300" id="floatingemail" name="inputemail" placeholder="Email"></input>
                            <label for="floatingemail light-300">Name</label>
                        </div>
                    </div>

                    <div class="row justify-content-center pb-4">
                        <div class="col-lg-8">
                            
                            <p>교육 포스터</p>
                            <div id="templatemo-slide-link-target" class="card mb-3">
                                {/* {<img src='' alt="Uploaded" />} */}
                                <input
                                    name="img"
                                    value={''}
                                    type="file" accept="image/*" onChange={''} />

                            </div>
                        </div>
                    </div>
                    
                    <div class="col-12">
                        <div class="form-floating mb-4">
                            <input type="text" class="form-control form-control-lg light-300" id="floatingsubject" name="inputsubject" placeholder="Subject"></input>
                            <label for="floatingsubject light-300">Link</label>
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="form-floating mb-3">
                            <textarea class="form-control light-300" rows="8" placeholder="Message" id="floatingtextarea"></textarea>
                            <label for="floatingtextarea light-300">coment</label>
                        </div>
                    </div>

                    <div class="col-md-12 col-12 m-auto text-end">
                        <button type="submit" class="btn btn-secondary rounded-pill px-md-5 px-4 py-2 radius-0 text-light light-300"
                        >프젝 자랑</button>
                    </div>

                </form>
            </div>
        </div>
    );

}

export default ProjectWrite;