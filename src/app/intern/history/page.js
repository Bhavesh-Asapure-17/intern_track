"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";

export default function History() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch("/api/activity")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(a => a.internId === "1");
        setActivities(filtered);
      });
  }, []);

  return (
    <DashboardLayout role="intern">
      <h1 className="mb-6">Activity History</h1>

      {activities.length === 0 && (
        <Card className="p-8 text-center text-slate-500 border border-slate-200 rounded-lg">
          No activity logs submitted yet.
        </Card>
      )}

      <div className="space-y-4">
        {activities.map((a, index) => (
          <Card key={index} className="p-6 border border-slate-200 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
              <p className="text-sm text-slate-500">
                <b>Date:</b> {a.date}
              </p>
              <p className="text-sm text-slate-500">
                <b>Hours:</b> {a.hours}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-700 mb-1">
                Tasks
              </p>
              <p className="text-slate-800 whitespace-pre-wrap">
                {a.tasks}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
