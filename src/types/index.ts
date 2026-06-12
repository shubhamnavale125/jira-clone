// ────────────── Comment ──────────────
export interface JComment {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  issueId: string;
  userId: string;
}

// ────────────── User ──────────────
export interface JUser {
  id: string;
  name: string;
  avatarUrl: string;
  projectId?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ────────────── Issue ──────────────
export enum IssueType {
  STORY = 'Story',
  TASK = 'Task',
  BUG = 'Bug',
}

export enum IssueStatus {
  BACKLOG = 'Backlog',
  SELECTED = 'Selected',
  IN_PROGRESS = 'InProgress',
  DONE = 'Done',
}

export const IssueStatusDisplay: Record<IssueStatus, string> = {
  [IssueStatus.BACKLOG]: 'Backlog',
  [IssueStatus.SELECTED]: 'Selected for Development',
  [IssueStatus.IN_PROGRESS]: 'In Progress',
  [IssueStatus.DONE]: 'Done',
};

export enum IssuePriority {
  LOWEST = 'Lowest',
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  HIGHEST = 'Highest',
}

export const IssuePriorityColors: Record<IssuePriority, string> = {
  [IssuePriority.HIGHEST]: '#CD1317',
  [IssuePriority.HIGH]: '#E9494A',
  [IssuePriority.MEDIUM]: '#E97F33',
  [IssuePriority.LOW]: '#2D8738',
  [IssuePriority.LOWEST]: '#57A55A',
};

export interface JIssue {
  id: string;
  title: string;
  type: IssueType;
  status: IssueStatus;
  priority: IssuePriority;
  listPosition: number;
  description: string;
  estimate?: number;
  timeSpent?: number;
  timeRemaining?: number;
  createdAt: string;
  updatedAt: string;
  reporterId: string;
  userIds: string[];
  comments: JComment[];
  projectId?: string;
}

// ────────────── Project ──────────────
export enum ProjectCategory {
  SOFTWARE = 'Software',
  MARKETING = 'Marketing',
  BUSINESS = 'Business',
}

export interface JProject {
  id: string;
  name: string;
  url: string;
  description: string;
  category: ProjectCategory;
  createdAt: string;
  updatedAt: string;
  issues: JIssue[];
  users: JUser[];
}

// ────────────── Auth ──────────────
export interface AuthUser extends JUser {
  token?: string;
}

// ────────────── Filter ──────────────
export interface FilterState {
  searchTerm: string;
  userIds: string[];
  onlyMyIssue: boolean;
  ignoreResolved: boolean;
}

// ────────────── Nav Link ──────────────
export interface NavLink {
  label: string;
  icon: string;
  path?: string;
}
