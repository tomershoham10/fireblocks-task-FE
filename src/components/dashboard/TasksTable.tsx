import { Task } from "../../types/task";
import { MdTaskAlt } from "react-icons/md";
import { useTaskCompletion } from "../../hooks/useTaskCompletion";

interface TasksTableProps {
  tasks: Task[];
  onUpdate: (id: number) => void;
}

export const TasksTable: React.FC<TasksTableProps> = (props) => {
  const { tasks, onUpdate } = props;

  const { completeTask, loadingTaskId } = useTaskCompletion(onUpdate);

  console.log("table", tasks);

  return (
    <section className="max-h-[448px] w-full overflow-y-auto">
      <table className="min-w-full overflow-y-auto table-auto border-collapse bg-white rounded-md">
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className={`h-16 border-gray-300 flex items-center ${
                task.id > 0 && "border-t"
              }`}
            >
              <td className="px-4 py-2 flex basis-1/6 gap-2">
                <MdTaskAlt className="text-2xl text-[#0075F2]" />
                <span>{task.completed ? "Completed" : "Pending"}</span>
              </td>
              <td className="px-4 py-2 basis-2/3">{task.description}</td>
              <td className="basis-1/6 flex justify-center">
                {!task.completed && (
                  <button
                    className="bg-[#0075F2] cursor-pointer text-white px-4 py-2 rounded-md font-semibold"
                    onClick={() => completeTask(task.id)}
                    disabled={loadingTaskId === task.id}
                  >
                    {loadingTaskId === task.id ? (
                      <span className="animate-spin">Loading...</span>
                    ) : (
                      "Complete"
                    )}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
