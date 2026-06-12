import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Droppable } from '@hello-pangea/dnd';
import { JIssue, JUser, IssueStatus } from '../../types';
import IssueCard from './IssueCard';
import { applyFilters } from '../../utils/issue.utils';
import { useAppSelector } from '../../store/hooks';

interface BoardDndListProps {
  status: IssueStatus;
  label: string;
  issues: JIssue[];
  users: JUser[];
  onOpenIssue: (issueId: string) => void;
  testId?: string;
}

const BoardDndList: React.FC<BoardDndListProps> = ({
  status,
  label,
  issues,
  users,
  onOpenIssue,
  testId,
}) => {
  const filter = useAppSelector((s) => s.filter);
  const auth = useAppSelector((s) => s.auth);

  const filteredIssues = applyFilters(issues, filter, auth?.id);

  return (
    <Paper
      data-testid={testId || `board-column-${status.toLowerCase()}`}
      elevation={0}
      sx={{
        bgcolor: '#F4F5F7',
        borderRadius: 1,
        minWidth: 200,
        width: { xs: 260, md: 'calc(25% - 8px)' },
        display: 'flex',
        flexDirection: 'column',
        pb: 2,
        mr: 1,
        flexShrink: 0,
      }}
    >
      {/* Column Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 1.5,
          pt: 1.5,
          pb: 1,
        }}
      >
        <Typography
          data-testid={`column-title-${status.toLowerCase()}`}
          variant="caption"
          fontWeight={600}
          sx={{ textTransform: 'uppercase', color: '#6B778C' }}
        >
          {label}
        </Typography>
        <Typography
          data-testid={`column-count-${status.toLowerCase()}`}
          variant="caption"
          sx={{ ml: 0.6, color: '#6B778C', textTransform: 'lowercase' }}
        >
          {filteredIssues.length}
        </Typography>
      </Box>

      {/* Droppable Area */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            data-testid={`droppable-${status.toLowerCase()}`}
            sx={{
              flex: 1,
              minHeight: 400,
              bgcolor: snapshot.isDraggingOver ? 'rgba(9, 30, 66, 0.04)' : 'transparent',
              borderRadius: 0,
              pl: 1,
              pr: 0.9,
              pb: 0.5,
              display: 'flex',
              flexDirection: 'column',
              gap: 0.7,
            }}
          >
            {filteredIssues.map((issue, index) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                users={users}
                index={index}
                onOpenIssue={onOpenIssue}
              />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Paper>
  );
};

export default BoardDndList;
