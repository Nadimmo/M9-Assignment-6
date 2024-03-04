const loadDataAllPost = async (search)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`)
    const data = await res.json()
    const posts = data.posts;
    ShowDisplayPosts(posts)
    // console.log(posts)
}

// All Posts
const ShowDisplayPosts = (posts)=>{
    // console.log(posts)

    posts.forEach((post) =>{
        // console.log(post)
        // console.log(post.author.name)
        const currentDiv = document.getElementById('AllPostCotainer')
        // currentDiv.innerText = ''
        const createDive = document.createElement('div')
        createDive.className = "singlePost"
        createDive.innerHTML = `
        <div class = 'block lg:flex lg:w-[560px] pt-10 bg-sky-50 m-4 lg:m-10 p-5 rounded-xl'>
        <!-- image  -->
        <div class = "online">
            <img id="img" src="${post.image}" alt="Loading..." class = " w-[80px] h-[80px] rounded-lg ">
        </div>
        <!-- category and name -->
        <div class="lg:ml-[40px]">
            <div class="block lg:flex gap-5">
                <p id="category">#${post.category}</p>
                <p id="name">Author : ${post.author.name}</p>
            </div>
            <!-- title -->
            <h1 id="title" class="text-lg font-bold ">${post.title}</h1>
            <!-- description -->
            <p id="description" class="pt-2 text-[14px] w-[90%]">${post.description}</p>
            <br>
            <hr>
            <!-- icon -->
            <div class="block lg:flex pt-4 ">
                <div class="flex gap-4">
                    <p id="comment_count"><i class="fa-solid fa-comment"></i> ${post.comment_count}</p>
                    <p id="view_count"><i class="fa-solid fa-eye"></i> ${post.view_count}</p>
                    <p id="posted_time"><i class="fa-solid fa-clock"></i> ${post.posted_time}</p>
                </div>
                <div class =" mt-3 lg:mt-0 lg:ml-[200px]">
                    <p><button class="RightSide" onclick = "ShowDataRightSide('${post.title}','${post.view_count}')"> <img src="images/Vector.jpg" alt="">
                    </button></p>
                </div>
            </div>
        </div>
        </div>
        `
        currentDiv.appendChild(createDive)
    })
    loadding(false)
}

// latest post 
const latestPost = async()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const data = await res.json()
    // console.log(data)
    ShowlatestPostDisplay(data)
}

const ShowlatestPostDisplay = (data) =>{
    // console.log(data)
    data.forEach((signlePost =>{
        // console.log(signlePost)
        // console.log(signlePost.author.posted_date)

        const currentDiv = document.getElementById('latestPost')
        const createDive = document.createElement('div')
        createDive.className = "createDiv"
        createDive.innerHTML = `
        <div class="w-[320px] h-[450px] bg-zinc-50 p-6 border border-gray-500">
                    <img id="cover_imag" src="${signlePost.cover_image}" alt="loading.." class = 'rounded-lg'>
                    <p id="posted_date" class = "p-2"><i class="fa-solid fa-calendar-days"></i> <span>${signlePost.author.posted_date || "No Published Date"}</span> </p>
                    <h1 id="title" class="font-bold w-[200px]">${signlePost.title}</h1>
                    <p id="description" class="text-[14px] pt-2">${signlePost.description}</p>
                    <div class="flex gap-4 pt-4">
                        <img id="profile_image" src="${signlePost.profile_image}" alt="loading" class = "w-[50px] h-[50px] rounded-[50%]" >
                        <div>
                            <h3 id="name" class="font-bold">${signlePost.author.name}</h3>
                            <p id="designation">${signlePost.author.designation || "Unknown"}</p>
                        </div>
                    </div>
        </div>
        <br>
        `
        currentDiv.appendChild(createDive)

    }))
}


// Right Side Click and Add Title , View Count
function ShowDataRightSide(title,view){

        // / current Score
            const currentScore = ConvertToNumber('countScore');
            const updateScore = currentScore + 1;
            // update Score
            document.getElementById('countScore').innerText = updateScore;
    
        const currentDiv = document.getElementById('currentDiv')
            // create div 
            const createDive = document.createElement('div')
            createDive.innerHTML = `
            <div class = "flex gap-2 mt-4">
                <h1 class = "w-[80%]">${title}</h1>
                <p><i class="fa-regular fa-eye"></i> ${view}</i></p>
            </div>
            <br> `
            currentDiv.appendChild(createDive)

}

// Search All Post
function SearchBtnClick(){
    loadding(true)
    const inputText = document.getElementById('inputText')
    const inputValue = inputText.value
    // clear current div
    const currentDiv = document.getElementById('AllPostCotainer')
        currentDiv.innerText = '';

    loadDataAllPost(inputValue)
}

const loadding = (isloadding) =>{
    const load = document.getElementById('loading')
    if(isloadding){
        load.classList.remove('hidden')
    }else{
        load.classList.add('hidden')
    }
}

function ConvertToNumber(id){
    const element = document.getElementById(id)
    const convert = parseInt(element.innerText);
    return convert;
}


latestPost()
loadDataAllPost()
SearchBtnClick()
// ShowDataRightSide()
