import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Stack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import SpendingChart from "../components/SpendingChart";

// sample data (replace with real API data if available)
const sample = [
  { month: "Jan", value: 500 },
  { month: "Feb", value: 1200 },
  { month: "Mar", value: 2000 },
  { month: "Apr", value: 900 },
];

const SpendingPage = () => {
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Container maxW="420px" py={6}>
      <VStack spacing={8} align="stretch">
        <Box
          bg={useColorModeValue("#07112a", "gray.700")}
          p={6}
          rounded="lg"
          color="white"
        >
          <Heading size="lg" textAlign="center" mb={4}>
            Spending
          </Heading>
          <SpendingChart data={sample} width={360} height={220} />
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            Tables
          </Heading>

          <Box bg={useColorModeValue("#0B486B", "gray.700")} p={6} rounded="lg">
            <VStack spacing={4}>
              <HStack
                justify="space-between"
                w="full"
                p={4}
                bg={cardBg}
                rounded="lg"
              >
                <Text fontWeight="semibold">Employees</Text>
                <Text fontWeight="bold">1000</Text>
              </HStack>

              <HStack
                justify="space-between"
                w="full"
                p={4}
                bg={cardBg}
                rounded="lg"
              >
                <Text fontWeight="semibold">Rent</Text>
                <Text fontWeight="bold">500</Text>
              </HStack>

              <HStack
                justify="space-between"
                w="full"
                p={4}
                bg={cardBg}
                rounded="lg"
              >
                <Text fontWeight="semibold">Other</Text>
                <Text fontWeight="bold">250</Text>
              </HStack>
            </VStack>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default SpendingPage;
