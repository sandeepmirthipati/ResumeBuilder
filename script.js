/* INPUT LIVE UPDATE */

const inputs = document.querySelectorAll("input, textarea");

inputs.forEach(input => {
  input.addEventListener("input", updateResume);
});

document.getElementById("type").addEventListener("change", toggleExperience);

/* STORAGE ARRAYS */

let educationList = JSON.parse(localStorage.getItem("education")) || [];
let skillList = JSON.parse(localStorage.getItem("skills")) || [];
let projectList = JSON.parse(localStorage.getItem("projects")) || [];
let achievementList = JSON.parse(localStorage.getItem("achievements")) || [];
let experienceList = JSON.parse(localStorage.getItem("experience")) || [];

/* SAVE DATA */

function saveData() {
  localStorage.setItem("education", JSON.stringify(educationList));
  localStorage.setItem("skills", JSON.stringify(skillList));
  localStorage.setItem("projects", JSON.stringify(projectList));
  localStorage.setItem("achievements", JSON.stringify(achievementList));
  localStorage.setItem("experience", JSON.stringify(experienceList));
}

/* LOAD DATA */

window.onload = function () {
  renderEducation();
  renderSkills();
  renderProjects();
  renderAchievements();
  renderExperience();
  toggleExperience();
  updateResume();
};

/* BASIC DETAILS */

function updateResume() {

  let name = document.getElementById("name").value;
  let location = document.getElementById("location").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let linkedin = document.getElementById("linkedin").value;
  let github = document.getElementById("github").value;

  document.getElementById("pname").innerText = name;
  document.getElementById("plocation").innerText = location;
  document.getElementById("pphone").innerText = phone;

  document.getElementById("pemail").innerText = email;
  document.getElementById("pemail").href = "mailto:" + email;

  /* LINKEDIN */
  if (linkedin) {
    let link = linkedin.includes("http") ? linkedin : "https://" + linkedin;
    document.getElementById("plinkedin").href = link;
    document.getElementById("plinkedin").innerText = linkedin;
  }

  /* GITHUB */
  if (github) {
    let link = github.includes("http") ? github : "https://" + github;
    document.getElementById("pgithub").href = link;
    document.getElementById("pgithub").innerText = github;
  }

  /* DOB FORMAT */
  let dobValue = document.getElementById("dob").value;

  if (dobValue) {
    let date = new Date(dobValue);

    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let year = date.getFullYear();

    document.getElementById("pdob").innerText = `${day}/${month}/${year}`;
  }

  document.getElementById("pgender").innerText = document.getElementById("gender").value;
  document.getElementById("pmarital").innerText = document.getElementById("marital").value;
  document.getElementById("pnationality").innerText = document.getElementById("nationality").value;
  document.getElementById("planguages").innerText = document.getElementById("languages").value;
  document.getElementById("pinterests").innerText = document.getElementById("interests").value;
  document.getElementById("pdeclaration").innerText = document.getElementById("declaration").value;
}

/* EXPERIENCE TOGGLE */

function toggleExperience() {

  let type = document.getElementById("type").value;

  let expForm = document.getElementById("experienceFields");
  let expBlock = document.getElementById("pexperienceBlock");

  if (type === "experienced") {
    expForm.style.display = "block";
    expBlock.style.display = "block";
  } else {
    expForm.style.display = "none";
    expBlock.style.display = "none";
  }
}

/* EDUCATION */

function addEducation() {

  let degree = document.getElementById("degree").value;
  let college = document.getElementById("college").value;
  let year = document.getElementById("year").value;
  let percentage = document.getElementById("percentage").value;

  if (!degree && !college) return;

  educationList.push({ degree, college, year, percentage });

  saveData();
  renderEducation();

  document.getElementById("degree").value = "";
  document.getElementById("college").value = "";
  document.getElementById("year").value = "";
  document.getElementById("percentage").value = "";
}

function renderEducation() {

  let container = document.getElementById("peducation");
  container.innerHTML = "";

  educationList.forEach((edu, index) => {

    container.innerHTML += `
    <div class="edu-block">

      <div class="edu-row">
        <span class="edu-degree">${edu.degree}</span>
        <span class="edu-year">${edu.year}</span>
      </div>

      <div class="edu-row">
        <span class="edu-college">${edu.college}</span>
        <span class="edu-percentage">${edu.percentage}</span>
      </div>

      <button class="edit-btn" onclick="editEducation(${index})">Edit</button>
      <button class="delete-btn" onclick="deleteEducation(${index})">Delete</button>

    </div>`;
  });
}

function deleteEducation(i) {
  educationList.splice(i, 1);
  saveData();
  renderEducation();
}

function editEducation(i) {

  let e = educationList[i];

  document.getElementById("degree").value = e.degree;
  document.getElementById("college").value = e.college;
  document.getElementById("year").value = e.year;
  document.getElementById("percentage").value = e.percentage;

  educationList.splice(i, 1);
  saveData();
  renderEducation();
}

/* SKILLS */

function addSkill() {

  let title = document.getElementById("skillTitle").value;
  let skills = document.getElementById("skillList").value;

  if (!title || !skills) return;

  skillList.push({ title, skills });

  saveData();
  renderSkills();

  document.getElementById("skillTitle").value = "";
  document.getElementById("skillList").value = "";
}

function renderSkills() {

  let list = document.getElementById("pskills");
  list.innerHTML = "";

  skillList.forEach((s, i) => {

    list.innerHTML += `
    <li>
      <span class="skill-title">${s.title}:</span>
      <span class="skill-items">${s.skills}</span>

      <button class="edit-btn" onclick="editSkill(${i})">Edit</button>
      <button class="delete-btn" onclick="deleteSkill(${i})">Delete</button>
    </li>`;
  });
}

function deleteSkill(i) {
  skillList.splice(i, 1);
  saveData();
  renderSkills();
}

function editSkill(i) {

  let s = skillList[i];

  document.getElementById("skillTitle").value = s.title;
  document.getElementById("skillList").value = s.skills;

  skillList.splice(i, 1);
  saveData();
  renderSkills();
}

/* PROJECTS */

function addProject() {

  let title = document.getElementById("projectTitle").value;
  let tagline = document.getElementById("projectTagline").value;
  let p1 = document.getElementById("projectPoint1").value;
  let p2 = document.getElementById("projectPoint2").value;

  if (!title) return;

  projectList.push({ title, tagline, p1, p2 });

  saveData();
  renderProjects();

  document.getElementById("projectTitle").value = "";
  document.getElementById("projectTagline").value = "";
  document.getElementById("projectPoint1").value = "";
  document.getElementById("projectPoint2").value = "";
}

function renderProjects() {

  let container = document.getElementById("pproject");
  container.innerHTML = "";

  projectList.forEach((p, i) => {

    container.innerHTML += `
    <div class="project-block">

      <div>
        <span class="project-title">${p.title}</span>
        <span> | </span>
        <span class="project-tagline">${p.tagline}</span>
      </div>

      <ul class="project-points">
        ${p.p1 ? `<li>${p.p1}</li>` : ""}
        ${p.p2 ? `<li>${p.p2}</li>` : ""}
      </ul>

      <button class="edit-btn" onclick="editProject(${i})">Edit</button>
      <button class="delete-btn" onclick="deleteProject(${i})">Delete</button>

    </div>`;
  });
}

function deleteProject(i) {
  projectList.splice(i, 1);
  saveData();
  renderProjects();
}

function editProject(i) {

  let p = projectList[i];

  document.getElementById("projectTitle").value = p.title;
  document.getElementById("projectTagline").value = p.tagline;
  document.getElementById("projectPoint1").value = p.p1;
  document.getElementById("projectPoint2").value = p.p2;

  projectList.splice(i, 1);
  saveData();
  renderProjects();
}

/* ACHIEVEMENTS */

function addAchievement() {

  let title = document.getElementById("achievementTitle").value;
  let desc = document.getElementById("achievementDesc").value;

  if (!title) return;

  achievementList.push({ title, desc });

  saveData();
  renderAchievements();

  document.getElementById("achievementTitle").value = "";
  document.getElementById("achievementDesc").value = "";
}

function renderAchievements() {

  let list = document.getElementById("pachievements");
  list.innerHTML = "";

  achievementList.forEach((a, i) => {

    list.innerHTML += `
    <li>
      <b>${a.title}</b>: ${a.desc}

      <button class="edit-btn" onclick="editAchievement(${i})">Edit</button>
      <button class="delete-btn" onclick="deleteAchievement(${i})">Delete</button>
    </li>`;
  });
}

function deleteAchievement(i) {
  achievementList.splice(i, 1);
  saveData();
  renderAchievements();
}

function editAchievement(i) {

  let a = achievementList[i];

  document.getElementById("achievementTitle").value = a.title;
  document.getElementById("achievementDesc").value = a.desc;

  achievementList.splice(i, 1);
  saveData();
  renderAchievements();
}

/* EXPERIENCE */

function addExperience() {

  let company = document.getElementById("company").value;
  let role = document.getElementById("role").value;
  let duration = document.getElementById("duration").value;
  let desc = document.getElementById("expDesc").value;

  if (!company && !role) return;

  experienceList.push({ company, role, duration, desc });

  saveData();
  renderExperience();

  document.getElementById("company").value = "";
  document.getElementById("role").value = "";
  document.getElementById("duration").value = "";
  document.getElementById("expDesc").value = "";
}

function renderExperience() {

  let container = document.getElementById("pexperience");
  container.innerHTML = "";

  experienceList.forEach((exp, i) => {

    container.innerHTML += `
    <div class="project-block">

      <div>
        <b>${exp.role}</b> at ${exp.company}
        <span> (${exp.duration}) </span>
      </div>

      <p>${exp.desc}</p>

      <button class="edit-btn" onclick="editExperience(${i})">Edit</button>
      <button class="delete-btn" onclick="deleteExperience(${i})">Delete</button>

    </div>`;
  });
}

function deleteExperience(i) {
  experienceList.splice(i, 1);
  saveData();
  renderExperience();
}

function editExperience(i) {

  let exp = experienceList[i];

  document.getElementById("company").value = exp.company;
  document.getElementById("role").value = exp.role;
  document.getElementById("duration").value = exp.duration;
  document.getElementById("expDesc").value = exp.desc;

  experienceList.splice(i, 1);
  saveData();
  renderExperience();
}

/* DOWNLOAD PDF */

function downloadPDF() {

  let element = document.getElementById("resume");

  element.classList.add("pdf-mode");

  let opt = {
    margin: [10, 10, 10, 10],
    filename: "resume.pdf",

    image: { type: "jpeg", quality: 1 },

    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true
    },

    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait"
    },

    pagebreak: {
      mode: ['css', 'legacy']
    }
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      element.classList.remove("pdf-mode");
    });
}