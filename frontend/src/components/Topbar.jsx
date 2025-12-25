import { Box, Container, HStack, Text, Avatar, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <Box
      bg="#07112a"
      color="white"
      py={4}
      borderBottom="1px solid rgba(255,255,255,0.04)"
    >
      <Container maxW="1200px" px={4}>
        <HStack spacing={6} align="center">
          <Text fontSize="2xl" fontWeight="bold">
            <Link to="/dashboard">Finly</Link>
          </Text>

          <HStack spacing={6} flex={1} justify="center">
            <Text as="span">
              <Link to="/dashboard">Dashboard</Link>
            </Text>
            <Text as="span">
              <Link to="/tables">Tables</Link>
            </Text>
            <Text as="span">
              <Link to="/spending">Spendings</Link>
            </Text>
            <Text as="span">
              <Link to="/subscriptions">Subscriptions</Link>
            </Text>
          </HStack>

          <HStack spacing={3}>
            <Text>Hi, Azamat</Text>
            <Avatar size="sm" />
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Topbar;
