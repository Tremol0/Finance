import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
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
import { useState } from "react";
import { useSpendingStore } from "../store/spending";

const SpendingsTable = () => {
  const { spendings, addSpending, updateSpending, removeSpending } =
    useSpendingStore();
  const [form, setForm] = useState({
    title: "",
    category: "Other",
    amount: "",
    date: "",
  });
  const [editingId, setEditingId] = useState(null);

  const clearForm = () =>
    setForm({ title: "", category: "Other", amount: "", date: "" });

  const onSubmit = () => {
    if (!form.title || !form.amount) return;
    if (editingId) {
      updateSpending(editingId, { ...form, amount: Number(form.amount) });
      setEditingId(null);
    } else {
      addSpending({ ...form, amount: Number(form.amount) });
    }
    clearForm();
  };

  const startEdit = (s) => {
    setEditingId(s.id);
    setForm({
      title: s.title,
      category: s.category,
      amount: s.amount,
      date: s.date || "",
    });
  };

  const panelBg = useColorModeValue("#07112a", "#07112a");
  const panelInnerBg = useColorModeValue("#061029", "#061029");
  const borderColor = useColorModeValue("#0B4668", "#0B4668");
  const textColor = useColorModeValue("whiteAlpha.900", "whiteAlpha.900");

  return (
    <>
      {/* Topbar is provided by App.jsx; removed here to prevent duplicates */}
      <Box minH="100vh" bg="#07112a" py={8}>
        <Container maxW="1200px" py={0}>
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
                aria-label="Add"
                bg={borderColor}
                color="white"
                w="10"
                h="10"
                p={0}
                _hover={{ bg: "#174b78" }}
                mr={6}
              >
                +
              </Button>

              <Spacer />

              <Heading size="lg" textAlign="center" mx="auto">
                Employees
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
                {/* Form */}
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
                        value={form.title}
                        onChange={(e) =>
                          setForm({ ...form, title: e.target.value })
                        }
                        placeholder="e.g. Employees"
                        bg="transparent"
                        color={textColor}
                        borderColor={borderColor}
                        _placeholder={{ color: "whiteAlpha.600" }}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel color={textColor}>Category</FormLabel>
                      <Select
                        value={form.category}
                        onChange={(e) =>
                          setForm({ ...form, category: e.target.value })
                        }
                        bg="transparent"
                        color={textColor}
                        borderColor={borderColor}
                      >
                        <option>Employees</option>
                        <option>Rent</option>
                        <option>Products</option>
                        <option>Other</option>
                      </Select>
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

                    <FormControl>
                      <FormLabel color={textColor}>Date</FormLabel>
                      <Input
                        type="date"
                        value={form.date}
                        onChange={(e) =>
                          setForm({ ...form, date: e.target.value })
                        }
                        bg="transparent"
                        color={textColor}
                        borderColor={borderColor}
                      />
                    </FormControl>

                    <HStack>
                      <Button colorScheme="blue" onClick={onSubmit}>
                        {editingId ? "Save" : "Add"}
                      </Button>
                      <Button
                        onClick={() => {
                          clearForm();
                          setEditingId(null);
                        }}
                      >
                        Clear
                      </Button>
                    </HStack>
                  </VStack>
                </Box>

                {/* Table */}
                <Box>
                  {spendings.length === 0 ? (
                    <Text textAlign="center" color="whiteAlpha.700" py={10}>
                      No spendings yet
                    </Text>
                  ) : (
                    <Table variant="simple" size="md" color={textColor}>
                      <Thead>
                        <Tr>
                          <Th
                            borderBottom="2px solid"
                            borderColor={borderColor}
                          >
                            Name
                          </Th>
                          <Th
                            borderBottom="2px solid"
                            borderColor={borderColor}
                          >
                            Phone
                          </Th>
                          <Th
                            borderBottom="2px solid"
                            borderColor={borderColor}
                          >
                            Position
                          </Th>
                          <Th
                            isNumeric
                            borderBottom="2px solid"
                            borderColor={borderColor}
                          >
                            Salary
                          </Th>
                          <Th
                            borderBottom="2px solid"
                            borderColor={borderColor}
                          >
                            Actions
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {spendings.map((s) => (
                          <Tr
                            key={s.id}
                            borderBottom="1px solid"
                            borderColor={borderColor}
                            py={6}
                          >
                            <Td py={6}>{s.title}</Td>
                            <Td py={6}>+111 123 543 234</Td>
                            <Td py={6}>Specialist</Td>
                            <Td isNumeric py={6}>
                              {s.amount}
                            </Td>
                            <Td py={6}>
                              <HStack spacing={3}>
                                {editingId === s.id ? (
                                  <>
                                    <IconButton
                                      icon={<CheckIcon />}
                                      aria-label="save"
                                      size="sm"
                                      colorScheme="green"
                                      onClick={onSubmit}
                                    />
                                    <IconButton
                                      icon={<CloseIcon />}
                                      aria-label="cancel"
                                      size="sm"
                                      onClick={() => {
                                        setEditingId(null);
                                        clearForm();
                                      }}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <IconButton
                                      icon={<EditIcon />}
                                      aria-label="edit"
                                      size="sm"
                                      onClick={() => startEdit(s)}
                                    />
                                    <IconButton
                                      icon={<DeleteIcon />}
                                      aria-label="delete"
                                      size="sm"
                                      colorScheme="red"
                                      onClick={() => removeSpending(s.id)}
                                    />
                                  </>
                                )}
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
    </>
  );
};

export default SpendingsTable;
