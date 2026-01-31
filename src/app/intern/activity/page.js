"use client";
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function Activity() {
  const [tasks, setTasks] = useState("");
  const [hours, setHours] = useState("");
  const [blockers, setBlockers] = useState("");
  const [message, setMessage] = useState("");

  const date = new Date().toISOString().split("T")[0];

  const submitActivity = async () => {
    // ✅ PRD-COMPLIANT VALIDATION
    if (!tasks.trim() || !hours || Number(hours) <= 0) {
      setMessage(
        "Please provide valid tasks and hours (hours must be greater than 0)."
      );
      return;
    }

    const res = await fetch("/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        internId: "1",
        date,
        tasks: tasks.trim(),
        hours: Number(hours),
        blockers
      })
    });

    const data = await res.json();
    setMessage(data.message);

    if (res.ok) {
      setTasks("");
      setHours("");
      setBlockers("");
    }
  };

  return (
    <DashboardLayout role="intern">
      <h1>Daily Activity Log</h1>

      <Card>
        <p className="mb-4 text-slate-500">
          <b>Date:</b> {date}
        </p>

        <div className="mb-4">
          <label>
            Tasks Worked On *
          </label>
          <textarea
            placeholder="Tasks worked on"
            value={tasks}
            onChange={e => setTasks(e.target.value)}
            rows={4}
          />
        </div>

        <div className="mb-4">
          <label>
            Hours Spent *
          </label>
          <input
            type="number"
            min="1"
            placeholder="Hours spent"
            value={hours}
            onChange={e => setHours(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label>
            Blockers (optional)
          </label>
          <textarea
            placeholder="Blockers (optional)"
            value={blockers}
            onChange={e => setBlockers(e.target.value)}
            rows={2}
          />
        </div>

        <Button onClick={submitActivity} className="w-full">
          Submit Activity
        </Button>

        {message && (
          <p className="mt-4 text-sm text-indigo-600 font-medium">
            {message}
          </p>
        )}
      </Card>
    </DashboardLayout>
  );
}
