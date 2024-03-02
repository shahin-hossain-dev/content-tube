
const buttonContainer = document.getElementById('btn-category-container');
const contentContainer = document.getElementById('content-container');


let categoryId = 1000;
let sortView = false;

document.getElementById('sort-view').addEventListener('click', function () {
    loadNewsData(categoryId, sortView = true)
})

const loadCategory = async () => {
    const url = 'https://openapi.programming-hero.com/api/videos/categories';

    const res = await fetch(url);
    const data = await res.json();
    const allCategory = data.data;

    allCategory.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'btn cat-btn btn-active text-white font-bold text-lg';
        btn.innerText = category.category;
        buttonContainer.appendChild(btn)
        btn.addEventListener('click', () => {
            const allBtn = document.querySelectorAll('.cat-btn');
            allBtn.forEach(btn => {
                btn.classList.remove('bg-rose-500')
            })
            btn.classList.add('bg-rose-500')
            loadNewsData(category.category_id)
        })
    })
}

const loadNewsData = async (catId, sortView) => {
    categoryId = catId;
    const url = `https://openapi.programming-hero.com/api/videos/category/${catId}`;
    const res = await fetch(url);
    const data = await res.json();
    let contents = data.data;

    if (sortView) {
        contents = contents.sort((a, b) => {
            const first = parseFloat(a.others.views.replace('K', ''));
            const second = parseFloat(b.others.views.replace('K', ''));
            return second - first
        });
    }

    displayContentData(contents);

}
const displayContentData = (contents) => {
    const noContent = document.getElementById('no-content');
    if (contents.length === 0) {
        noContent.classList.remove('hidden');
    }
    else {
        noContent.classList.add('hidden')
    }

    contentContainer.innerHTML = '';

    // const sortContents = contents.sort((a, b) => b - a)

    contents.forEach(content => {

        const millisecond = parseFloat(content.others.posted_date);
        // const day = Math.floor(((millisecond / 60000) / 60) / 24);
        const hour = ((millisecond / 60000) / 60)
        const min = hour % 60;
        // console.log(day, parseInt(hour.toFixed(0)), parseInt(min.toFixed(0)));
        const time = `
            <span class='relative -top-10 left-10 text-white'>
                ${isNaN(hour) ? '0' : hour.toFixed(0)}hrs,
                ${isNaN(min) ? '0' : min.toFixed(0)} min ago
            </span>
        `

        // console.log(content.others.posted_date);

        const card = document.createElement('div');
        card.className = 'card bg-base-100 shadow-xl';

        card.innerHTML = `
        <div>
        <figure><img class="h-[180px] rounded-t-2xl" src="${content.thumbnail}"
        alt="Shoes" />
        </figure>
            ${(min >= 1) ? time : ''}
        </div>
        <div class="flex items-center gap-3 mt-4 p-3">
            <div>
                <img class='w-[50px] h-[50px] rounded-full' src="${content.authors[0].profile_picture}" alt="">
            </div>
        <div>
        <h2 class="card-title">${content.title}</h2>
        <div class="flex items-center">
            <p>${content.authors[0].profile_name}</p>
            <div>
            ${content.authors[0].verified || '<img src="/assets/badge.png" alt=""></img>'}
            </div>
        </div>
        <p>${content.others.views}</p>
    </div>  
        `
        contentContainer.appendChild(card);
    })
}
loadCategory()
loadNewsData(categoryId, sortView)
