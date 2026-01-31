"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [interns, setInterns] = useState([]);

  const [selectedIntern, setSelectedIntern] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/attendance").then(res => res.json()),
      fetch("/api/interns").then(res => res.json())
    ]).then(([attendanceData, internData]) => {
      setRecords(attendanceData);
      setInterns(internData);
    });
  }, []);

  const getInternName = (internId) =>
    interns.find(i => i.id === internId)?.name || internId;

  // 🔍 FILTER LOGIC
  const filteredRecords = records.filter(r => {
    const internMatch =
      !selectedIntern || r.internId === selectedIntern;

    const dateMatch =
      !selectedDate || r.date === selectedDate;

    return internMatch && dateMatch;
  });

  return (
    <DashboardLayout role="admin">
      <h1 className="mb-6">Attendance Records</h1>

      {/* 🔽 Filters */}
      <Card className="p-4 mb-6 flex flex-col md:flex-row gap-4 border border-slate-200 rounded-lg">
        <select
          className="border rounded px-3 py-2"
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

        <input
          type="date"
          className="border rounded px-3 py-2"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
        />
      </Card>

      {filteredRecords.length === 0 && (
        <Card className="p-8 text-center text-slate-500 border border-slate-200 rounded-lg">
          No matching attendance records.
        </Card>
      )}

      {filteredRecords.length > 0 && (
        <Card className="overflow-hidden border border-slate-200 rounded-lg p-4">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-4 py-2">Intern</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map((r, index) => (
                <tr key={index} className="border-b hover:bg-slate-50">
                  <td className="px-4 py-2 font-medium">
                    {getInternName(r.internId)}
                  </td>
                  <td className="px-4 py-2">{r.date}</td>
                  <td className="px-4 py-2">
                    <Badge color={r.status === "Present" ? "green" : "red"}>
                      {r.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </DashboardLayout>
  );
}
