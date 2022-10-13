import React from 'react';
import TaskItem from './TaskItem';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Task } from '../../types/Task';
import { useTask } from '../../hooks/useTask';

// Todo: Integrate into one component new, inprogress, done

const NewTaskBlock = ({ storyId }: { storyId: string }): JSX.Element => {
  const { getTasks } = useTask(storyId, 'new');

  if (getTasks.loading) {
    return <div className="">読み込み中</div>;
  }

  if (getTasks.error) {
    return <div className="">エラー発生</div>;
  }
  return (
    <Droppable droppableId="new">
      {(provided) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-wrap w-3/12 pt-10 pl-10"
          >
            {getTasks.data.getTasks.map((task: Task, index: number) => {
              return (
                <Draggable
                  key={`key:${task.id}`}
                  draggableId={task.id}
                  index={index}
                >
                  {(provided) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskItem
                          name={task.name}
                          storyId={storyId}
                          status="new"
                          id={task.id}
                        />
                      </div>
                    );
                  }}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default NewTaskBlock;
