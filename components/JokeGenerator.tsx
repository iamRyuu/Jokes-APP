"use client";

import { useState, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const jokeCategories = ["General", "knock-knock", "Programming", "dad"];

interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchJoke = useCallback(async () => {
    if (!selectedCategory) return;

    //https://official-joke-api.appspot.com/jokes/dad/random

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://official-joke-api.appspot.com/jokes/${selectedCategory}/random`
      );
      const data = await response.json();

      console.log(data);

      if (data) {
        setJokes(data);
      } else {
        setJokes([]);
      }
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJokes([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="flex space-x-2">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select joke category" />
          </SelectTrigger>
          <SelectContent>
            {jokeCategories.map((category) => (
              <SelectItem key={category} value={category.toLowerCase()}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={fetchJoke} disabled={!selectedCategory || isLoading}>
          {isLoading ? "Loading..." : "Get Joke"}
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          {jokes ? (
            <>
              <p className="text-center">{jokes[0]?.setup}</p>
              <p className="text-center">{jokes[0]?.punchline}</p>
            </>
          ) : (
            <p className="text-center text-gray-500">
              Select a category and click "Get Joke" to see a joke here.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
