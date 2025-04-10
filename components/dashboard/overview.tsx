"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Mon",
    total: 45,
  },
  {
    name: "Tue",
    total: 60,
  },
  {
    name: "Wed",
    total: 90,
  },
  {
    name: "Thu",
    total: 50,
  },
  {
    name: "Fri",
    total: 75,
  },
  {
    name: "Sat",
    total: 120,
  },
  {
    name: "Sun",
    total: 30,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} min`}
        />
        <Tooltip
          formatter={(value: number) => [`${value} minutes`, "Study Time"]}
          labelFormatter={(label) => `${label}`}
        />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}
