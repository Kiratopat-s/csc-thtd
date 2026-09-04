"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Even if the API fails, redirect to login
    }
    window.location.href = "/login";
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant="outlined"
      color="secondary"
      sx={{ borderRadius: 2 }}
    >
      {isLoading ? <CircularProgress size={20} /> : "ออกจากระบบ"}
    </Button>
  );
}
