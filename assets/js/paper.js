const papers = [
  {
    title: "The Goldilocks Principle: Achieving Just Right Boundary Fidelity for Long-Tailed Classification",
    authors: "Faizanuddin Ansari, Abhranta Panigrahi and Swagatam Das",
    abstract: "This study addresses the challenges of learning from long-tailed class imbalances in deep neural networks, particularly for image recognition. Long-tailed class imbalances occur when a dataset's class distribution is highly skewed, with a few head classes containing many instances and numerous tail classes having fewer instances. This imbalance becomes problematic when traditional classification methods, especially deep learning models, prioritize accuracy in the more frequent classes, neglecting the less common ones. Furthermore, these methods struggle to maintain consistent boundary fidelity—decision boundaries that are sharp enough to distinguish classes yet smooth enough to generalize well. Hard boundaries, often caused by overfitting tail classes, amplify intra-class variations, while overly soft boundaries blur distinctions between classes, reducing classification accuracy. We propose a dual-branch ...",
    bibtex: `@article{ansari2025Goldilocks,
  title={The Goldilocks Principle: Achieving Just Right Boundary Fidelity for Long-Tailed Classification},
  author={Faizanuddin Ansari, Abhranta Panigrahi and Swagatam Das},
  journal={IEEE Transactions on Emerging Topics in Computational Intelligence},
  year={2025}
}`,
    published: "Apr 2025"
  },
  {
    title: "Force of Attraction-Based Distribution Calibration for Enhancing Minority Class Representation",
    authors: "Priyobrata Mondal, Faizanuddin Ansari, Swagatam Das and Pourya Shamsolmoali",
    abstract: "This study addresses the challenges of learning from long-tailed class imbalances in deep neural networks, particularly for image recognition. Long-tailed class imbalances occur when a dataset's class distribution is highly skewed, with a few head classes containing many instances and numerous tail classes having fewer instances. This imbalance becomes problematic when traditional classification methods, especially deep learning models, prioritize accuracy in the more frequent classes, neglecting the less common ones. Furthermore, these methods struggle to maintain consistent boundary fidelity—decision boundaries that are sharp enough to distinguish classes yet smooth enough to generalize well. Hard boundaries, often caused by overfitting tail classes, amplify intra-class variations, while overly soft boundaries blur distinctions between classes, reducing classification accuracy. We propose a dual-branch ...",
    bibtex: `@article{ansari2025Goldilocks,
  title="{Force of Attraction-Based Distribution Calibration for Enhancing Minority Class Representation}",
  author={Priyobrata Mondal, Faizanuddin Ansari, Swagatam Das & Pourya Shamsolmoali},
  journal={IEEE International Joint Conference on Neural Networks (IJCNN 2025)},
  year={2025}
}`,
    published: "Apr 2025"
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
