// Import any needed model functions
import { getAllOrganizations, getOrganizationDetails, getProjectsForOrganization } from '../models/organizations.js';

// Define any controller functions
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations, currentPage: 'organizations' });
};

const showOrganizationDetailsPage = async (req, res) => {
    try {
        const organization = await getOrganizationDetails(req.params.organization_id);

        if (!organization) {
            return res.status(404).send('Organization not found');
        }

        const projects = await getProjectsForOrganization(req.params.organization_id);

        res.render('organization', {
            title: organization.name,
            organization,
            projects,
            currentPage: 'organizations'
        });
    } catch (error) {
        console.error('Error fetching organization details:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Export any controller functions
export { showOrganizationsPage, showOrganizationDetailsPage };
