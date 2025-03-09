// import axios from "axios";
import { useEffect, useState } from "react";
import { Task } from "../types/task";
import { TasksTable } from "../components/dashboard/TasksTable";
import { FaRegPlusSquare } from "react-icons/fa";
import axios from "axios";

// const mockData = [
//     {
//       id: 0,
//       description: "This is a test task from Postman",
//       completed: false,
//     },
//     {
//       id: 1,
//       description: "This is a test task from Postman",
//       completed: true,
//     },
//     {
//       id: 2,
//       description: "This is a test task from Postman",
//       completed: false,
//     },
//     {
//       id: 3,
//       description: "This is a test task from Postman",
//       completed: true,
//     },
//     {
//       id: 4,
//       description: "This is a test task from Postman",
//       completed: false,
//     },
//     {
//       id: 5,
//       description: "This is a test task from Postman",
//       completed: true,
//     },
//     {
//       id: 6,
//       description: "This is a test task from Postman",
//       completed: false,
//     },
//     {
//       id: 7,
//       description: "This is a test task from Postman",
//       completed: true,
//     },
//     {
//       id: 8,
//       description: "This is a test task from Postman",
//       completed: false,
//     },
//     {
//       id: 9,
//       description: "This is a test task from Postman",
//       completed: true,
//     },
//   ];

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tasks/");
      if (response.data) {
        const fetchedTasks = response.data.tasks;
        setTasks(fetchedTasks);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  console.log("tasks", tasks);

  const updateTaskStatus = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  const handleAddTask = async () => {
    const description = prompt("Please enter a task description:");
    if (!description) {
      alert("Description is required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/tasks/", {
        description,
      });

      if (response.status === 204) {
        alert("Task added successfully!");
        fetchData();
      }
    } catch (error: unknown) {
      console.error("Error adding task:", error);
    }
  };
  return (
    <div className="p-6">
      <section className="w-full flex flex-col items-center">
        <TasksTable tasks={tasks} onUpdate={updateTaskStatus} />
        <button
          className="mt-4 text-3xl cursor-pointer text-black"
          onClick={handleAddTask}
        >
          <FaRegPlusSquare />
        </button>
      </section>
    </div>
  );
};

export default Dashboard;
