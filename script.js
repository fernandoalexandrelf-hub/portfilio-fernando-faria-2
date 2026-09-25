/* ============================================================
   LISTA DE PROJETOS
   Para adicionar um novo projeto no futuro, basta copiar um dos
   objetos abaixo e preencher os campos. O site se atualiza
   sozinho, sem precisar mexer no HTML ou no CSS.

   Campos:
   - title       : título do projeto
   - category    : categoria/tipo do trabalho (aparece acima do título)
   - description : texto curto sobre o projeto
   - video       : link do vídeo (YouTube normal ou Shorts)
   - meta        : informação extra opcional (ex: duração, cliente)
================================================================ */
const projects = [
  {
    title: "Demoreel — Audiovisual Imobiliário",
    category: "Audiovisual Imobiliário",
    description: "Uma seleção de trabalhos voltados ao mercado imobiliário, reunindo edição, captação em solo e imagens aéreas para apresentar imóveis de forma mais envolvente e valorizar cada detalhe através do audiovisual.",
    video: "https://youtube.com/shorts/KzWYqLB3dgQ?feature=share",
    meta: "Duração: 35 segundos"
  },
  {
    title: "Aftermovie — CV Sign Brasil",
    category: "Cobertura de Evento",
    description: "Um criativo em formato aftermovie desenvolvido para divulgação e venda de ingressos do CV Sign Brasil, utilizando ritmo, narrativa visual e edição dinâmica para transmitir a experiência e a energia do evento.",
    video: "https://youtube.com/shorts/K9R4TXbVuEM?feature=share",
    meta: null
  }

  // Exemplo de como adicionar um novo projeto:
  // {
  //   title: "Novo projeto",
  //   category: "Categoria",
  //   description: "Descrição curta do projeto.",
  //   video: "LINK_DO_VIDEO",
  //   meta: "Informação extra (opcional)"
  // },
];

/* ============================================================
   REDES SOCIAIS (opcional)
   Deixe o campo "url" vazio ("") para não exibir o link ainda.
   Quando tiver o link, basta colar aqui — o botão aparece sozinho.
================================================================ */
const socialLinks = [
  { label: "LinkedIn", url: "" },
  { label: "Instagram", url: "" },
  { label: "Behance", url: "" },
  { label: "Vimeo", url: "" }
];

/* ============================================================
   Converte qualquer formato de link do YouTube (normal, shorts,
   youtu.be) para uma URL de incorporação (embed).
================================================================ */
function getYouTubeEmbedUrl(url) {
  let videoId = null;

  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  const shortLinkMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);

  if (shortsMatch) videoId = shortsMatch[1];
  else if (watchMatch) videoId = watchMatch[1];
  else if (shortLinkMatch) videoId = shortLinkMatch[1];

  if (!videoId) return url; // fallback: usa o link como veio

  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
}

/* ============================================================
   RENDERIZAÇÃO DOS PROJETOS
================================================================ */
function renderProjects() {
  const list = document.getElementById("project-list");
  if (!list) return;

  list.innerHTML = projects.map((project) => `
    <article class="project">
      <div class="project-media">
        <iframe
          src="${getYouTubeEmbedUrl(project.video)}"
          title="${project.title}"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="project-info">
        <span class="project-category">${project.category}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        ${project.meta ? `<p class="project-meta">${project.meta}</p>` : ""}
      </div>
    </article>
  `).join("");
}

/* ============================================================
   RENDERIZAÇÃO DAS REDES SOCIAIS
================================================================ */
function renderSocialLinks() {
  const container = document.getElementById("social-links");
  if (!container) return;

  const active = socialLinks.filter((s) => s.url && s.url.trim() !== "");
  container.innerHTML = active
    .map((s) => `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label}</a>`)
    .join("");
}

/* ============================================================
   ANIMAÇÃO DE ENTRADA DOS PROJETOS AO ROLAR A PÁGINA
================================================================ */
function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll(".project");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach((el) => observer.observe(el));
}

/* ============================================================
   INICIALIZAÇÃO
================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderSocialLinks();
  initScrollReveal();

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
