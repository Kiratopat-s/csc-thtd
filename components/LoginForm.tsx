"use client";

import { useState } from "react";
import { Zap, Lock, User, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import Link from "next/link";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import MuiLink from "@mui/material/Link";

const Aurora = dynamic(() => import("@/components/backgrounds/Aurora"), {
  ssr: false,
});

export default function LoginForm() {
  const { mode } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "เกิดข้อผิดพลาด");
        setIsLoading(false);
        return;
      }

      window.location.href = data.redirect;
    } catch {
      setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        px: { xs: 2, sm: 3 },
      }}
    >
      {/* Aurora Background */}
      <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Aurora
          colorStops={["#1a0a2e", "#7c3aed", "#f97316"]}
          amplitude={1.0}
          blend={0.5}
          speed={0.6}
          lightMode={mode === "light"}
        />
      </Box>

      {/* Dark overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          bgcolor: mode === "dark" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.3)",
        }}
      />

      {/* Login Card */}
      <Paper
        elevation={6}
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 400,
          p: { xs: 3, sm: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 4 },
          bgcolor: mode === "dark" ? "rgba(26, 26, 26, 0.8)" : "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        {/* Icon + Brand */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
          <Zap
            style={{ width: 48, height: 48, color: "#f97316" }}
            strokeWidth={1.5}
          />
          <Typography variant="body2" color="text.secondary" sx={{ letterSpacing: 2 }}>
            การแข่งขันทักษะฝีมือช่าง 2569
          </Typography>
        </Box>

        {/* Title */}
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          เข้าสู่ระบบ
        </Typography>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Username */}
          <TextField
            fullWidth
            label="ชื่อผู้ใช้"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <User style={{ width: 20, height: 20, color: "var(--text-muted)" }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* Password */}
          <TextField
            fullWidth
            label="รหัสผ่าน"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock style={{ width: 20, height: 20, color: "var(--text-muted)" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      tabIndex={-1}
                      sx={{ color: "text.secondary" }}
                    >
                      {showPassword ? <EyeOff style={{ width: 20, height: 20 }} /> : <Eye style={{ width: 20, height: 20 }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* Error */}
          {error && (
            <Typography variant="body2" sx={{ color: "error.main", textAlign: "center" }}>
              {error}
            </Typography>
          )}

          {/* Submit */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{
              py: 1.5,
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.light" },
              "&.Mui-disabled": { opacity: 0.6 },
            }}
          >
            {isLoading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "เข้าสู่ระบบ"
            )}
          </Button>
        </Box>

        {/* Divider */}
        <Divider sx={{ width: "100%" }} />

        {/* Back Link */}
        <MuiLink
          component={Link}
          href="/"
          underline="hover"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "text.secondary",
            fontSize: "0.875rem",
            "&:hover": { color: "primary.light" },
          }}
        >
          <ArrowLeft style={{ width: 16, height: 16 }} />
          กลับหน้าหลัก
        </MuiLink>
      </Paper>
    </Box>
  );
}
