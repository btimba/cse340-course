import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showProjectsPage } from './controllers/projects.js';
import { showCategoriesPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showProjectDetailsPage } from './controllers/projects.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:organization_id', showOrganizationDetailsPage);
router.get('/projects/:project_id', showProjectDetailsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/category', showCategoriesPage);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;