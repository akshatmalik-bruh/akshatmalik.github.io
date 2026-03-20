import About from "../pages/Content/LandingPage";
import Skills from "../pages/Content/Skills";
import Projects from "../pages/Content/Projects";
import Contact from "../pages/Content/Contact";
import Resume from "../pages/Content/Resume";
import ProjectDetail from "../pages/Content/ProjectDetail";
import AboutMe from "../pages/Content/AboutMe";
import Publication from "../pages/Content/Publication";
import { PROJECTS_DATA } from "./resumeData";

export const FILES = {
    app: { name: "app.jsx", ext: "jsx", lang: "JSX", Content: About, path: "/" },
    aboutMe: { name: "about_me.jsx", ext: "jsx", lang: "JSX", Content: AboutMe, path: "/about-me" },
    skills: { name: "skills.tsx", ext: "tsx", lang: "TypeScript", Content: Skills, path: "/skills" },
    projects: { name: "projects.js", ext: "js", lang: "JavaScript", Content: Projects, path: "/projects" },
    contact: { name: "contact.json", ext: "json", lang: "JSON", Content: Contact, path: "/contact" },
    resume: { name: "resume.pdf", ext: "pdf", lang: "PDF", Content: Resume, path: "/resume", labelColor: "#e06c75" },
    publication: { name: "publication.md", ext: "md", lang: "Markdown", Content: Publication, folder: "publications", path: "/publications/youth-standpoints" },
    
    // Dynamic project files
    ...PROJECTS_DATA.reduce((acc, p) => {
        const id = p.name.toLowerCase().replace(/ /g, '-');
        acc[id] = {
            name: `${id}.js`,
            ext: "js",
            lang: "JavaScript",
            Content: ProjectDetail,
            path: `/projects/${id}`,
            folder: "projects"
        };
        return acc;
    }, {})
};

export const GLOBAL_FILES = ["resume"];
export const ROOT_FILES = ["app", "aboutMe", "skills", "projects", "contact"];
export const PUBLICATIONS_FILES = ["publication"];
export const PUBLIC_FILES = []; // Placeholder to prevent build errors from missing exports
export const PROJECT_FILES = PROJECTS_DATA.map(p => p.name.toLowerCase().replace(/ /g, '-'));
