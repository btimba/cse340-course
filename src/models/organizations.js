import db from './db.js'

const getAllOrganizations = async() => {
    try {
        const query = `
            SELECT organization_id, name, description, contact_email, logo_filename
          FROM public.organization;
        `;

        const result = await db.query(query);

        return result.rows;
    } catch (error) {
        console.error('Error fetching organizations:', error.message);
        return [];
    }
}

const getOrganizationDetails = async (organization_id) => {
    try {
        const query = `
            SELECT organization_id, name, description, contact_email, logo_filename
            FROM public.organization
            WHERE organization_id = $1;
        `;

        const result = await db.query(query, [organization_id]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Error fetching organization details:', error.message);
        return null;
    }
}

const getProjectsForOrganization = async (organization_id) => {
    try {
        const query = `
            SELECT
                sp.project_id,
                sp.title,
                sp.project_date,
                sp.location
            FROM service_project sp
            WHERE sp.organization_id = $1
            ORDER BY sp.project_date;
        `;

        const result = await db.query(query, [organization_id]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching projects for organization:', error.message);
        return [];
    }
}

export { getAllOrganizations, getOrganizationDetails, getProjectsForOrganization }  