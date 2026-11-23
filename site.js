const questions = [
  ["Como funciona o adestramento domiciliar?", "As sessões acontecem na casa do cão, onde é possível observar a rotina e praticar os exercícios nas situações em que as dificuldades costumam aparecer."],
  ["Que tipo de atendimento devo procurar?", "Conte o que acontece, em quais situações e o que você gostaria de mudar. Essas informações ajudam a definir se a prioridade é rotina, passeio, socialização, obediência básica ou reatividade."],
  ["A partir de que idade um filhote pode aprender?", "Filhotes já podem praticar hábitos simples em casa. Para atividades em locais públicos e contato com outros cães, siga a orientação do veterinário sobre vacinação e exposição."],
  ["Um cão adulto ainda consegue aprender?", "Sim. Cães adultos podem aprender novas respostas. Os exercícios devem levar em conta os hábitos, a rotina e as experiências de cada cão."],
  ["O que se pratica na obediência básica?", "Exercícios como sentar, esperar e atender ao chamado ajudam a criar combinados para o dia a dia. A prática deve começar em situações que o cão consegue acompanhar."],
  ["Preciso participar das sessões?", "Sua participação ajuda a entender como praticar os exercícios entre as sessões. Se outras pessoas cuidam do cão, vale alinhar com elas os mesmos sinais e combinados."],
  ["Quantas sessões meu cão vai precisar?", "A quantidade depende do objetivo, do comportamento observado e da frequência de prática em casa. Descreva o caso ao pedir um orçamento para conversar sobre a duração do acompanhamento."],
  ["Quanto tempo leva para ver mudanças?", "Cada cão tem um ritmo. A evolução depende do hábito que está sendo trabalhado, da dificuldade das situações e da regularidade com que os exercícios são praticados."],
  ["Meu cachorro puxa a guia. Dá para trabalhar isso?", "Sim. O treino pode incluir exercícios de atenção e caminhada com a guia relaxada, começando em locais com menos distrações e avançando aos poucos."],
  ["Meu cão late ou avança quando vê outros cães. O que fazer?", "Descreva em que situações isso acontece, a distância e como o cão reage. Durante os passeios, evite aproximá-lo à força e dê espaço sempre que possível."],
  ["O que é socialização?", "É a adaptação gradual a pessoas, animais, sons, objetos e ambientes. O ritmo depende de como o cão responde. Forçar uma aproximação pode aumentar o desconforto."],
  ["Posso trabalhar os pulos nas visitas?", "Sim. Dá para praticar uma forma mais tranquila de receber pessoas, ensinando uma ação que o cão consiga fazer quando alguém chega, como ir para um local combinado."],
  ["Adestramento ajuda com latidos em casa?", "Primeiro é preciso observar o que costuma provocar os latidos, como ruídos, movimento do lado de fora ou a chegada de alguém. O exercício depende da situação."],
  ["Meu cão não vem quando eu chamo. Posso treinar isso?", "Sim. O chamado pode ser praticado em ambiente seguro, com poucas distrações. Use a guia ou um local cercado quando ainda não houver uma resposta confiável."],
  ["Dá para treinar dois cães da mesma casa?", "Conte como cada cão reage e como eles convivem. Exercícios individuais podem facilitar o começo, e a prática em conjunto pode ser acrescentada conforme o objetivo."],
  ["Preciso comprar algum equipamento antes?", "Informe quais equipamentos o cão já usa, como guia, coleira ou peitoral. O que vale a pena usar depende da atividade e do ajuste ao cachorro."],
  ["O que devo informar se meu cão já mordeu?", "Avise antes de marcar uma sessão. Explique em que situação ocorreu a mordida, quem estava presente e se houve ferimento. Esse histórico ajuda a planejar o primeiro contato."],
  ["Como saber se meu bairro é atendido?", "Envie o nome do bairro e da cidade por WhatsApp para confirmar se há atendimento domiciliar na sua região."],
  ["Quanto custa o atendimento?", "Solicite um orçamento e informe o serviço de interesse. Se ainda estiver em dúvida, descreva a dificuldade e informe o bairro onde seria o atendimento."],
  ["Como faço para agendar?", "Entre em contato pelo WhatsApp com seu nome, o serviço desejado e seus melhores horários. O agendamento pode ser combinado na conversa."]
];

const whatsapp = "https://wa.me/5551981459058";
const motion = matchMedia("(prefers-reduced-motion: reduce)");
const galleryWindow = document.querySelector(".gallery-window");
const galleryTrack = document.querySelector(".gallery-track");
const slides = Array.from(galleryTrack.children);
const dots = Array.from(document.querySelectorAll(".dots button"));
let activeSlide = 0;

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  galleryTrack.style.transform = "translateX(-" + activeSlide * 100 + "%)";
  slides.forEach((slide, position) => {
    slide.inert = position !== activeSlide;
    dots[position].toggleAttribute("aria-current", position === activeSlide);
    if (position === activeSlide) dots[position].setAttribute("aria-current", "true");
  });
  document.querySelector("[data-gallery-status]").textContent =
    "Imagem " + (activeSlide + 1) + " de " + slides.length + ": " + dots[activeSlide].ariaLabel;
}

dots.forEach((dot, index) => dot.addEventListener("click", () => showSlide(index)));
document.querySelector("[data-gallery-prev]").addEventListener("click", () => showSlide(activeSlide - 1));
document.querySelector("[data-gallery-next]").addEventListener("click", () => showSlide(activeSlide + 1));

galleryWindow.addEventListener("keydown", (event) => {
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
  event.preventDefault();
  showSlide(activeSlide + (event.key === "ArrowLeft" ? -1 : 1));
});

let touchStart;
galleryWindow.addEventListener("touchstart", (event) => {
  touchStart = event.touches[0];
}, { passive: true });
galleryWindow.addEventListener("touchend", (event) => {
  if (!touchStart) return;
  const end = event.changedTouches[0];
  const dx = end.clientX - touchStart.clientX;
  const dy = end.clientY - touchStart.clientY;
  touchStart = null;
  if (Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy)) showSlide(activeSlide + (dx < 0 ? 1 : -1));
}, { passive: true });

const serviceTrack = document.querySelector("#service-track");
const servicePrevious = document.querySelector("[data-service-prev]");
const serviceNext = document.querySelector("[data-service-next]");

function syncServiceControls() {
  const remaining = serviceTrack.scrollWidth - serviceTrack.clientWidth - serviceTrack.scrollLeft;
  servicePrevious.disabled = serviceTrack.scrollLeft <= 2;
  serviceNext.disabled = remaining <= 2;
}

function scrollService(direction) {
  const [first, second] = serviceTrack.children;
  const step = second.offsetLeft - first.offsetLeft;
  serviceTrack.scrollBy({ left: step * direction, behavior: motion.matches ? "instant" : "smooth" });
}

servicePrevious.addEventListener("click", () => scrollService(-1));
serviceNext.addEventListener("click", () => scrollService(1));
serviceTrack.addEventListener("scroll", syncServiceControls, { passive: true });
new ResizeObserver(syncServiceControls).observe(serviceTrack);
syncServiceControls();

const faqTrack = document.querySelector("#faq-track");
const previous = document.querySelector("[data-faq-prev]");
const next = document.querySelector("[data-faq-next]");
const range = document.querySelector("#faq-range");
const position = document.querySelector("[data-faq-position]");

const cards = questions.map(([question, answer]) => {
  const card = document.createElement("li");
  const heading = document.createElement("h3");
  const paragraph = document.createElement("p");
  const link = document.createElement("a");
  card.className = "faq-card";
  heading.textContent = question;
  paragraph.textContent = answer;
  link.href = whatsapp + "?text=" + encodeURIComponent("Olá, Andrey! Gostaria de conversar sobre esta pergunta: " + question);
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "Conversar sobre este assunto";
  link.setAttribute("aria-label", "Conversar no WhatsApp sobre: " + question);
  card.append(heading, paragraph, link);
  return card;
});
faqTrack.append(...cards);

let stops = [];
let current = 0;
let cardOffsets = [];

function syncFaq() {
  const scroll = faqTrack.scrollLeft;
  current = stops.reduce((closest, stop, index) =>
    Math.abs(stop - scroll) < Math.abs(stops[closest] - scroll) ? index : closest, 0);
  previous.disabled = current === 0;
  next.disabled = current === stops.length - 1;
  range.value = current + 1;
  const first = cardOffsets.findIndex((offset) => offset + cards[0].offsetWidth > scroll + 2) + 1;
  const last = cardOffsets.filter((offset) => offset < scroll + faqTrack.clientWidth - 2).length;
  const shown = first === last ? String(first) : first + "–" + last;
  range.setAttribute("aria-valuetext", "Perguntas " + shown + " de " + questions.length);
  position.textContent = shown + " / " + questions.length;
}

function measureFaq() {
  const maxScroll = faqTrack.scrollWidth - faqTrack.clientWidth;
  const start = cards[0].offsetLeft;
  cardOffsets = cards.map((card) => card.offsetLeft - start);
  stops = cardOffsets.filter((offset) => offset < maxScroll - 1);
  stops.push(maxScroll);
  range.max = stops.length;
  syncFaq();
}

function scrollFaq(index, instant = false) {
  const target = Math.max(0, Math.min(index, stops.length - 1));
  faqTrack.scrollTo({ left: stops[target], behavior: instant || motion.matches ? "instant" : "smooth" });
}

previous.addEventListener("click", () => scrollFaq(current - 1));
next.addEventListener("click", () => scrollFaq(current + 1));
range.addEventListener("input", () => scrollFaq(Number(range.value) - 1, true));
faqTrack.addEventListener("scroll", syncFaq, { passive: true });
measureFaq();
new ResizeObserver(measureFaq).observe(faqTrack);

const form = document.querySelector("#orcamento-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = new FormData(form);
  const message = [
    "Olá, Andrey! Gostaria de solicitar um orçamento de adestramento.",
    "Nome: " + fields.get("nome").trim(),
    "WhatsApp: " + fields.get("telefone").trim(),
    "Serviço: " + fields.get("servico")
  ];
  const dog = fields.get("cao").trim();
  if (dog) message.push("Nome do cão: " + dog);
  const url = whatsapp + "?text=" + encodeURIComponent(message.join("\n"));
  window.location.assign(url);
});


