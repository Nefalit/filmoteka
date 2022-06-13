import * as basicLightbox from 'basiclightbox';
import lisaUrl from '../images/team/team-lisa.jpeg';
import vovaUrl from '../images/team/team-vova.jpeg';
import ilyaUrl from '../images/team/team-ilya.jpeg';
import tarantinoUrl from '../images/team/tarantino.jpeg';
import romaUrl from '../images/team/team-roma.jpeg';
import lenaUrl from '../images/team/team-lena.jpeg';

const markupTeam = `<div class="backdrop team-wrapper">

<div class="team-card">
    <img src="${lisaUrl}" alt="Елизавета Чернышева" class="team-image">
    <p class="team-name">Елизавета Чернышева</p>
</div>
<div class="team-container">
    <p class="team-text">bc_17 Online</p>
    <p class="team-text">GoiT</p>
    <p class="team-members">Tarantiners</p>
</div>

<div class="team-card">
    <img src="${vovaUrl}" alt="Владимир Кузик" class="team-image">
    <p class="team-name">Владимир Кузик</p>
</div>
<div class="team-card">
    <img src="${ilyaUrl}" alt="Илья Корж" class="team-image">
    <p class="team-name">Илья Корж</p>
</div>
<div class="team-card">
    <img src="${lenaUrl}" alt="Елена Сердюк" class="team-image">
    <p class="team-name">Елена Сердюк</p>
</div>
<div class="team-card">
    <img src="${romaUrl}" alt="Роман Лизун" class="team-image">
    <p class="team-name">Роман Лизун</p>
</div>
</div>`;


const container = document.querySelector('.js-team-modal');
const backdrop = document.querySelector('.backdrop');

container.addEventListener('click', openModal);

const modal = basicLightbox.create(markupTeam);

function openModal(e) {
  modal.show();

  window.addEventListener('keydown', closeModalHandler);
  function backdropCloseModal(event) {
    if (event.target.classList.contains('backdrop')) {
      filmCardCloseWindow();
    }
  }
  function closeModalHandler(e) {
    if (e.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}
  backdrop.addEventListener('click', backdropCloseModal);
