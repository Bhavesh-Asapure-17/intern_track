"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function Interns() {
  const [interns, setInterns] = useState([]);

  useEffect(() => {
    fetch("/api/interns")
      .then(res => res.json())
      .then(setInterns);
  }, []);

  return (
    <DashboardLayout role="admin">
      <h1 className="mb-6">Intern List</h1>

      <Card className="overflow-hidden border border-slate-200 rounded-lg p-4">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th>Name</th>
              <th>Email</th>
              </tr>
          </thead>

          <tbody>
            {interns.map(intern => (
              <tr
                key={intern.id}
                className="border-b last:border-0 hover:bg-slate-50"
              >
                <td className="font-medium">{intern.name}</td>
                <td>{intern.email}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </DashboardLayout>
  );
}
