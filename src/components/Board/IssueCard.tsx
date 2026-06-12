import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Draggable } from '@hello-pangea/dnd';
import { JIssue, JUser } from '../../types';
import PriorityIcon from '../common/PriorityIcon';
import UserAvatar from '../common/UserAvatar';

interface IssueCardProps {
  issue: JIssue;
  users: JUser[];
  index: number;
  onOpenIssue: (issueId: string) => void;
  testId?: string;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, users, index, onOpenIssue, testId }) => {
  const assignees = users.filter((u) => issue.userIds.includes(u.id));

  return (
    <Draggable draggableId={issue.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            ...(snapshot.isDropAnimating ? { transitionDuration: '0.01s' } : {}),
          }}
          data-testid={testId || `issue-card-${issue.id}`}
          onClick={() => onOpenIssue(issue.id)}
          elevation={0}
          sx={{
            cursor: snapshot.isDragging ? 'grabbing' : 'grab',
            opacity: snapshot.isDragging ? 0.9 : 1,
            transition: snapshot.isDragging
              ? 'none'
              : 'background-color 120ms ease, box-shadow 120ms ease',
            '&:hover': {
              bgcolor: snapshot.isDragging ? '#F4F5F7' : '#EBECF0',
            },
            bgcolor: snapshot.isDragging ? '#F4F5F7' : '#fff',
            boxShadow: snapshot.isDragging
              ? 'rgba(9, 30, 66, 0.35) 0px 8px 16px -4px'
              : 'rgba(9, 30, 66, 0.25) 0px 1px 2px 0px',
            borderRadius: 1,
            willChange: 'transform',
          }}
        >
          <CardContent sx={{ p: '10px !important' }}>
            <Typography
              data-testid={`issue-title-${issue.id}`}
              variant="body2"
              fontWeight={400}
              sx={{ mb: 1.2, lineHeight: 1.4, color: '#172B4D', fontSize: 15 }}
            >
              {issue.title}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 0.2 }}>
                {assignees.map((user) => (
                  <Box key={user.id} sx={{ ml: -0.45 }}>
                    <UserAvatar
                      user={user}
                      size={24}
                      showTooltip
                      testId={`card-assignee-${user.id}`}
                    />
                  </Box>
                ))}
                <Typography
                  variant="caption"
                  sx={{
                    ml: assignees.length ? 1 : 0,
                    textTransform: 'uppercase',
                    color: '#6B778C',
                  }}
                >
                  {issue.type}-{issue.id}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="caption" sx={{ color: '#6B778C', textTransform: 'uppercase' }}>
                  {issue.type}
                </Typography>
                <PriorityIcon priority={issue.priority} size={18} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default IssueCard;
