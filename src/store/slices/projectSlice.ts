import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JProject, JIssue, JComment } from '../../types';
import { localStorageService } from '../../services/localStorage.service';
import projectData from '../../data/project.json';

type ProjectState = JProject | null;

const initialState: ProjectState = (() => {
  const stored = localStorageService.getProject();
  if (stored) return stored;
  const project = projectData as unknown as JProject;
  localStorageService.setProject(project);
  return project;
})();

const projectSlice = createSlice({
  name: 'project',
  initialState: initialState as ProjectState,
  reducers: {
    setProject(_state, action: PayloadAction<JProject>) {
      localStorageService.setProject(action.payload);
      return action.payload;
    },

    updateProject(state, action: PayloadAction<Partial<JProject>>) {
      if (!state) return;
      const updated = { ...state, ...action.payload, updatedAt: new Date().toISOString() };
      localStorageService.setProject(updated);
      return updated;
    },

    createIssue(state, action: PayloadAction<JIssue>) {
      if (!state) return;
      state.issues.push(action.payload);
      localStorageService.setProject(state);
    },

    updateIssue(state, action: PayloadAction<{ id: string; changes: Partial<JIssue> }>) {
      if (!state) return;
      const idx = state.issues.findIndex((i) => i.id === action.payload.id);
      if (idx >= 0) {
        state.issues[idx] = {
          ...state.issues[idx],
          ...action.payload.changes,
          updatedAt: new Date().toISOString(),
        };
        localStorageService.setProject(state);
      }
    },

    deleteIssue(state, action: PayloadAction<string>) {
      if (!state) return;
      state.issues = state.issues.filter((i) => i.id !== action.payload);
      localStorageService.setProject(state);
    },

    addComment(state, action: PayloadAction<{ issueId: string; comment: JComment }>) {
      if (!state) return;
      const issue = state.issues.find((i) => i.id === action.payload.issueId);
      if (issue) {
        if (!issue.comments) issue.comments = [];
        issue.comments.push(action.payload.comment);
        issue.updatedAt = new Date().toISOString();
        localStorageService.setProject(state);
      }
    },

    updateComment(
      state,
      action: PayloadAction<{ issueId: string; commentId: string; body: string }>,
    ) {
      if (!state) return;
      const issue = state.issues.find((i) => i.id === action.payload.issueId);
      if (issue?.comments) {
        const comment = issue.comments.find((c) => c.id === action.payload.commentId);
        if (comment) {
          comment.body = action.payload.body;
          comment.updatedAt = new Date().toISOString();
          localStorageService.setProject(state);
        }
      }
    },

    deleteComment(state, action: PayloadAction<{ issueId: string; commentId: string }>) {
      if (!state) return;
      const issue = state.issues.find((i) => i.id === action.payload.issueId);
      if (issue?.comments) {
        issue.comments = issue.comments.filter((c) => c.id !== action.payload.commentId);
        localStorageService.setProject(state);
      }
    },

    reorderIssues(
      state,
      action: PayloadAction<{
        issueId: string;
        newStatus: string;
        newPosition: number;
        oldStatus: string;
      }>,
    ) {
      if (!state) return;
      const { issueId, newStatus, newPosition, oldStatus } = action.payload;
      const issue = state.issues.find((i) => i.id === issueId);
      if (!issue) return;

      const targetIndex = Math.max(0, newPosition - 1);

      if (oldStatus === newStatus) {
        const columnIssues = state.issues
          .filter((i) => i.status === oldStatus)
          .sort((a, b) => a.listPosition - b.listPosition);

        const currentIndex = columnIssues.findIndex((i) => i.id === issueId);
        if (currentIndex < 0) return;

        const [movedIssue] = columnIssues.splice(currentIndex, 1);
        const insertAt = Math.min(targetIndex, columnIssues.length);
        columnIssues.splice(insertAt, 0, movedIssue);

        columnIssues.forEach((i, idx) => {
          i.listPosition = idx + 1;
        });

        movedIssue.updatedAt = new Date().toISOString();
      } else {
        const sourceIssues = state.issues
          .filter((i) => i.status === oldStatus && i.id !== issueId)
          .sort((a, b) => a.listPosition - b.listPosition);

        const destinationIssues = state.issues
          .filter((i) => i.status === newStatus && i.id !== issueId)
          .sort((a, b) => a.listPosition - b.listPosition);

        const insertAt = Math.min(targetIndex, destinationIssues.length);
        destinationIssues.splice(insertAt, 0, issue);

        sourceIssues.forEach((i, idx) => {
          i.listPosition = idx + 1;
        });

        destinationIssues.forEach((i, idx) => {
          i.listPosition = idx + 1;
        });

        issue.status = newStatus as JIssue['status'];
        issue.updatedAt = new Date().toISOString();
      }

      localStorageService.setProject(state);
    },
  },
});

export const {
  setProject,
  updateProject,
  createIssue,
  updateIssue,
  deleteIssue,
  addComment,
  updateComment,
  deleteComment,
  reorderIssues,
} = projectSlice.actions;

export default projectSlice.reducer;
