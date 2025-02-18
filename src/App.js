import React from 'react';
import { ChakraProvider, Container, Heading, VStack } from '@chakra-ui/react';
import IdeaGenerator from './components/IdeaGenerator';

function App() {
  return (
    <ChakraProvider>
      <Container maxW="container.lg" py={8}>
        <VStack spacing={8}>
          <Heading>Hackathon Idea Generator</Heading>
          <IdeaGenerator />
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default App; 