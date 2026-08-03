"use client";

import { useRouter } from "next/navigation";

import { GameCanvas } from "@/game/GameCanvas";

export default function RoomPage() {
  const router = useRouter();

  return <GameCanvas onExit={() => router.push("/")} />;
}
