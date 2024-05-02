import { Box, VStack, Input, Button, Heading, Text, IconButton, useColorModeValue, Flex } from '@chakra-ui/react';
import { FaTrash, FaCheck } from 'react-icons/fa';
import { useState } from 'react';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTasks = [...tasks, { id: Date.now(), text: input, isCompleted: false }];
      setTasks(newTasks);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };

  const handleCompleteTask = (id) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const bg = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box bg={bg} minH="100vh" p={5}>
      <VStack spacing={4}>
        <Heading mb={6}>Todo App</Heading>
        <Flex>
          <Input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <Button onClick={handleAddTask} ml={2}>Add</Button>
        </Flex>
        <VStack spacing={4} align="stretch">
          {tasks.map(task => (
            <Flex key={task.id} p={4} bg="white" borderRadius="lg" boxShadow="md" align="center" justify="space-between">
              <Text as={task.isCompleted ? 's' : ''}>{task.text}</Text>
              <Box>
                <IconButton icon={<FaCheck />} onClick={() => handleCompleteTask(task.id)} isRound="true" mr={2} aria-label="Complete task" />
                <IconButton icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} isRound="true" aria-label="Delete task" />
              </Box>
            </Flex>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Index;