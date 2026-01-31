"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [interns, setInterns] = useState([]);

  const [selectedIntern, setSelectedIntern] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/activity").then(res => res.json()),
      fetch("/api/interns").then(res => res.json())
    ]).then(([activityData, internData]) => {
      setActivities(activityData);
      setInterns(internData);
    });
  }, []);

  const resetFilters = () => {
    setSelectedIntern("");
    setStartDate("");
    setEndDate("");
  };

  // FILTER LOGIC 
  const filteredActivities = activities.filter(a => {
    const internMatch =
      !selectedIntern || a.internId === selectedIntern;

    const startMatch =
      !startDate || a.date >= startDate;

    const endMatch =
      !endDate || a.date <= endDate;

    return internMatch && startMatch && endMatch;
  });

  return (
    <DashboardLayout role="admin">
      <h1 className="mb-6">Activity Logs</h1>

      {/* Filters */}
      <Card className="p-4 mb-6 border border-slate-200 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div>
            <label className="block text-sm font-medium mb-1">
              Intern
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={selectedIntern}
              onChange={e => setSelectedIntern(e.target.value)}
            >
              <option value="">All Interns</option>
              {interns.map(i => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Start Date
            </label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              End Date
            </label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>

          <div className="flex items-end justify-end">
            <button
              onClick={resetFilters}
              title="Reset Filters"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
            >
              ⟳
            </button>
          </div>


        </div>
      </Card>

      {filteredActivities.length === 0 && (
        <Card className="p-6 text-center text-slate-500 border border-slate-200 rounded-lg">
          No matching activities.
        </Card>
      )}

      <div className="space-y-4">
        {filteredActivities.map((a, index) => (
          <Card key={index} className="p-6 border border-slate-200 rounded-lg">
            <div className="flex justify-between mb-2 text-sm text-slate-500">
              <p><b>Date:</b> {a.date}</p>
              <p><b>Intern:</b> {a.internId}</p>
            </div>

            <p className="text-sm font-semibold mb-1">Tasks</p>
            <p className="whitespace-pre-wrap">{a.tasks}</p>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
