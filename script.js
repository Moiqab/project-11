const filter=document.getElementById('filter');
const newsfeed=document.getElementById('newsfeed-container');
const loader=document.getElementById('loader');

let limit=5;
let page=1;

async function fetchposts(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();
    return data;
}
async function renderposts(){
    const posts= await fetchposts();
    posts.forEach(post =>{
        const postdiv =document.createElement('div');
        postdiv.classList.add('post');
        postdiv.innerHTML=`
        <div class="post-id">${post.id}</div>
        <div class="post-content">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>    
        </div>
        `
        newsfeed.appendChild(postdiv);
    });
}
function showloader(){
    loader.classList.add('show');
    page++;
    renderposts();
    loader.classList.remove('show');
}
function filterPosts(e) {
    const filterKeyword = e.target.value.toLowerCase();
    const posts = document.querySelectorAll('.post');
        posts.forEach( post => {
       
        const title = post.querySelector('.post-title').innerText;
       
        const body = post.querySelector('.post-body').innerText;
        if ( title.indexOf(filterKeyword) >= 0 || body.indexOf(filterKeyword) >= 0 ) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    })
};

// Events listners

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if ( scrollTop + clientHeight >= scrollHeight - 1 ) {
        showloader();
    };
});
filter.addEventListener('input', filterPosts);
renderposts();