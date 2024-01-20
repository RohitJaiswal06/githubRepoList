var username = "freecodecamp"

const input = document.getElementById("input");
const button = document.getElementById("userSearch");

button.addEventListener('click', function(){
    username = input.value;
    Userdata();
    userRepositories();
    input.value = "";
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
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
}

async function userRepositories() {
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
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
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
}