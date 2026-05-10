import React from 'react';
import TaskForm from './TaskForm';
import RecommendationCard from './RecommendationCard';
import TaskQueue from './TaskQueue';

const TaskAllocationPanel = () => {
  return (
    <div className="w-full flex flex-col gap-4 animate-fade-in pb-4">
      <div className="flex items-center gap-3 px-1 mt-2">
        <div className="w-1.5 h-5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
        <h2 className="text-sm font-bold text-white tracking-wide uppercase drop-shadow-md">Dispatcher Task Allocation</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[350px]">
        <div className="lg:col-span-5 h-full">
          <TaskForm />
        </div>
        <div className="lg:col-span-3 h-full">
          <RecommendationCard />
        </div>
        <div className="lg:col-span-4 h-full">
          <TaskQueue />
        </div>
      </div>
    </div>
  );
};
export default TaskAllocationPanel;
