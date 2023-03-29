const searchGithubUser = (search) => {
    fetch('https://api.github.com/search/users?q=' + search, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json'
      }
    })
    .then(response => response.json())
    .then(searchUser => {
      const user = document.querySelector('#user-List');
      const repos = document.querySelector('#repos-List');
      user.innerHTML = '';
      repos.innerHTML = '';
      const data = searchUser.items;
      console.log(data);
      displaySearchResults(data); // call a function to display the search results on the page
    })
    .catch(error => console.error(error));
  };
  
  //const displaySearchResults = (data) => {
    // code to display the search results
  //};
  
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("#github-form");
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const search = e.target.search.value;
      searchGithubUser(search); // call the searchGithubUser function
    });
  });
  

  
  const displaySearchResults = (data) => {
    const userContainer = document.querySelector('#user-List');
    data.forEach((user) => {
      const userDiv = document.createElement('div');
      userDiv.classList.add('user');
  
      const avatar = document.createElement('img');
      avatar.src = user.avatar_url;
  
      const username = document.createElement('a');
      username.href = user.html_url;
      username.textContent = user.login;
  
      // Add click event listener to each user element
      userDiv.addEventListener('click', () => {
        getUserRepos(user.login);
      });
  
      userDiv.appendChild(avatar);
      userDiv.appendChild(username);
      userContainer.appendChild(userDiv);
    });
  };
  

const getUserRepos = (username) => {
    fetch(`https://api.github.com/users/${username}/repos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json'
      }
    })
    .then(response => response.json())
    .then(repos => {
      displayUserRepos(username, repos);
    })
    .catch(error => console.error(error));
  };
  
const displayUserRepos = (username, repos) => {
    const reposContainer = document.querySelector('#repos-List');
    const reposDiv = document.createElement('div');
    reposDiv.classList.add('repos');
  
    const title = document.createElement('h2');
    title.textContent = `${username}'s Repositories`;
  
    const list = document.createElement('ul');
    repos.forEach((repo) => {
      const listItem = document.createElement('li');
      const repoLink = document.createElement('a');
      repoLink.href = repo.html_url;
      repoLink.textContent = repo.name;
      listItem.appendChild(repoLink);
      list.appendChild(listItem);
    });
  
    reposDiv.appendChild(title);
    reposDiv.appendChild(list);
    reposContainer.innerHTML = '';
    reposContainer.appendChild(reposDiv);
  };
  



