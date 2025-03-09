// hooks/useTaskCompletion.ts
import { useState } from "react";
import axios from "axios";

export const useTaskCompletion = (onUpdate: (id: number) => void) => {
    const [loadingTaskId, setLoadingTaskId] = useState<number | null>(null);

    const completeTask = async (id: number) => {
        setLoadingTaskId(id);
        try {
            const response = await axios.post(`http://localhost:8080/api/tasks/${id}/complete`, {
                completed: true,
            });

            if (response.status === 204) {
                alert("Task successfully completed!");
                onUpdate(id);
            }
        } catch (error) {
            console.error("Error completing task:", error);
            alert("Failed to complete task.");
        } finally {
            setLoadingTaskId(null);
        }
    };

    return {
        completeTask,
        loadingTaskId,
    };
};
