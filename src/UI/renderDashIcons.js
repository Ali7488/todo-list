import taskdockLogo from "../assets/icons/taskdock.svg";
import plusBtnSVG from "../assets/icons/plus.svg";

export default function renderDashIcons() {
  const logoImg = document.querySelector(".logo");
  logoImg.src = taskdockLogo;

  const btnLogo = document.querySelectorAll(".btnLogo");
  btnLogo.forEach((btn) => {
    btn.src = plusBtnSVG;
  });
}
