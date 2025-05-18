const data = {
    name: "ELTON MİRZƏYEV",
    title: "STUDENT",
    contact: [
      { icon: "location.png", text: "Azerbaijan/Baku" },
      { icon: "phone.png", text: "+994 50 868 34 22" },
      { icon: "email.png", text: "eltonmirzyev953@gmail.com" },
      { icon: "instagram.png", text: "Mirz_yev2007" }
    ],
    skills: ["Web Development", "HTML, CSS, JavaScript", "AWS and Azure"],
    languages: ["Azerbaijani", "Turkish"],
    profile: "Creative and detail-oriented individual with a strong passion for visual storytelling, technology, and problem-solving. Experienced in video editing, cinematography, and content creation for digital platforms, with a deep understanding of audience engagement. Simultaneously building a solid foundation in cybersecurity, ethical hacking, and network defense through academic studies and personal lab environments. Proficient in Python, C++, and web technologies such as HTML, CSS, and JavaScript. Adaptable and fast-learning, with a hands-on approach to both creative and technical challenges. Always eager to explore new tools, collaborate with diverse teams, and deliver high-quality results in dynamic environments.",
    workExperience: [
      { title: "Front-End Developer Intern", details: ["Developed responsive web pages for a startup, improving UX by 40%."] },
      { title: "Cybersecurity Analyst Assistant", details: ["Conducted vulnerability scans and drafted incident reports."] },
      { title: "IT Support Technician", details: ["Resolved 95% of user issues on first contact, ensuring smooth operations."] }
    ],
    education: [
      { period: "2013 - 2024", school: "Astara region Vagon village" },
      { period: "2024 - 2025", school: "AzTU - Information Security" }
    ]
  };

  document.querySelector(".CV_profile img").src = "photos/profile.png";
  document.getElementById("cv_name").innerText = data.name;
  document.getElementById("cv_title").innerText = data.title;
  document.getElementById("cv_location").innerText = data.contact[0].text;
  document.getElementById("cv_phone").innerText = data.contact[1].text;
  document.getElementById("cv_email").innerText = data.contact[2].text;
  document.getElementById("cv_instagram").innerText = data.contact[3].text;
  document.getElementById("about_me").innerText = data.profile;

  const skillsList = document.getElementById("resume_skills");
  data.skills.forEach(skill => {
    const li = document.createElement("li");
    li.innerText = skill;
    skillsList.appendChild(li);
  });

  const languagesList = document.getElementById("language_skills");
  data.languages.forEach(language => {
    const li = document.createElement("li");
    li.innerText = language;
    languagesList.appendChild(li);
  });

  const workList = document.getElementById("work");
  data.workExperience.forEach(work => {
    const li = document.createElement("li");
    li.innerHTML = `<div class="info"><p class="semi-bold">${work.title}</p><ul>${work.details.map(d => `<li>${d}</li>`).join('')}</ul></div>`;
    workList.appendChild(li);
  });

  const educationList = document.getElementById("education");
  data.education.forEach(edu => {
    const li = document.createElement("li");
    li.innerHTML = `<div class="date">${edu.period}</div><div class="info"><p class="semi-bold">${edu.school}</p></div>`;
    educationList.appendChild(li);
  });

  let workexp = false;
  let eduexp = false;

  function toggleWork() {
    workexp = !workexp;
    const workSection = document.getElementById("work");
    workSection.style.height = workexp ? "auto" : "0";
  }

  function toggleEducation() {
    eduexp = !eduexp;
    const eduSection = document.getElementById("education");
    eduSection.style.height = eduexp ? "auto" : "0";
  }

  function addSkill() {
    const skillName = prompt("New skill");
    if (skillName) {
      const li = document.createElement("li");
      li.innerText = skillName;
      document.getElementById("resume_skills").appendChild(li);
    }
  }

  function addLanguage() {
    const languageName = prompt("New language");
    if (languageName) {
      const li = document.createElement("li");
      li.innerText = languageName;
      document.getElementById("language_skills").appendChild(li);
    }
  }
