import { useEffect, useState } from "react";
import {
  Box,
  Container,
  HStack,
  VStack,
  Text,
  Button,
  Heading,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const TablesPage = () => {
  const [tables, setTables] = useState([]);
  const navigate = useNavigate();
  const pillBg = useColorModeValue("#0B486B", "#0B486B");
  const textColor = useColorModeValue("white", "white");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [colsText, setColsText] = useState(""); // comma separated columns
  const toast = useToast();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await fetch("/api/tables");
        const data = await res.json();
        if (data && data.data) setTables(data.data);
      } catch (err) {
        console.error("Failed to fetch tables", err);
      }
    };
    fetchTables();
  }, []);

  const refresh = async () => {
    try {
      const res = await fetch("/api/tables");
      const data = await res.json();
      if (data && data.data) setTables(data.data);
    } catch (err) {
      console.error("Failed to refresh tables", err);
    }
  };

  const create = async () => {
    const cols = colsText
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
    if (!name.trim() || cols.length === 0) {
      toast({
        title: "Validation",
        description: "Table name and at least one column are required.",
        status: "error",
        isClosable: true,
      });
      return;
    }

    try {
      const res = await fetch("/api/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), columns: cols }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Failed to create table");
      }
      // refresh list and close modal
      await refresh();
      onClose();
      setName("");
      setColsText("");
      toast({
        title: "Table created",
        status: "success",
        isClosable: true,
      });
    } catch (err) {
      console.error("create table failed", err);
      toast({ title: "Error", description: err.message, status: "error" });
    }
  };

  return (
    <Box minH="100vh" bg="#07112a" py={8}>
      <Container maxW="1200px">
        <VStack align="stretch" spacing={8}>
          <HStack>
            <Button
              bg="#13345a"
              color="white"
              w="10"
              h="10"
              p={0}
              onClick={onOpen}
            >
              +
            </Button>
          </HStack>

          <Heading textAlign="center" color={textColor}>
            Tables
          </Heading>

          <HStack spacing={8} wrap="wrap" justify="space-between">
            {tables.map((t) => (
              <Box key={t._id} w={{ base: "100%", md: "30%" }}>
                <Button
                  onClick={() => navigate(`/tables/${t._id}`)}
                  w="full"
                  h="60px"
                  bg={pillBg}
                  color="white"
                  borderRadius="16px"
                >
                  {t.name}
                </Button>
              </Box>
            ))}
          </HStack>
        </VStack>
      </Container>

      {/* Create table modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Table</ModalHeader>
          <ModalBody>
            <VStack align="stretch" spacing={4}>
              <FormControl>
                <FormLabel>Table name</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Employees"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Columns (comma separated)</FormLabel>
                <Input
                  value={colsText}
                  onChange={(e) => setColsText(e.target.value)}
                  placeholder="Name, Phone, Position, Salary"
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={create}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TablesPage;
