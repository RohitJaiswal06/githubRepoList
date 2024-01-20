var username = "freecodecamp"

const input = document.getElementById("input");
const button = document.getElementById("userSearch");
const loader = document.getElementById('loader');
loader.style.display='none';
button.addEventListener('click', function(){
    username = input.value;
    button.disabled = true;
    button.style.backgroundColor="grey";
    button.style.borderColor="grey"
    document.getElementById("searchheading").innerText="Refresh Page to find New User Repositry"
    loader.style.display='block';
      setTimeout(()=>{
        Userdata();
        userRepositories();
        input.value = "";
      },1500);
      
   
})

async function Userdata() {
    try {

      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);

      var newChildDiv1 = document.createElement("div");
      newChildDiv1.setAttribute('id', 'photo');

      var newImg = document.createElement("img");
      newImg.src = data.avatar_url;
      newImg.setAttribute('id', 'photo');

      newChildDiv1.appendChild(newImg);

      var newChildDiv2 = document.createElement("div");
      newChildDiv2.setAttribute('id', 'bio');

      var Name = document.createElement("h1");
      Name.setAttribute('id', 'name');

      var Bio = document.createElement("p");
      Bio.setAttribute('id', 'info');

      var Location = document.createElement("h4");
      Location.setAttribute('id', 'location');

      var Url = document.createElement("p");
      Url.setAttribute('id', 'link');

      newChildDiv2.appendChild(Name);
      newChildDiv2.appendChild(Bio);
      newChildDiv2.appendChild(Location);
      newChildDiv2.appendChild(Url);

      var heading = document.getElementById('heading');
      heading.appendChild(newChildDiv1);
      heading.appendChild(newChildDiv2);

      
      document.getElementById("name").innerHTML = "<b>Name : </b>" + data.login;
      document.getElementById("info").innerHTML =" <b>Bio : </b>" +  data.bio;
      document.getElementById("location").innerText ="Location : " +  data.location;
      document.getElementById("link").innerHTML="<b>Twitter name : </b>" +  data.twitter_username;
      loader.style.display='none';
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
}

async function userRepositories() {
    

    try {
          let currentPage = 1;
          const perPage = 10;
      
       async function fetchRepos(page){
        const response = await fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

      const data = await response.json();
      console.log(data);
      const langth =data.length;
      console.log(langth)
      const repoDiv = document.querySelector(".Repo");
      repoDiv.innerHTML = ''; 

      data.forEach(repo => {
        avtar = repo.owner.avatar_url;
        var newChildDiv = document.createElement("div");
        newChildDiv.classList.add("insiderepo");
        var newH1 = document.createElement("h1");
        newH1.classList.add("repohedding");
        newH1.innerText = repo.name;
        newChildDiv.appendChild(newH1);
        var newP = document.createElement("p");
        newP.innerText = repo.description ? repo.description : "nothing to show";
        newChildDiv.appendChild(newP);
        var newInnerDiv = document.createElement("div");
        newInnerDiv.innerText = repo.language;
        newInnerDiv.classList.add("language");
        newChildDiv.appendChild(newInnerDiv);
        repoDiv.appendChild(newChildDiv);
      });
     }


      const prevbtn=document.createElement('button');
      prevbtn.innerHTML="prev";
      prevbtn.setAttribute("id","prev");
      document.getElementById("pagination").appendChild(prevbtn)
      document.getElementById('prev').addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          fetchRepos(currentPage);
        }
      });
      function adder(currentPage){
      for (let i = currentPage; i <= currentPage+10; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        document.getElementById("pagination").appendChild(pageButton)
        pageButton.addEventListener('click', () => {
          currentPage = i;
          fetchRepos(currentPage);
          updateActiveButtonStates();
        });
    
         
      }
    
    }adder(currentPage);
 


      const nxtbtn=document.createElement('button');
      nxtbtn.innerText="next";
      nxtbtn.setAttribute("id","nxt");
      document.getElementById("pagination").appendChild(nxtbtn)
      document.getElementById('nxt').addEventListener('click', () => {
      
          currentPage++;
          fetchRepos(currentPage);
        
      });



      fetchRepos(currentPage);
      loader.style.display='none';
    }
    catch (error) {
      console.error('Error fetching repositories:',error);
  }
}