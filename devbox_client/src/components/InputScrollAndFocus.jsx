import Swal from "sweetalert2";

const InputScrollAndFocus = (name, message) => {
    const element = document.getElementById(name); // id로 요소를 찾음
    if (element) {
        const elementLocation = element.getBoundingClientRect(); // 요소의 위치 정보
        const offset = window.scrollY || document.documentElement.scrollTop; // 현재 스크롤 위치
        const targetPosition = elementLocation.top + offset - (window.innerHeight / 2) + (elementLocation.height / 2); // 화면 중앙 계산
        window.scrollTo({ // 부드러운 스크롤 이동
            top: targetPosition,
            behavior: 'smooth'
        });
        element.focus(); // 해당 input에 focus
    }
    Swal.fire({
        icon: "warning",
        title: message
    });
};

export default InputScrollAndFocus;