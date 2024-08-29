import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Category from "../components/Category";

const MesList = (props) => {
    const navigate = useNavigate();

    // const clickState = (e) => {
    //     e.preventDefault();
    //     props.clickState(e.target.textContent);

    // };

    return (
        <div className="MesList">

            <h2 style={{ textAlign: 'center', marginTop: '2em' }}>쪽지 보관함</h2>

            {/* <div className="row justify-content-center my-5">
                <div className="filter-btns shadow-md rounded-pill text-center col-auto">
                    <Category text={'받은 쪽지'} onClick={clickState} />
                    <Category text={'보낸 쪽지'} onClick={clickState} />
                </div>
            </div> */}

            <div class="pricing-horizontal row col-10 m-auto d-flex shadow-sm rounded overflow-hidden bg-white">
                {props.list && props.list.map((msg) => (
                    <div class="pricing-list shadow-sm rounded-top rounded-3 py-sm-0 py-5">
                        <a key={msg.id} href={`/message/detail?id=${msg.id}`} className="col-sm-6 col-lg-4 text-decoration-none project">

                            <div class="row p-2">
                                <div class="pricing-list-icon col-3 text-center m-auto text-secondary ml-5 py-2">
                                    <i class="display-3 bx bx-package"></i>
                                </div>

                                <div className="pricing-list-body col-md-5 align-items-center pl-3 pt-2">

                                    <ui class="list-unstyled text-center light-300">
                                        <li class="h5 semi-bold-600 mb-0 mt-3">{msg.sender}</li>
                                        <li>{msg.sendTime}</li>
                                    </ui>
                                </div>
                                <div class="pricing-list-footer col-4 text-center m-auto align-items-center">
                                    <i class='bx-fw bx bx-heart me-1'></i>
                                </div>

                            </div>
                        </a>
                    </div>
                ))}
            </div>

            <Button text={'쪽지'} onClick={(e) => {
                e.preventDefault();
                navigate('/message/write');
            }} />
        </div>
    );
};

export default MesList;