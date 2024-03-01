
const buttonContainer = document.getElementById('btn-category-container');
const contentContainer = document.getElementById('content-container');


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

const loadNewsData = async (catId) => {
    const url = `https://openapi.programming-hero.com/api/videos/category/${catId}`;
    const res = await fetch(url);
    const data = await res.json();
    const contents = data.data;



}

loadCategory()
loadNewsData()