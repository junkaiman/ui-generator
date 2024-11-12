"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect } from "react";
import { useState } from "react";

export default function ProgressOverlay() {
  const [progress, setProgress] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkpoints: NodeJS.Timeout[] = [];
    checkpoints.push(setTimeout(() => setProgress(30), 50));
    checkpoints.push(setTimeout(() => setProgress(60), 100));
    checkpoints.push(setTimeout(() => setProgress(90), 500));
    checkpoints.push(setTimeout(() => setProgress(100), 600));
    checkpoints.push(setTimeout(() => setLoading(false), 700));

    return () => {
      checkpoints.forEach((checkpoint) => clearTimeout(checkpoint));
    };
  }, []);

  return (
    loading && (
      <div className="flex flex-col  gap-2 fixed inset-0 items-center justify-center bg-white bg-opacity-95 z-50">
        <div className="text-xl"> 📐Insta UI is loading...</div>
        <Progress value={progress} className="w-[40%]" />
      </div>
    )
  );
}
