const papers = [
  {
    title: "Understanding *Transformer* Models in NLP",
    authors: "Jane Doe, John Smith",
    abstract: "This paper explores the mechanisms behind **transformer models** and their impact on modern NLP tasks. It discusses `self-attention`, encoder-decoder architectures, and scalability issues.",
    bibtex: `@article{doe2025transformer,
  title={Understanding Transformer Models in NLP},
  author={Doe, Jane and Smith, John},
  journal={Journal of Machine Learning},
  year={2025}
}`,
    published: "Jan 2025"
  },
  {
    title: "A Survey of **Large Language Models**",
    authors: "Alice Zhang, Bob Lee",
    abstract: "Large language models (LLMs) like *GPT* and *PaLM* are transforming the AI landscape. This survey summarizes current progress and challenges in **training**, evaluation, and application.",
    bibtex: `@article{zhang2025llm,
  title={A Survey of Large Language Models},
  author={Zhang, Alice and Lee, Bob},
  journal={AI Review},
  year={2025}
}`,
    published: "Feb 2025"
  }
];

function populateYearDropdown() {
  const yearSet = new Set(papers.map(p => p.published.match(/\d{4}/)?.[0]).filter(Boolean));
  const dropdown = document.getElementById("yearFilter");
  dropdown.innerHTML = '<option value="all">All</option>';
  Array.from(yearSet).sort().reverse().forEach(year => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    dropdown.appendChild(option);
  });
}

function renderPapers() {
  const container = document.querySelector('.papers-container');
  const selectedYear = document.getElementById("yearFilter").value;
  container.innerHTML = '';
  const authorQuery = document.getElementById("authorFilter").value.toLowerCase();
  const textQuery = document.getElementById("textFilter").value.toLowerCase();

  papers.forEach((paper, index) => {
    const year = paper.published.match(/\d{4}/)?.[0];
    if ((selectedYear !== "all" && year !== selectedYear) ||
      (authorQuery && !paper.authors.toLowerCase().includes(authorQuery)) ||
      (textQuery && !(paper.title.toLowerCase().includes(textQuery) || paper.abstract.toLowerCase().includes(textQuery)))) {
    return;
  }

    const preview = paper.abstract.split(" ").slice(0, 15).join(" ") + (paper.abstract.split(" ").length > 15 ? "..." : "");
    const html = `
      <div class="paper-card" data-bibtex="${paper.bibtex.replace(/"/g, '&quot;')}">
        <div class="paper-title">${marked.parseInline(paper.title)}</div>
        <div class="paper-authors">${paper.authors}</div>
        <div class="paper-abstract" id="abstract${index}" data-full="${marked.parse(paper.abstract).replace(/"/g, '&quot;')}" data-preview="${marked.parseInline(preview).replace(/"/g, '&quot;')}">
          ${marked.parseInline(preview)}
        </div>
        <div class="read-more" onclick="toggleAbstract('abstract${index}', this)">Read more</div>
        <div class="paper-footer">
          <span>Published: ${paper.published}</span>
          <div class="paper-actions">
            <button class="paper-btn" title="View Paper"><i class="fas fa-file-alt"></i></button>
            <button class="paper-btn" title="Cite Paper" onclick="showCitation(this)"><i class="fas fa-quote-right"></i></button>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
  });
}

function toggleAbstract(id, el) {
  const abstract = document.getElementById(id);
  const isExpanded = el.getAttribute("data-expanded") === "true";
  if (isExpanded) {
    abstract.innerHTML = abstract.getAttribute("data-preview");
    el.innerText = "Read more";
    el.setAttribute("data-expanded", "false");
  } else {
    abstract.innerHTML = abstract.getAttribute("data-full");
    el.innerText = "Show less";
    el.setAttribute("data-expanded", "true");
  }
}

function showCitation(btn) {
  const card = btn.closest('.paper-card');
  const bibtex = card.getAttribute('data-bibtex');
  document.getElementById("bibtexContent").textContent = bibtex;
  document.getElementById("citationModal").style.display = "block";
}

function closeModal() {
  document.getElementById("citationModal").style.display = "none";
}

function copyBibtex() {
  const text = document.getElementById("bibtexContent").textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("BibTeX copied to clipboard!");
  });
}

window.onclick = function(event) {
  const modal = document.getElementById("citationModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  populateYearDropdown();
  renderPapers();
});
