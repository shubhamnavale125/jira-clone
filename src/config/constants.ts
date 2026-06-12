import {
  IssueType,
  IssuePriority,
  IssuePriorityColors,
  IssueStatus,
  IssueStatusDisplay,
} from '../types';

export { IssueStatus, IssueStatusDisplay };

export const ISSUE_TYPES = [
  { value: IssueType.STORY, label: 'Story', color: '#65BA43' },
  { value: IssueType.TASK, label: 'Task', color: '#4BADE8' },
  { value: IssueType.BUG, label: 'Bug', color: '#E44D42' },
];

export const ISSUE_PRIORITIES = [
  {
    value: IssuePriority.HIGHEST,
    label: 'Highest',
    color: IssuePriorityColors[IssuePriority.HIGHEST],
  },
  { value: IssuePriority.HIGH, label: 'High', color: IssuePriorityColors[IssuePriority.HIGH] },
  {
    value: IssuePriority.MEDIUM,
    label: 'Medium',
    color: IssuePriorityColors[IssuePriority.MEDIUM],
  },
  { value: IssuePriority.LOW, label: 'Low', color: IssuePriorityColors[IssuePriority.LOW] },
  {
    value: IssuePriority.LOWEST,
    label: 'Lowest',
    color: IssuePriorityColors[IssuePriority.LOWEST],
  },
];

export const BOARD_COLUMNS = [
  { status: IssueStatus.BACKLOG, label: 'Backlog' },
  { status: IssueStatus.SELECTED, label: 'Selected for Development' },
  { status: IssueStatus.IN_PROGRESS, label: 'In Progress' },
  { status: IssueStatus.DONE, label: 'Done' },
];

export const PROJECT_CATEGORIES = ['Software', 'Marketing', 'Business'];
