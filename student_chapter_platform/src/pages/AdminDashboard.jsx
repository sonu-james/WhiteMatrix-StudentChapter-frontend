import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  TextField,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import LogoutIcon from "@mui/icons-material/Logout";
import dataModel from "../data/internshipData.json";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // States
  const [modules, setModules] = useState(dataModel.modules);
  const [studyPacks, setStudyPacks] = useState(dataModel.studyPacks);
  const [assessments, setAssessments] = useState(dataModel.assessments);
  const [skillFilter, setSkillFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState(0);
  const [adminName, setAdminName] = useState("Admin");

  // 🧠 Load admin info
  useEffect(() => {
    const storedUser = sessionStorage.getItem("existingUser");
    if (storedUser && storedUser !== "undefined") {
      const parsed = JSON.parse(storedUser);
      setAdminName(parsed?.username || "Admin");
    }
  }, []);

  // ➕ Add Module
  const addModule = () => {
    const newModule = {
      id: modules.length + 1,
      title: "New Module",
      description: "Newly added module",
      status: "not-started",
      skill: "Fullstack",
      level: "Beginner",
    };
    setModules([...modules, newModule]);
  };

  // ❌ Delete Study Pack
  const deleteStudyPack = (id) => {
    setStudyPacks(studyPacks.filter((pack) => pack.id !== id));
  };

  // ⬇️ Export CSV
  const exportCSV = () => {
    const csvRows = [
      ["ID", "Title", "Date", "Skill", "Level"],
      ...assessments.map((a) => [a.id, a.title, a.date, a.skill, a.level]),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((row) => row.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "assessments.csv";
    link.click();
  };

  // 🧩 Filters
  const applyFilters = (data) => {
    return data.filter(
      (item) =>
        (skillFilter ? item.skill === skillFilter : true) &&
        (levelFilter ? item.level === levelFilter : true) &&
        (search
          ? item.title.toLowerCase().includes(search.toLowerCase())
          : true)
    );
  };

  // 🚪 Logout
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #E0F7FA, #F1F8E9)",
        p: 0,
      }}
    >
      {/* 🌟 Top Bar */}
      <AppBar
        position="sticky"
        elevation={3}
        sx={{
          background: "linear-gradient(90deg, #0288D1, #26C6DA)",
          borderBottom: "2px solid rgba(255,255,255,0.3)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            🧠 Admin Dashboard
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {adminName}
            </Typography>
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                textTransform: "none",
                borderColor: "white",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
              }}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        {/* Filters */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Skill</InputLabel>
            <Select
              value={skillFilter}
              label="Skill"
              onChange={(e) => setSkillFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Frontend">Frontend</MenuItem>
              <MenuItem value="Backend">Backend</MenuItem>
              <MenuItem value="Fullstack">Fullstack</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Level</InputLabel>
            <Select
              value={levelFilter}
              label="Level"
              onChange={(e) => setLevelFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Search by Title"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1 }}
          />
        </Stack>

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          sx={{
            mb: 2,
            "& .MuiTab-root": {
              fontWeight: 600,
              textTransform: "none",
            },
            "& .Mui-selected": { color: "#0288D1" },
            "& .MuiTabs-indicator": {
              backgroundColor: "#0288D1",
              height: 3,
              borderRadius: 2,
            },
          }}
        >
          <Tab label="Modules" />
          <Tab label="Study Packs" />
          <Tab label="Assessments" />
        </Tabs>

        {/* MODULES */}
        {tab === 0 && (
          <Paper
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight="bold">
              📘 Manage Modules
            </Typography>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              sx={{ mb: 2, textTransform: "none" }}
              onClick={addModule}
            >
              Add Module
            </Button>
            <DataGrid
              rows={applyFilters(modules)}
              columns={[
                { field: "id", headerName: "ID", width: 70 },
                { field: "title", headerName: "Title", flex: 1 },
                { field: "skill", headerName: "Skill", width: 150 },
                { field: "level", headerName: "Level", width: 150 },
                { field: "status", headerName: "Status", width: 150 },
              ]}
              autoHeight
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#E1F5FE",
                  fontWeight: "bold",
                },
              }}
            />
          </Paper>
        )}

        {/* STUDY PACKS */}
        {tab === 1 && (
          <Paper
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight="bold">
              📂 Study Packs
            </Typography>
            <DataGrid
              rows={applyFilters(studyPacks)}
              columns={[
                { field: "id", headerName: "ID", width: 70 },
                { field: "title", headerName: "Title", flex: 1 },
                { field: "skill", headerName: "Skill", width: 150 },
                { field: "level", headerName: "Level", width: 150 },
                {
                  field: "actions",
                  headerName: "Actions",
                  width: 100,
                  renderCell: (params) => (
                    <IconButton
                      color="error"
                      onClick={() => deleteStudyPack(params.row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  ),
                },
              ]}
              autoHeight
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#E1F5FE",
                  fontWeight: "bold",
                },
              }}
            />
          </Paper>
        )}

        {/* ASSESSMENTS */}
        {tab === 2 && (
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight="bold">
              📝 Assessments
            </Typography>
            <Button
              startIcon={<FileDownloadIcon />}
              variant="outlined"
              color="success"
              sx={{ mb: 2, textTransform: "none" }}
              onClick={exportCSV}
            >
              Export CSV
            </Button>
            <DataGrid
              rows={applyFilters(assessments)}
              columns={[
                { field: "id", headerName: "ID", width: 70 },
                { field: "title", headerName: "Title", flex: 1 },
                { field: "date", headerName: "Date", width: 150 },
                { field: "skill", headerName: "Skill", width: 150 },
                { field: "level", headerName: "Level", width: 150 },
              ]}
              autoHeight
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#E1F5FE",
                  fontWeight: "bold",
                },
              }}
            />
          </Paper>
        )}
      </Box>
    </Box>
  );
}
