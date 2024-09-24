import React from 'react';
import styles from '../assets/css/RoadExplain.module.css';
import mapIcon from '../assets/img/maps.png';
import busIcon from '../assets/img/bus.png';
import towerIcon from '../assets/img/tower.png';

const RoadExplain = () => {
    return (
        <div className={styles.roadExplain}>
            <div className={styles.roadLeft}>
                <h5><img src={mapIcon} alt="지도 아이콘" className={styles.icon} />주소 및 연락처</h5>
                <p>
                    부산정보산업진흥원 5층 ~ 7층<br />(해운대구 센텀동로 41)
                </p>
            </div>
            <div className={styles.roadRight}>
                <div className={styles.roadTrans}>
                    <h5><img src={busIcon} alt="버스 아이콘" className={styles.icon} />교통편 안내</h5>
                    <p>
                        ※ 도시철도 센텀시티역(2호선) 하차 후 도보 5분 거리, 인근 지역(울산, 경남 등)의 접근성 우수
                    </p>
                    <div className={styles.roadBus}>
                        <p>- 주변버스</p>
                        <ul>
                            <li>일반 : 115 181 307 107(오후) 139 155 5-1 100 100-1 115-1 200 31</li>
                            <li>마을 : 해운대구3-1 해운대구3-2</li>
                            <li>급행 : 1002</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.roadInfoSub}>
                <div className={styles.roadInfoCons}>
                    <div className={styles.roadInfoList}>
                        <h5><img src={towerIcon} alt="타워 아이콘" className={styles.icon} />주요구성</h5>
                        <span className={styles.roadInfoTit}>기타 지원시설</span>
                        <ul>
                            <li>각 층별 휴게공간</li>
                            <li>교육생 사물함</li>
                            <li>교육운영 사무실 등</li>
                        </ul>
                    </div>
                    <div className={styles.roadInfoTable}>
                        <span className={styles.roadInfoTit}>교육실</span>
                        <table>
                            <thead>
                                <tr>
                                    <th>수용인원</th>
                                    <th>실 개수</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>125명</td>
                                    <td>5개</td>
                                </tr>
                                <tr>
                                    <td>135명</td>
                                    <td>5개</td>
                                </tr>
                                <tr>
                                    <td>190명</td>
                                    <td>3개</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoadExplain;