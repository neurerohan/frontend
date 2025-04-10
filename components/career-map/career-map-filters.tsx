"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter } from "lucide-react"

export function CareerMapFilters() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Explore Career Paths</h2>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search career paths..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" id="education-level">
        <div className="mb-2">
          <Label>Filter by Education Level</Label>
        </div>
        <TabsList className="w-full md:w-auto grid grid-cols-2 md:flex md:flex-row gap-2 md:gap-0">
          <TabsTrigger value="all">All Paths</TabsTrigger>
          <TabsTrigger value="see">SEE Students</TabsTrigger>
          <TabsTrigger value="plus-two">+2 Students</TabsTrigger>
          <TabsTrigger value="bachelor">Bachelor Students</TabsTrigger>
          <TabsTrigger value="professional">Professionals</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
