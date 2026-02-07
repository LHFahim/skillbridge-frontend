"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useState } from "react";

interface ITutorSearchFilterProps {
  categories: any[];
  onSearch?: (filters: ITutorFilters) => void;
  onReset?: () => void;
}

export interface ITutorFilters {
  search?: string;
  categoryIds?: string[];
  minRate?: number;
  maxRate?: number;
}

export function TutorSearchFilter({
  categories,
  onSearch,
  onReset,
}: ITutorSearchFilterProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search) params.append("search", search);

    if (selectedCategory && selectedCategory !== "all")
      params.append("categoryIds", selectedCategory);

    if (minRate) params.append("minRate", minRate);
    if (maxRate) params.append("maxRate", maxRate);

    const newUrl = `/tutors${params.toString() ? "?" + params.toString() : ""}`;
    window.location.href = newUrl;
  };

  const handleReset = () => {
    setSearch("");
    setSelectedCategory("");
    setMinRate("");
    setMaxRate("");
    window.location.href = "/tutors";
  };

  const hasActiveFilters =
    search ||
    (selectedCategory && selectedCategory !== "all") ||
    minRate ||
    maxRate;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Search & Filter Tutors</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          {/* search input starts here */}
          <div className="space-y-2">
            <Label htmlFor="search">Search by Name or Subject</Label>
            <Input
              id="search"
              placeholder="IT"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* price range */}
          <div className="space-y-2">
            <Label>Price Range (per hour)</Label>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="space-y-1">
                <Label
                  htmlFor="minRate"
                  className="text-xs text-muted-foreground"
                >
                  Minimum
                </Label>
                <Input
                  id="minRate"
                  type="number"
                  placeholder="0"
                  value={minRate}
                  onChange={(e) => setMinRate(e.target.value)}
                  min="0"
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="maxRate"
                  className="text-xs text-muted-foreground"
                >
                  Maximum
                </Label>
                <Input
                  id="maxRate"
                  type="number"
                  placeholder="500"
                  value={maxRate}
                  onChange={(e) => setMaxRate(e.target.value)}
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* buttons */}
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Search
            </Button>
            {hasActiveFilters && (
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="flex-1"
              >
                <X className="h-4 w-4 mr-2" />
                Reset
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
