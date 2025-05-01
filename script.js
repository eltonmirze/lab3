document.addEventListener('DOMContentLoaded', () => {
    // --- DATA ---
    const userData = {
        name: "ELTON <span class='highlight'>MİRZƏYEV</span>",
        title: "STUDENT",
        contact: [
            { icon: "phone.png", text: "+994 50 868 34 22" },
            { icon: "email.png", text: "eltonmirzyev953@gmail.com" },
            { icon: "location.png", text: "Azerbaijan/Baku" }
        ],
        socialMedia: [
            { icon: "instagram.png", text: "Mirz_yev2007" },
            { icon: "github.png", text: "eltonmirze" }
        ],
        education: [
            { period: "2013 - 2024", school: "Astara region Vagon village" },
            { period: "2024 - 2025", school: "AzTU - Information Security" }
        ],
        skills: ["Web Development", "HTML, CSS, JavaScript", "AWS and Azure"],
        languages: ["Azerbaijani", "Turkish"],
        profile: "Creative and detail-oriented individual with a strong passion for visual storytelling, technology, and problem-solving. Experienced in video editing, cinematography, and content creation for digital platforms, with a deep understanding of audience engagement. Simultaneously building a solid foundation in cybersecurity, ethical hacking, and network defense through academic studies and personal lab environments. Proficient in Python, C++, and web technologies such as HTML, CSS, and JavaScript. Adaptable and fast-learning, with a hands-on approach to both creative and technical challenges. Always eager to explore new tools, collaborate with diverse teams, and deliver high-quality results in dynamic environments.",
        workExperience: [
            {
                title: "Front-End Developer Intern",
                details: ["Developed responsive web pages for a startup, improving UX by 40%."]
            },
            {
                title: "Cybersecurity Analyst Assistant",
                details: ["Conducted vulnerability scans and drafted incident reports."]
            },
            {
                title: "IT Support Technician",
                details: ["Resolved 95% of user issues on first contact, ensuring smooth operations."]
            }
        ],
        reference: "Senior Developer at TechNova Inc. An exceptionally fast learner and problem-solver. Highly recommended.",
        certifications: [
            {
                name: "Python for Everybody – University of Michigan (Coursera)",
                description: "Completed a structured series of courses teaching Python programming fundamentals, data structures, web scraping, and interacting with web APIs. Built multiple small-scale applications using Python."
            },
            {
                name: "Introduction to Cybersecurity – Cisco Networking Academy",
                description: "Gained insights into modern cybersecurity threats and defense strategies. Learned about malware, phishing, firewalls, access control, and ethical responsibilities in cyber defense."
            }
        ],
        projects: [
            {
                name: "Personal CV Website with Editable Client Pages",
                description: "Developed a fully responsive personal website using HTML, CSS, and JavaScript. Integrated editable profile sections with dynamic 'Save' and 'Edit' buttons that allow users to update information and save each version as a new HTML file in a designated client directory, all while maintaining consistent CSS styling across versions."
            },
            {
                name: "Cybersecurity Threat Dashboard (SIEM Prototype)",
                description: "Created a web-based threat monitoring dashboard using Flask and JavaScript that visualizes simulated log data in real time. Integrated with mock alert systems to demonstrate SIEM functionalities like intrusion detection, log correlation, and severity scoring."
            }
        ]
    };

    // --- ADD DATA TO PAGE ---
    document.getElementById('userName').innerHTML = userData.name;
    document.getElementById('userTitle').textContent = userData.title;

    const createList = (array, iconPath = "") => {
        return array.map(item => 
            `<p class="editable" contenteditable="false"><img src="photos/${iconPath}${item.icon || ''}" alt="" class="icon"> ${item.text}</p>`
        ).join('');
    };

    const createEducation = (array) => {
        return array.map(item => `<p><strong>${item.period}</strong><br>${item.school}</p>`).join('');
    };

    const createSkills = (array) => {
        return `<ul style="list-style-type: none;">${array.map(skill => `<li>${skill}</li>`).join('')}</ul>`;
    };

    const createWork = (array) => {
        return array.map(job => `
            <p><strong>${job.title}</strong></p>
            <ul style="list-style-type: none;">${job.details.map(d => `<li>${d}</li>`).join('')}</ul>
        `).join('');
    };

    const createCertifications = (array) => {
        return array.map(cert => `
            <p><strong>${cert.name}</strong></p>
            <p>${cert.description}</p>
        `).join('');
    };

    const createProjects = (array) => {
        return array.map(project => `
            <p><strong>${project.name}</strong></p>
            <p>${project.description}</p>
        `).join('');
    };

    document.getElementById('contactInfo').innerHTML = createList(userData.contact);
    document.getElementById('socialMedia').innerHTML = createList(userData.socialMedia);
    document.getElementById('educationInfo').innerHTML = createEducation(userData.education);
    document.getElementById('skillsInfo').innerHTML = createSkills(userData.skills);
    document.getElementById('languagesInfo').innerHTML = createSkills(userData.languages);
    document.getElementById('profileInfo').innerHTML = `<p>${userData.profile}</p>`;
    document.getElementById('workExperience').innerHTML = createWork(userData.workExperience);
    document.getElementById('referenceInfo').innerHTML = `<p>${userData.reference}</p>`;
    document.getElementById('certificationsInfo').innerHTML = createCertifications(userData.certifications);
    document.getElementById('projectsInfo').innerHTML = createProjects(userData.projects);

    // --- OLD FUNCTIONS (Edit, Save, Accordion, Zip) ---
    const editBtn = document.getElementById('editBtn');
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    let isEditing = false;

    // Accordion open/close
    accordionBtns.forEach(button => {
        button.addEventListener('click', () => {
            const panel = button.nextElementSibling;
            if (panel.classList.contains('active')) {
                panel.style.maxHeight = null;
                panel.classList.remove('active');
            } else {
                panel.classList.add('active');
                panel.style.maxHeight = "300px";
            }
        });
    });

    // Toggle edit mode
    editBtn.addEventListener('click', () => {
        isEditing = !isEditing;
        editBtn.textContent = isEditing ? 'Save' : 'Edit';

        // Open Accordion panels
        accordionBtns.forEach(btn => {
            const panel = btn.nextElementSibling;
            panel.classList.add('active');
            panel.style.maxHeight = "300px";
        });

        // Activate all editable fields
        const editableElements = document.querySelectorAll('h1, h3, .accordion-panel p, .accordion-panel li, .accordion-panel .editable');
        editableElements.forEach(el => {
            el.setAttribute('contenteditable', isEditing);
        });

        // Save
        if (!isEditing) {
            downloadFiles();
        }
    });

    // Add a new line on Enter key
    const panels = document.querySelectorAll('.accordion-panel');
    panels.forEach(panel => {
        panel.addEventListener('keydown', e => {
            if (!isEditing) return;
            if (e.key === 'Enter') {
                e.preventDefault();
                document.execCommand('insertHTML', false, '<br><br>');
            }
        });
    });

    // Download the page as ZIP
    async function downloadFiles() {
        const zip = new JSZip();

        // Add HTML file
        const html = document.documentElement.outerHTML;
        zip.file("index.html", html);

        // Add CSS file
        const cssPath = Array.from(document.styleSheets).find(s => s.href && s.href.endsWith("style.css"))?.href;
        if (cssPath) {
            try {
                const response = await fetch(cssPath);
                const cssText = await response.text();
                zip.file("style.css", cssText);
            } catch (err) {
                console.warn("CSS dosyası alınamadı:", err);
            }
        }

        // Add script file
        const scriptPath = Array.from(document.scripts).find(s => s.src && s.src.endsWith("script.js"))?.src;
        if (scriptPath) {
            try {
                const response = await fetch(scriptPath);
                const scriptText = await response.text();
                zip.file("script.js", scriptText);
            } catch (err) {
                console.warn("Script dosyası alınamadı:", err);
            }
        }

        // Add photos
        const images = [...document.querySelectorAll("img")];
        for (let img of images) {
            const src = img.src;
            if (src.startsWith("blob:")) continue;
            try {
                const res = await fetch(src);
                const blob = await res.blob();
                const name = img.src.split("/").pop();
                zip.file(`photos/${name}`, blob);
            } catch (err) {
                console.warn("Resim yüklenemedi:", src);
            }
        }

        // Download ZIP
        zip.generateAsync({ type: "blob" }).then(content => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = 'cv.zip';
            a.click();
        });
    }
});
