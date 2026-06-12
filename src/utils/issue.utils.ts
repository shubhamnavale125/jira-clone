import { JIssue, IssueStatus, FilterState, JUser } from '../types';

export function getIssuesByStatus(issues: JIssue[], status: IssueStatus): JIssue[] {
  return [...issues]
    .filter((i) => i.status === status)
    .sort((a, b) => a.listPosition - b.listPosition);
}

export function applyFilters(
  issues: JIssue[],
  filters: FilterState,
  currentUserId: string | undefined,
): JIssue[] {
  let result = [...issues];

  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    result = result.filter((i) => i.title.toLowerCase().includes(term));
  }

  if (filters.userIds.length > 0) {
    result = result.filter((i) => i.userIds.some((uid) => filters.userIds.includes(uid)));
  }

  if (filters.onlyMyIssue && currentUserId) {
    result = result.filter((i) => i.userIds.includes(currentUserId));
  }

  if (filters.ignoreResolved) {
    result = result.filter((i) => i.status !== IssueStatus.DONE);
  }

  return result;
}

export function generateIssueId(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function getLastPositionInStatus(issues: JIssue[], status: IssueStatus): number {
  const statusIssues = getIssuesByStatus(issues, status);
  return statusIssues.length > 0 ? Math.max(...statusIssues.map((i) => i.listPosition)) + 1 : 1;
}

export function getUserById(users: JUser[], id: string): JUser | undefined {
  return users.find((u) => u.id === id);
}
