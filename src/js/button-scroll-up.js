const ScrollBtnUp = document.querySelector('.isShowBtn');
window.onscroll = () => {
  if (window.scrollY > 700) {
    ScrollBtnUp.classList.remove('isShowBtn_hide');
  } else if (window.scrollY < 700) {
    ScrollBtnUp.classList.add('isShowBtn_hide');
  }
};
ScrollBtnUp.onclick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
