// Import any needed model functions
import { getAllCategories, getCategoryById, getCategoriesForProject, getProjectsForCategory} from '../models/categories.js';

// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('category', { title, categories, currentPage: 'categories' });
};  

const showCategoryDetailsPage = async (req, res) => {

    const category_id = req.params.category_id;

    try {

        const category = await getCategoryById(category_id);

        if (!category) {
            return res.status(404).send("Category not found");
        }

        const projects = await getProjectsForCategory(category_id);

        res.render("category", {
            title: category.name,
            category,
            projects,
            currentPage: 'categories'
        });

    } catch (error) {

        console.error(error);

        res.status(500).send("Internal Server Error");

    }

};

// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage };
