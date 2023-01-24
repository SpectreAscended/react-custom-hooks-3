import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/useHttp';

const NewTask = props => {
  const httpData = useHttp();

  const { isLoading, error, sendRequest: sendTask } = httpData;

  const enterTaskHandler = taskText => {
    const addTask = data => {
      const createdTask = {
        id: data.name,
        text: taskText,
      };
      props.onAddTask(createdTask);
    };

    sendTask(
      {
        url: 'https://react-http-41004-default-rtdb.firebaseio.com/tasks.json',
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ text: taskText }),
      },

      addTask
    );
  };

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const enterTaskHandler = async taskText => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(
  //       'https://react-http-41004-default-rtdb.firebaseio.com/tasks.json',
  //       {
  //         method: 'POST',
  //         body: JSON.stringify({ text: taskText }),
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error('Request failed!');
  //     }

  //     const data = await response.json();

  //     const generatedId = data.name; // firebase-specific => "name" contains generated id
  //     const createdTask = { id: generatedId, text: taskText };

  //     props.onAddTask(createdTask);
  //   } catch (err) {
  //     setError(err.message || 'Something went wrong!');
  //   }
  //   setIsLoading(false);
  // };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
