import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Spacer,
  useColorModeValue,
  Avatar,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const StatCard = ({ title, amount, subtitle }) => {
  const bg = useColorModeValue("white", "#0b2236");
  const innerBg = useColorModeValue("#e6f0ff", "#0b486b");
  return (
    <Box
      bg={innerBg}
      p={6}
      rounded="lg"
      minW="220px"
      color="white"
      boxShadow="sm"
    >
      <Text fontSize="lg" mb={2}>
        {title}
      </Text>
      <Heading size="lg" mb={2}>
        {amount}
      </Heading>
      <Text fontSize="sm" opacity={0.8}>
        {subtitle}
      </Text>
    </Box>
  );
};

const ScheduleItem = ({ title, note, amount }) => {
  return (
    <HStack justify="space-between" w="full" align="center">
      <HStack align="center">
        <Box w="44px" h="44px" bg="#083550" rounded="md" />
        <VStack align="start" spacing={0}>
          <Text fontWeight="semibold">{title}</Text>
          <Text fontSize="sm" opacity={0.7}>
            {note}
          </Text>
        </VStack>
      </HStack>
      <Text fontWeight="bold">{amount}</Text>
    </HStack>
  );
};

const TablesCard = ({ tables = [] }) => {
  const innerBg = useColorModeValue("#e6f0ff", "#0b486b");
  const pillBg = useColorModeValue("#083550", "#083550");

  const formatCost = (v) => {
    if (v >= 1e12) return (v / 1e12).toFixed(3) + "T";
    if (v >= 1e9) return (v / 1e9).toFixed(3) + "B";
    if (v >= 1e6) return (v / 1e6).toFixed(3) + "M";
    return v.toLocaleString();
  };

  // group rows by label/title and sum cost (also supports rows that use `amount`)
  const tableTotal = (table) => {
    const groups = (table.rows || []).reduce((acc, row) => {
      const key = row.label || row.title || "Unknown";
      const value = Number(row.cost ?? row.amount ?? 0);
      acc[key] = (acc[key] || 0) + value;
      return acc;
    }, {});
    // sum of grouped values
    return Object.values(groups).reduce((s, v) => s + v, 0);
  };

  return (
    <Box bg={innerBg} p={6} rounded="lg" color="white">
      <Text fontSize="lg" mb={4}>
        Tables
      </Text>
      <VStack spacing={4} align="stretch">
        {tables.map((t) => {
          const total = tableTotal(t);
          return (
            <HStack
              key={t._id || t.name}
              justify="space-between"
              p={4}
              bg={pillBg}
              rounded="20px"
              minH="48px"
            >
              <Text>{t.name}</Text>
              <Text fontWeight="bold">{formatCost(total)}</Text>
            </HStack>
          );
        })}
      </VStack>
    </Box>
  );
};

const Dashboard = () => {
  // make the page background a single blueish color
  const pageBg = "#07112a";
  const panelBg = useColorModeValue("white", "#07112a");
  const headingColor = useColorModeValue("gray.800", "whiteAlpha.900");

  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await fetch("/api/tables");
        const data = await res.json();
        if (data && data.data) setTables(data.data);
      } catch (err) {
        // keep silent on error, fallback to empty
        console.error("Failed to fetch tables", err);
      }
    };
    fetchTables();
  }, []);

  return (
    <>
      <Box minH="100vh" bg={pageBg} py={6}>
        <Container maxW="1200px">
          <Grid templateColumns={{ base: "1fr", md: "2fr 360px" }} gap={8}>
            {/* Left content */}
            <GridItem>
              <Box bg={panelBg} p={6} rounded="lg" minH="60vh" color="white">
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
                  <StatCard
                    title="Income"
                    amount="1.200T"
                    subtitle="This month's income"
                  />
                  <StatCard
                    title="Expense"
                    amount="800T"
                    subtitle="This month's spendings"
                  />
                </SimpleGrid>

                {/* TablesCard now fetches real table data and computes totals */}
                <TablesCard tables={tables} />

                {/* large empty area (matching design) */}
                <Box h="8vh" />
              </Box>
            </GridItem>

            {/* Right schedule */}
            <GridItem>
              <Box
                bg={panelBg}
                p={6}
                rounded="lg"
                minH="60vh"
                color="white"
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
              >
                <Heading size="md" mb={6} color={headingColor}>
                  Schedule payments
                </Heading>

                <VStack spacing={6} align="stretch">
                  <ScheduleItem
                    title="Rent"
                    note="10 days - Pending"
                    amount="100T"
                  />
                  <ScheduleItem
                    title="Bills"
                    note="10 days - Pending"
                    amount="100T"
                  />
                </VStack>

                <Box mt="auto" />
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
