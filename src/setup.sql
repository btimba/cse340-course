-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Service Project Table
-- ========================================
CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_service_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization (organization_id)
        ON DELETE CASCADE
);

-- ========================================
-- Category Table
-- ========================================
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================================
-- Junction Table
-- ========================================
CREATE TABLE service_project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES service_project(project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);

INSERT INTO category (name)
VALUES
('Community Development'),
('Environmental Sustainability'),
('Volunteer Services');

INSERT INTO service_project_category (project_id, category_id)
VALUES
-- Community Development
(1,1),
(2,1),
(9,1),
(10,1),
(11,1),

-- Environmental Sustainability
(3,2),
(4,2),
(14,2),
(15,2),
(16,2),

-- Volunteer Services
(5,3),
(6,3),
(19,3),
(20,3),
(21,3);

INSERT INTO organization (
    name,
    description,
    contact_email,
    logo_filename
)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

INSERT INTO service_project (
    organization_id,
    title,
    description,
    location,
    project_date
)
VALUES
-- ========================================
-- BrightFuture Builders (Organization ID: 1)
-- ========================================
(
    1,
    'Community Playground Renovation',
    'Renovate an aging playground using sustainable building materials and improved safety features.',
    'Hermanus Community Park',
    '2026-08-15'
),
(
    1,
    'Senior Center Accessibility Upgrade',
    'Install wheelchair ramps, handrails, and accessible entrances for the senior center.',
    'Hermanus Senior Centre',
    '2026-09-10'
),
(
    1,
    'Affordable Housing Repair Initiative',
    'Repair homes for low-income families using volunteer construction teams.',
    'Zwelihle, Hermanus',
    '2026-09-24'
),
(
    1,
    'Community Library Expansion',
    'Build an additional reading room and study space for the local library.',
    'Hermanus Public Library',
    '2026-10-08'
),
(
    1,
    'School Classroom Refurbishment',
    'Refurbish classrooms with energy-efficient lighting and durable furniture.',
    'Hermanus Primary School',
    '2026-10-22'
),

-- ========================================
-- GreenHarvest Growers (Organization ID: 2)
-- ========================================
(
    2,
    'Urban Vegetable Garden',
    'Develop a community vegetable garden promoting sustainable food production.',
    'Overstrand Community Garden',
    '2026-08-22'
),
(
    2,
    'School Gardening Workshop',
    'Teach students sustainable gardening techniques through hands-on activities.',
    'Hermanus Primary School',
    '2026-09-05'
),
(
    2,
    'Tree Planting Day',
    'Plant indigenous trees to improve biodiversity and green public spaces.',
    'Fernkloof Nature Reserve',
    '2026-09-19'
),
(
    2,
    'Composting Education Program',
    'Educate residents on home composting and reducing food waste.',
    'Hermanus Community Hall',
    '2026-10-03'
),
(
    2,
    'Community Farmers Market',
    'Host a local farmers market showcasing fresh produce from urban gardens.',
    'Hermanus Market Square',
    '2026-10-17'
),

-- ========================================
-- UnityServe Volunteers (Organization ID: 3)
-- ========================================
(
    3,
    'Beach Cleanup Day',
    'Coordinate volunteers to remove litter and plastic waste from local beaches.',
    'Grotto Beach',
    '2026-08-30'
),
(
    3,
    'Winter Food Drive',
    'Collect and distribute food parcels to families experiencing food insecurity.',
    'Hermanus Civic Centre',
    '2026-09-18'
),
(
    3,
    'Youth Mentorship Program',
    'Connect community volunteers with high school learners for mentoring sessions.',
    'Hermanus High School',
    '2026-10-02'
),
(
    3,
    'Community Health Fair',
    'Organize free health screenings and wellness education with local healthcare providers.',
    'Hermanus Sports Grounds',
    '2026-10-16'
),
(
    3,
    'Holiday Toy Collection',
    'Collect and distribute toys and gifts to children during the holiday season.',
    'Hermanus Community Centre',
    '2026-11-21'
);

SELECT
    sp.project_id,
    sp.title,
    o.name AS organization,
    sp.location,
    sp.project_date
FROM service_project sp
JOIN organization o
    ON sp.organization_id = o.organization_id
ORDER BY sp.project_date;

SELECT
    o.name AS organization,
    COUNT(sp.project_id) AS total_projects
FROM organization o
LEFT JOIN service_project sp
    ON o.organization_id = sp.organization_id
GROUP BY o.name
ORDER BY o.name;

DELETE FROM service_project
WHERE project_id IN (7, 8, 12, 13, 17, 18);

