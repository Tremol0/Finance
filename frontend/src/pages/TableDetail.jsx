import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  HStack,
  VStack,
  Heading,
  Text,
  Flex,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useParams, useNavigate } from "react-router-dom";

const TableDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [table, setTable] = useState(null);
  const [form, setForm] = useState({ label: "", amount: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  const panelBg = useColorModeValue("#07112a", "#07112a");
  const panelInnerBg = useColorModeValue("#061029", "#061029");
  const borderColor = useColorModeValue("#0B4668", "#0B4668");
  const textColor = useColorModeValue("whiteAlpha.900", "whiteAlpha.900");

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const res = await fetch("/api/tables");
        const data = await res.json();
        const found = (data.data || []).find((t) => t._id === id);
        if (!found) {
          navigate("/tables");
          return;
        }
        setTable(found);
      } catch (err) {
        console.error("Failed to fetch table", err);
      }
    };
    fetchTable();
  }, [id, navigate]);

  const saveRows = async (newRows) => {
    try {
      const res = await fetch(`/api/tables/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows: newRows }),
      });
      const data = await res.json();
      if (data && data.data) setTable(data.data);
    } catch (err) {
      console.error("Failed to save rows", err);
    }
  };

  const clearForm = () => setForm({ label: "", amount: "" });

  const onSubmit = async () => {
    if (!form.label || form.amount === "") return;
    const nextRows = [...(table.rows || [])];
    if (editingIndex !== null) {
      nextRows[editingIndex] = {
        label: form.label,
        cost: Number(form.amount),
      };
      setEditingIndex(null);
    } else {
      nextRows.push({ label: form.label, cost: Number(form.amount) });
    }
    await saveRows(nextRows);
    clearForm();
  };

  const startEdit = (idx) => {
    const r = table.rows[idx];
    setEditingIndex(idx);
    setForm({
      label: r.label || r.title || "",
      amount: r.cost ?? r.amount ?? "",
    });
  };

  const removeRow = async (idx) => {
    const next = (table.rows || []).filter((_, i) => i !== idx);
    await saveRows(next);
  };

  if (!table) {
    return (
      <Box minH="60vh" bg="#07112a" color="white" py={12}>
        <Container maxW="1200px">
          <Text>Loading...</Text>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="#07112a" py={8}>
      <Container maxW="1200px">
        <Box
          bg={panelBg}
          p={{ base: 6, md: 10 }}
          rounded="md"
          boxShadow="lg"
          color={textColor}
          minH="72vh"
        >
          <Flex align="center" mb={8}>
            <Button
              aria-label="Back"
              bg={borderColor}
              color="white"
              w="10"
              h="10"
              p={0}
              mr={6}
              onClick={() => navigate("/tables")}
            >
              ←
            </Button>

            <Spacer />

            <Heading size="lg" textAlign="center" mx="auto">
              {table.name}
            </Heading>

            <Spacer />
          </Flex>

          <Box
            bg={panelInnerBg}
            p={6}
            rounded="md"
            borderTop="2px solid"
            borderTopColor={borderColor}
          >
            <VStack spacing={6} align="stretch">
              <Box
                bg="transparent"
                p={4}
                rounded="md"
                borderBottom="1px solid"
                borderBottomColor={borderColor}
              >
                <VStack spacing={3} align="stretch">
                  <FormControl>
                    <FormLabel color={textColor}>Title</FormLabel>
                    <Input
                      value={form.label}
                      onChange={(e) =>
                        setForm({ ...form, label: e.target.value })
                      }
                      placeholder="e.g. Kevin"
                      bg="transparent"
                      color={textColor}
                      borderColor={borderColor}
                      _placeholder={{ color: "whiteAlpha.600" }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel color={textColor}>Amount</FormLabel>
                    <NumberInput min={0}>
                      <NumberInputField
                        value={form.amount}
                        onChange={(e) =>
                          setForm({ ...form, amount: e.target.value })
                        }
                        placeholder="0.00"
                        bg="transparent"
                        color={textColor}
                        borderColor={borderColor}
                        _placeholder={{ color: "whiteAlpha.600" }}
                      />
                    </NumberInput>
                  </FormControl>

                  <HStack>
                    <Button colorScheme="blue" onClick={onSubmit}>
                      {editingIndex !== null ? "Save" : "Add"}
                    </Button>
                    <Button
                      onClick={() => {
                        clearForm();
                        setEditingIndex(null);
                      }}
                    >
                      Clear
                    </Button>
                  </HStack>
                </VStack>
              </Box>

              <Box>
                {(table.rows || []).length === 0 ? (
                  <Text textAlign="center" color="whiteAlpha.700" py={10}>
                    No rows yet
                  </Text>
                ) : (
                  <Table variant="simple" size="md" color={textColor}>
                    <Thead>
                      <Tr>
                        <Th borderBottom="2px solid" borderColor={borderColor}>
                          Name
                        </Th>
                        <Th
                          isNumeric
                          borderBottom="2px solid"
                          borderColor={borderColor}
                        >
                          Amount
                        </Th>
                        <Th borderBottom="2px solid" borderColor={borderColor}>
                          Actions
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {table.rows.map((r, idx) => (
                        <Tr
                          key={idx}
                          borderBottom="1px solid"
                          borderColor={borderColor}
                        >
                          <Td py={6}>{r.label || r.title}</Td>
                          <Td isNumeric py={6}>
                            {r.cost ?? r.amount ?? 0}
                          </Td>
                          <Td py={6}>
                            <HStack spacing={3}>
                              <IconButton
                                icon={<EditIcon />}
                                aria-label="edit"
                                size="sm"
                                onClick={() => startEdit(idx)}
                              />
                              <IconButton
                                icon={<DeleteIcon />}
                                aria-label="delete"
                                size="sm"
                                colorScheme="red"
                                onClick={() => removeRow(idx)}
                              />
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                )}
              </Box>
            </VStack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TableDetail;
