import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";
import { Box, useColorModeValue } from "@chakra-ui/react";
import SpendingPage from "./pages/SpendingPage";
import SpendingsTable from "./pages/SpendingsTable";

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/spending" element={<SpendingPage />} />
        <Route path="/spendings" element={<SpendingsTable />} />
      </Routes>
    </Box>
  );
}

export default App;
