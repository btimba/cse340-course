// Import any needed model functions
import { getAllProjects, getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoryById, getCategoriesForProject, getProjectsForCategory } from '../models/categories.js';

// Define any controller functions
const showProjectsPage = async (req, res) => {
   const number_of_upcoming_projects = 5; // You can adjust this number as needed
   
   try {
        const projects = await getUpcomingProjects(number_of_upcoming_projects);
        const projectsWithCategories = await Promise.all(
            projects.map(async (project) => {
                const categories = await getCategoriesForProject(project.project_id);
                return { ...project, categories };
            })
        );
        const title = 'Upcoming Service Projects';
        res.render('projects', { title, projects: projectsWithCategories, currentPage: 'projects' });
   } catch (error) {
       console.error('Error fetching projects:', error);
       res.status(500).send('Internal Server Error');
   }
};  

const showProjectDetailsPage = async (req, res) => {
    const project_id = req.params.project_id;
    try {
        const project = await getProjectDetails(project_id);
        if (!project) {
            return res.status(404).send('Project not found');
        }

        const categories = await getCategoriesForProject(project_id);

        const title = `Project: ${project.title}`;
        res.render('project', { title, project, categories, currentPage: 'projects' });
    } catch (error) {
        console.error('Error fetching project details:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Export any controller functions
export { showProjectsPage, showProjectDetailsPage };