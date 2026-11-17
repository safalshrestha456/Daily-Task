export const MOCK_PERSONAS = [
  {
    id: "usr_admin_01",
    name: "Sarah Connor",
    email: "sarah.admin@cyberdyne.io",
    password: "Password123!",
    role: "ADMIN",
    title: "Chief Information Security Officer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahAdmin&backgroundColor=b6e3f4",
    bio: "Full administrative access with permissions across cluster management, user provisioning, and database operations.",
    permissions: [
      "users:create",
      "users:read",
      "users:update",
      "users:delete",
      "deployments:trigger",
      "database:truncate",
      "billing:manage",
      "logs:audit"
    ],
    stats: {
      actionsToday: 48,
      deploymentsApproved: 14,
      securityScore: "99.4%"
    }
  },
  {
    id: "usr_dev_02",
    name: "Alex Rivera",
    email: "alex.dev@cyberdyne.io",
    password: "Password123!",
    role: "DEVELOPER",
    title: "Senior Full Stack Engineer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexDev&backgroundColor=c0aede",
    bio: "Core contributor working on React frontend architecture, GraphQL microservices, and Docker CI/CD pipelines.",
    permissions: [
      "users:read",
      "deployments:trigger",
      "code:commit",
      "api:generate_keys",
      "metrics:view"
    ],
    stats: {
      actionsToday: 112,
      pullRequestsMerged: 6,
      buildSuccessRate: "98.2%"
    }
  },
  {
    id: "usr_editor_03",
    name: "Maya Lin",
    email: "maya.editor@cyberdyne.io",
    password: "Password123!",
    role: "EDITOR",
    title: "Lead Technical Writer & Content Strategist",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MayaEditor&backgroundColor=ffd5dc",
    bio: "Maintains API reference documentation, technical knowledge base, and developer change logs.",
    permissions: [
      "users:read",
      "content:publish",
      "content:edit",
      "docs:manage",
      "feedback:respond"
    ],
    stats: {
      articlesPublished: 23,
      reviewsCompleted: 45,
      docCoverage: "94.0%"
    }
  }
];
