"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function Dashboard() {
  const [status, setStatus] = useState("Not marked");
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetch("/api/attendance")
      .then(res => res.json())
      .then(data => {
        const found = data.find(
          a => a.internId === "1" && a.date === today
        );
        if (found) setStatus("Present");
      });
  }, [today]);

  const markAttendance = async () => {
    const res = await fetch("/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ internId: "1", date: today })
    });

    if (res.ok) setStatus("Present");
    else alert("Attendance already marked");
  };

  return (
    <DashboardLayout role="intern">
      <h1 className="mb-6">Intern Dashboard</h1>

      <Card className="p-6 flex flex-col items-center text-center max-w-md border border-slate-200 rounded-lg">
        <p className="mb-2 text-slate-500">
          <b>Date:</b> {today}
        </p>

        <div className="mb-4">
          <Badge color={status === "Present" ? "green" : "blue"}>
            {status}
          </Badge>
        </div>

        {status === "Not marked" ? (
          <Button onClick={markAttendance}>
            Mark Attendance
          </Button>
        ) : (
          <p className="text-green-600 font-medium">
            Attendance marked for today
          </p>
        )}
      </Card>
    </DashboardLayout>
  );
}
