const filterButton = document.querySelector('#filter-button');
const keywordsInput = document.querySelector('#keywords');
const locationInput = document.querySelector('#location');
const featuredJobsContainer = document.querySelector('.featured-jobs');

filterButton.addEventListener('click', event => {
  event.preventDefault();

  const keywords = keywordsInput.value.trim().toLowerCase();
  const location = locationInput.value.trim().toLowerCase();

  featuredJobsContainer.innerHTML = '';

  fetch('jobs-data.json')
    .then(response => response.json())
    .then(jobs => {
      const filteredJobs = jobs.filter(job => {
        return (
          job.title.toLowerCase().includes(keywords) &&
          job.location.toLowerCase().includes(location)
        );
      });
      filteredJobs.forEach(generateJobElement);
    });
});

function generateJobElement(job) {
  const jobElement = document.createElement('div');
  const titleElement = document.createElement('h3');
  const companyElement = document.createElement('p');
  const locationElement = document.createElement('p');
  const descriptionElement = document.createElement('p');
  const applyButton = document.createElement('a');

  titleElement.textContent = job.title;
  companyElement.textContent = job.company;
  locationElement.textContent = job.location;
  descriptionElement.textContent = job.description;
  applyButton.textContent = 'Apply Now';
  applyButton.href = job.apply_url;

  jobElement.appendChild(titleElement);
  jobElement.appendChild(companyElement);
  jobElement.appendChild(locationElement);
  jobElement.appendChild(descriptionElement);
  jobElement.appendChild(applyButton);

  featuredJobsContainer.appendChild(jobElement);
}

