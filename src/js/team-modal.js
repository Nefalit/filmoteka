import * as basicLightbox from 'basiclightbox';

import lisaUrl from '../images/team/team-lisa.jpeg';
import vovaUrl from '../images/team/team-vova.jpeg';
import ilyaUrl from '../images/team/team-ilya.jpeg';
import tarantinoUrl from '../images/team/tarantino.jpeg';
import romaUrl from '../images/team/team-roma.jpeg';
import lenaUrl from '../images/team/team-lena.jpeg';

const markupTeam = `<div class="backdrop team-wrapper">

<div class="team-card team-card-vova">
    <img src="${vovaUrl}" alt="Володимир Кузик" class="team-image">
    <p class="team-name">Володимир Кузик TeamLead</p>
</div>

<div class="team-card team-card-ilya">
    <img src="${ilyaUrl}" alt="Ілля Корж" class="team-image">
    <p class="team-name">Ілля Корж<br>Scrum Master</p>
</div>

<div class="team-card team-card-lisa">
    <img src="${lisaUrl}" alt="Єлизавета Чернишева" class="team-image">
    <p class="team-name">Єлизавета Чернишева</p>
</div>

<div class="team-card team-card-lena">
    <img src="${lenaUrl}" alt="Олена Сердюк" class="team-image">
    <p class="team-name">Олена Сердюк</p>
</div>
<div class="team-card team-card-roma">
    <img src="${romaUrl}" alt="Роман Лизун" class="team-image">
    <p class="team-name">Роман Лизун</p>
</div>
</div>

<div class="team-container">
    <p class="team-text">bc_17 Online</p>
    <p class="team-text">GoiT</p>
    <p class="team-members">The Tarantiners</p>
</div>`;

const container = document.querySelector('.js-team-modal');

container.addEventListener('click', openModal);

const modal = basicLightbox.create(markupTeam);

function openModal(e) {
  modal.show();

  window.addEventListener('keydown', closeModalHandler);


  function closeModalHandler(e) {
    if (e.code === 'Escape' && modal.visible()) {
      modal.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}

  