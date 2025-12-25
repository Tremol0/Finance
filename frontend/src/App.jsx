import { Route, Routes, useLocation } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";
import { Box, useColorModeValue } from "@chakra-ui/react";
import SpendingPage from "./pages/SpendingPage";
import SpendingsTable from "./pages/SpendingsTable";
import Dashboard from "./pages/Dashboard";
import Topbar from "./components/Topbar";

function App() {
  const location = useLocation();
  const topbarPaths = ["/dashboard", "/spending", "/tables"];
  const showTopbar = topbarPaths.some((p) => location.pathname.startsWith(p));

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      {/* render Topbar only on selected pages */}
      {showTopbar && <Topbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/spending" element={<SpendingPage />} />
        <Route path="/tables" element={<SpendingsTable />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Box>
  );
}

export default App;
