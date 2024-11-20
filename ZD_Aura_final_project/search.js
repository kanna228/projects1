const form = document.querySelector('.search-form');
const input = document.querySelector('.search-form input');
const button = document.querySelector('.search-form button');

const proposals = [
    { text: 'Shirts', link: 'shirts.html' },
    { text: 'Jeans', link: 'jeans.html' },
    { text: 'Accessories', link: 'accessories.html' }
];

const suggestionsDiv = document.createElement('div');
suggestionsDiv.style.position = 'absolute';
suggestionsDiv.style.backgroundColor = '#fff';
suggestionsDiv.style.border = '1px solid #ccc';
suggestionsDiv.style.width = `${input.offsetWidth}px`;
suggestionsDiv.style.maxHeight = '150px';
suggestionsDiv.style.overflowY = 'auto';
suggestionsDiv.style.zIndex = '1000';
suggestionsDiv.style.display = 'none';
suggestionsDiv.style.color = 'black';

suggestionsDiv.style.left = `${input.getBoundingClientRect().left}px`;
suggestionsDiv.style.top = `${input.getBoundingClientRect().bottom + window.scrollY}px`;

document.body.appendChild(suggestionsDiv);

let filteredProposals = [];
input.addEventListener('input', () => {
    const query = input.value.toLowerCase();
    suggestionsDiv.innerHTML = '';

    if (query) {
        filteredProposals = proposals.filter(proposal =>
            proposal.text.toLowerCase().includes(query)
        );

        if (filteredProposals.length > 0) {
            suggestionsDiv.style.display = 'block';
            filteredProposals.forEach(proposal => {
                const suggestionItem = document.createElement('div');
                suggestionItem.textContent = proposal.text;
                suggestionItem.style.padding = '8px';
                suggestionItem.style.cursor = 'pointer';
                suggestionItem.style.borderBottom = '1px solid #eee';

                suggestionItem.addEventListener('mouseover', () => {
                    suggestionItem.style.backgroundColor = '#f0f0f0';
                });
                suggestionItem.addEventListener('mouseout', () => {
                    suggestionItem.style.backgroundColor = '#fff';
                });

                suggestionItem.addEventListener('click', () => {
                    window.location.href = proposal.link;
                });

                suggestionsDiv.appendChild(suggestionItem);
            });
        } else {
            suggestionsDiv.style.display = 'none';
        }
    } else {
        filteredProposals = [];
        suggestionsDiv.style.display = 'none';
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (filteredProposals.length > 0) {
        window.location.href = filteredProposals[0].link;
    } else {
        alert('No suggestions available. Please refine your search.');
    }
});

document.addEventListener('click', (e) => {
    if (!form.contains(e.target) && !suggestionsDiv.contains(e.target)) {
        suggestionsDiv.style.display = 'none';
    }
});

window.addEventListener('resize', () => {
    suggestionsDiv.style.width = `${input.offsetWidth}px`;
    suggestionsDiv.style.left = `${input.getBoundingClientRect().left}px`;
    suggestionsDiv.style.top = `${input.getBoundingClientRect().bottom + window.scrollY}px`;
});