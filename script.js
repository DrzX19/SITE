const cars = {
  porsche: {title:"Porsche 911 Carrera GTS", description:"Um ícone esportivo que combina precisão, resposta imediata e design atemporal. Dados apresentados como referência de demonstração.", price:"R$ 1.450.000", specs:[["Motor","3.0L boxer biturbo"],["Potência","541 cv"],["Torque","61,2 kgfm (aprox.)"],["0–100 km/h","3,0 segundos"],["Transmissão","Automática PDK, 8 marchas"],["Tração","Traseira"],["Ano de referência","2025"],["Carroceria","Coupé esportivo"]]},
  range: {title:"Range Rover Sport", description:"Presença marcante, conforto refinado e capacidade para encarar diferentes terrenos com sofisticação.", price:"R$ 1.290.000", specs:[["Motor","4.4L V8 biturbo"],["Potência","530 cv"],["Torque","76,5 kgfm (aprox.)"],["0–100 km/h","4,5 segundos"],["Transmissão","Automática, 8 marchas"],["Tração","Integral AWD"],["Ano de referência","2025"],["Carroceria","SUV de luxo"]]},
  amg: {title:"Mercedes-AMG GT 63", description:"Um gran turismo de alto desempenho, com motor V8 e uma experiência de condução visceral.", price:"R$ 1.780.000", specs:[["Motor","4.0L V8 biturbo"],["Potência","585 cv"],["Torque","81,6 kgfm (aprox.)"],["0–100 km/h","3,2 segundos"],["Transmissão","Automática AMG"],["Tração","Integral 4MATIC+"],["Ano de referência","2025"],["Carroceria","Gran turismo"]]},
  bmw: {title:"BMW X7 M60i", description:"SUV de grande porte com acabamento premium, tecnologia embarcada e performance V8.", price:"R$ 980.000", specs:[["Motor","4.4L V8 biturbo"],["Potência","530 cv"],["Torque","76,5 kgfm (aprox.)"],["0–100 km/h","4,7 segundos"],["Transmissão","Automática, 8 marchas"],["Tração","Integral xDrive"],["Ano de referência","2025"],["Carroceria","SUV de 7 lugares"]]},
  taycan: {title:"Porsche Taycan 4S", description:"Desempenho elétrico com respostas instantâneas e uma cabine moderna focada no condutor. Potência varia conforme configuração e função overboost.", price:"R$ 890.000", specs:[["Motorização","Dois motores elétricos"],["Potência","Até 598 cv*"],["Tração","Integral AWD"],["0–100 km/h","Aprox. 3,7 segundos"],["Energia","Bateria de alta tensão"],["Recarga","AC e DC, conforme versão"],["Ano de referência","2025"],["Carroceria","Sedã elétrico"]]},
  m5: {title:"BMW M5", description:"Sedã de alto desempenho que une potência híbrida, conforto de longa distância e tecnologia esportiva.", price:"R$ 1.120.000", specs:[["Motor","4.4L V8 biturbo + elétrico"],["Potência combinada","727 cv"],["Torque combinado","100 kgfm (aprox.)"],["0–100 km/h","3,5 segundos"],["Transmissão","Automática M Steptronic"],["Tração","Integral M xDrive"],["Ano de referência","2025"],["Carroceria","Sedã esportivo híbrido"]]}
};

const grid = document.getElementById('carGrid');
const filterButtons = [...document.querySelectorAll('.filter')];
const sortSelect = document.getElementById('sortCars');
let currentFilter = 'todos';

function updateCars() {
  const cards = [...grid.querySelectorAll('.car-card')];
  cards.forEach(card => card.classList.toggle('is-hidden', currentFilter !== 'todos' && card.dataset.type !== currentFilter));
  const sorted = cards.sort((a,b) => {
    if (sortSelect.value === 'low') return Number(a.dataset.price) - Number(b.dataset.price);
    if (sortSelect.value === 'high') return Number(b.dataset.price) - Number(a.dataset.price);
    return Number(a.querySelector('.photo-index').textContent) - Number(b.querySelector('.photo-index').textContent);
  });
  sorted.forEach(card => grid.appendChild(card));
}
filterButtons.forEach(button => button.addEventListener('click', () => {
  currentFilter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle('active', item === button));
  updateCars();
}));
sortSelect.addEventListener('change', updateCars);

document.querySelectorAll('.heart').forEach(button => button.addEventListener('click', () => {
  const selected = button.getAttribute('aria-pressed') !== 'true';
  button.setAttribute('aria-pressed', String(selected));
  button.textContent = selected ? '♥' : '♡';
}));

const dialog = document.getElementById('carDialog');
document.querySelectorAll('.details-btn').forEach(button => button.addEventListener('click', () => {
  const car = cars[button.dataset.car];
  if (!car) return;
  document.getElementById('dialogTitle').textContent = car.title;
  document.getElementById('dialogDescription').textContent = car.description;
  document.getElementById('dialogPrice').textContent = car.price;
  document.getElementById('dialogSpecs').innerHTML = car.specs.map(([label,value]) => `<div><span>${label}</span><b>${value}</b></div>`).join('');
  dialog.showModal();
}));
document.getElementById('dialogClose').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.getElementById('dialogContact').addEventListener('click', () => dialog.close());

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  document.getElementById('formFeedback').textContent =
    `Obrigado${name ? ', ' + name : ''}! Este formulário é uma demonstração: conecte-o a um serviço ou backend para enviar os dados.`;
  form.reset();
});
