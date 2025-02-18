import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { generateIdea } from '../services/openai';

function IdeaGenerator() {
  const [interests, setInterests] = useState('');
  const [skills, setSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await generateIdea(interests, skills);
      setResult(response);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate idea. Please try again.',
        status: 'error',
        duration: 5000,
      });
    }

    setLoading(false);
  };

  return (
    <VStack spacing={6} width="100%">
      <FormControl>
        <FormLabel>What are your interests?</FormLabel>
        <Input
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="e.g., AI, healthcare, education"
        />
      </FormControl>

      <FormControl>
        <FormLabel>What technologies/skills are you comfortable with?</FormLabel>
        <Input
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="e.g., React, Python, Machine Learning"
        />
      </FormControl>

      <Button
        colorScheme="blue"
        onClick={handleSubmit}
        isLoading={loading}
        width="100%"
      >
        Generate Idea
      </Button>

      {result && (
        <Box
          borderWidth={1}
          borderRadius="lg"
          p={6}
          width="100%"
          backgroundColor="gray.50"
        >
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold">Project Idea:</Text>
            <Text>{result.idea}</Text>
            <Text fontWeight="bold">Implementation Steps:</Text>
            <Text whiteSpace="pre-wrap">{result.steps}</Text>
          </VStack>
        </Box>
      )}
    </VStack>
  );
}

export default IdeaGenerator; 