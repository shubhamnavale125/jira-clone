import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { reorderIssues } from '../../store/slices/projectSlice';
import { IssueStatus } from '../../types';
import { BOARD_COLUMNS } from '../../config/constants';
import { getIssuesByStatus } from '../../utils/issue.utils';
import BoardDndList from './BoardDndList';
import IssueModal from '../Issue/IssueModal';

const BoardDnd: React.FC = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector((s) => s.project);
  const [activeIssueId, setActiveIssueId] = useState<string | null>(null);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    dispatch(
      reorderIssues({
        issueId: draggableId,
        newStatus: destination.droppableId as IssueStatus,
        newPosition: destination.index + 1,
        oldStatus: source.droppableId as IssueStatus,
      }),
    );
  };

  if (!project) return null;

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box
          data-testid="board-dnd"
          sx={{
            display: 'flex',
            gap: 0,
            overflowX: 'auto',
            pb: 2,
            alignItems: 'flex-start',
            '&::-webkit-scrollbar': { height: 6 },
            '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
            '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(0,0,0,0.2)', borderRadius: 3 },
          }}
        >
          {BOARD_COLUMNS.map((col) => (
            <BoardDndList
              key={col.status}
              status={col.status}
              label={col.label}
              issues={getIssuesByStatus(project.issues, col.status)}
              users={project.users}
              onOpenIssue={setActiveIssueId}
            />
          ))}
        </Box>
      </DragDropContext>

      {activeIssueId && (
        <IssueModal
          open={Boolean(activeIssueId)}
          issueId={activeIssueId}
          onClose={() => setActiveIssueId(null)}
        />
      )}
    </>
  );
};

export default BoardDnd;
