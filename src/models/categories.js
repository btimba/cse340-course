import db from "./db.js";

const getAllCategories = async () => {
    try {
        const query = `
            SELECT
                category_id,
                name
            FROM category
            ORDER BY name;
        `;

        const result = await db.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        return [];
    }
};

//retrieve a single category by its id
const getCategoryById = async (category_id) => {
    try {
        const query = `
            SELECT
                category_id,
                name
            FROM category
            WHERE category_id = $1;
        `;

        const result = await db.query(query, [category_id]);

        return result.rows[0] || null;
    } catch (error) {
        console.error('Error fetching category details:', error.message);
        return null;
    }
};

//Retrieve all categories for a given service project.
const getCategoriesForProject = async (project_id) => {
    try {
        const query = `
            SELECT
                c.category_id,
                c.name
            FROM category c
            JOIN service_project_category spc
                ON c.category_id = spc.category_id
            WHERE spc.project_id = $1
            ORDER BY c.name;
        `;

        const result = await db.query(query, [project_id]);

        return result.rows;
    } catch (error) {
        console.error('Error fetching categories for project:', error.message);
        return [];
    }
};

//retrieve all projects associated with a specific category
const getProjectsForCategory = async (category_id) => {
    try {
        const query = `
            SELECT
                sp.project_id,
                sp.title,
                sp.project_date,
                o.name AS organization_name
            FROM service_project sp
            JOIN service_project_category spc
                ON sp.project_id = spc.project_id
            JOIN organization o
                ON sp.organization_id = o.organization_id
            WHERE spc.category_id = $1
            ORDER BY sp.project_date;
        `;

        const result = await db.query(query, [category_id]);

        return result.rows;
    } catch (error) {
        console.error('Error fetching projects for category:', error.message);
        return [];
    }
};

export { getAllCategories, getCategoryById, getProjectsForCategory , getCategoriesForProject };