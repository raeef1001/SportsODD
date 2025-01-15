"use client";

import { useState, useMemo } from "react";
import { Search, Calendar, Users } from "lucide-react";
import matchData from "@/data/matches.json";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  // Get all matches data
  const allMatches = matchData.data.flatMap((item) => {
    const matches = item.matches?.match;
    return Array.isArray(matches) ? matches : matches ? [matches] : [];
  });

  // Filter matches based on search query
  const filteredMatches = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return allMatches.filter(
      (match) =>
        match.id?.toString().toLowerCase().includes(query) ||
        match.localteam?.name?.toLowerCase().includes(query) ||
        match.awayteam?.name?.toLowerCase().includes(query)
    );
  }, [searchQuery, allMatches]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelectMatch = (match: any) => {
    setSelectedMatch(match);
    setSearchQuery(`${match.localteam.name} vs ${match.awayteam.name}`);
    setShowSuggestions(false);
  };

  const match = selectedMatch || allMatches[0] || null;
  const oddTypes = match?.odds?.type || [];

  const getBookmakers = (type: any) => {
    if (!type.bookmaker) return [];
    return Array.isArray(type.bookmaker) ? type.bookmaker : [type.bookmaker];
  };

  const formatOddValue = (value: string) => {
    const numValue = parseFloat(value);
    return numValue.toFixed(2);
  };

  const formatDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split(".");
    return new Date(`${year}-${month}-${day}`).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (!match) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg text-muted-foreground">
              {searchQuery ? "No matches found for your search" : "No match data available"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <Card className="w-full md:w-auto relative">
            <CardHeader className="py-3">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by match ID or team name..."
                  value={searchQuery}
                  onChange={handleSearch}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-full md:w-[300px] border-none shadow-none focus-visible:ring-0"
                />
              </div>
            </CardHeader>
            {showSuggestions && filteredMatches.length > 0 && (
              <div className="absolute z-10 w-full bg-white dark:bg-gray-800 rounded-b-lg shadow-lg max-h-60 overflow-auto">
                {filteredMatches.map((match) => (
                  <div
                    key={match.id}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleSelectMatch(match)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {match.localteam.name} vs {match.awayteam.name}
                      </span>
                      <span className="text-sm text-muted-foreground">ID: {match.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="w-full md:w-auto bg-primary text-primary-foreground">
            <CardHeader className="py-3">
              <div className="flex items-center space-x-4">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">{formatDate(match.date)}</span>
                <Users className="h-4 w-4" />
                <span className="font-medium">
                  {match.localteam.name} vs {match.awayteam.name}
                </span>
              </div>
            </CardHeader>
          </Card>
        </div>

        {oddTypes.map((type) => (
          <Card key={type.id} className="overflow-hidden">
            <CardHeader className="py-3 bg-muted/50">
              <CardTitle className="text-lg font-semibold">{type.value}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Bookmaker</TableHead>
                      {getBookmakers(type)[0]?.odd?.map((odd) => (
                        <TableHead key={odd.name} className="text-center">
                          {odd.name}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getBookmakers(type).map((bookmaker) => (
                      <TableRow key={bookmaker.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <span>{bookmaker.name}</span>
                            {bookmaker.stop === "True" && (
                              <Badge variant="destructive" className="text-xs">
                                Stopped
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        {bookmaker.odd?.map((odd) => (
                          <TableCell
                            key={odd.name}
                            className={cn(
                              "text-center font-medium",
                              parseFloat(odd.value) > 2
                                ? "text-green-600 dark:text-green-400"
                                : "text-blue-600 dark:text-blue-400"
                            )}
                          >
                            {formatOddValue(odd.value)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
