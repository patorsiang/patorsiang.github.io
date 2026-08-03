"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { assetFolder, playerSpeed, scaleFactor, setCamScale } from "./config";
import { dialogueFor, exitObjectName } from "./dialogue";

type GameCanvasProps = {
  /** Called when the player walks into the `exit` object and closes the dialogue. */
  readonly onExit: () => void;
};

type MapObject = {
  readonly name?: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
};

type MapLayer = {
  readonly name: string;
  readonly objects?: readonly MapObject[];
};

export function GameCanvas({ onExit }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onExitRef = useRef(onExit);

  // The scene owns the player, but React owns the dialogue box. These three
  // refs are the whole interface between them: which object is talking, how to
  // stop the typewriter, and how to hand movement back to the player.
  const activeObjectRef = useRef<string | null>(null);
  const typeTimerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const releaseDialogueRef = useRef<() => void>(() => {});

  const [dialogueText, setDialogueText] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  // Kept in a ref so the scene, which is built once, always calls the current
  // handler. Synced in an effect rather than during render, which React forbids.
  useEffect(() => {
    onExitRef.current = onExit;
  }, [onExit]);

  const closeDialogue = useCallback(() => {
    clearInterval(typeTimerRef.current);
    releaseDialogueRef.current();

    const closedObject = activeObjectRef.current;
    activeObjectRef.current = null;
    setDialogueText(null);

    // The Close button had focus; hand it back to the canvas so the keyboard
    // controls keep working without a stray Tab.
    canvasRef.current?.focus();

    if (closedObject === exitObjectName) {
      onExitRef.current();
    }
  }, []);

  useEffect(() => {
    let disposed = false;
    let quit: (() => void) | undefined;

    async function start() {
      // kaplay is ~2MB, so it loads only once this route renders rather than
      // riding in a shared bundle.
      const { default: kaplay } = await import("kaplay");

      if (disposed || !canvasRef.current) {
        return;
      }

      const k = kaplay({
        global: false,
        touchToMouse: true,
        canvas: canvasRef.current,
        debug: false,
      });

      quit = () => k.quit();

      k.loadRoot(assetFolder);
      k.loadSprite("spritesheet", "/spritesheet.png", {
        sliceX: 39,
        sliceY: 31,
        anims: {
          "male-idle-down": 936,
          "male-walk-down": { from: 936, to: 939, loop: true, speed: 8 },
          "male-idle-side": 975,
          "male-walk-side": { from: 975, to: 978, loop: true, speed: 8 },
          "male-idle-up": 1014,
          "male-walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
          "female-idle-down": 952,
          "female-walk-down": { from: 952, to: 955, loop: true, speed: 8 },
          "female-idle-side": 991,
          "female-walk-side": { from: 991, to: 994, loop: true, speed: 8 },
          "female-idle-up": 1030,
          "female-walk-up": { from: 1030, to: 1033, loop: true, speed: 8 },
        },
      });
      k.loadSprite("map", "/map.png");
      k.setBackground(k.Color.fromHex("#191919"));

      // Sprites and the map are fetched before the first frame draws, so
      // without this the canvas is simply black for the whole load.
      k.onLoad(() => setReady(true));

      k.scene("main", async () => {
        const response = await fetch(`${assetFolder}/map.json`);
        const mapData: { layers: readonly MapLayer[] } = await response.json();

        const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);

        const player = k.make([
          k.sprite("spritesheet", { anim: "female-idle-down" }),
          k.area({ shape: new k.Rect(k.vec2(0, 3), 10, 10) }),
          k.body(),
          k.anchor("center"),
          k.pos(),
          k.scale(scaleFactor),
          { speed: playerSpeed, direction: "down", isInDialogue: false },
          "player",
        ]);

        releaseDialogueRef.current = () => {
          player.isInDialogue = false;
        };

        for (const layer of mapData.layers) {
          if (layer.name === "boundaries") {
            for (const boundary of layer.objects ?? []) {
              map.add([
                k.area({ shape: new k.Rect(k.vec2(0), boundary.width, boundary.height) }),
                k.body({ isStatic: true }),
                k.pos(boundary.x, boundary.y),
                boundary.name ?? "",
              ]);

              const name = boundary.name;

              if (!name) {
                continue;
              }

              player.onCollide(name, () => {
                const text = dialogueFor(name);

                // Unnamed or undocumented objects are still solid, they just
                // have nothing to say. Re-colliding mid-dialogue is ignored so
                // the typewriter cannot restart under itself.
                if (text === null || player.isInDialogue) {
                  return;
                }

                player.isInDialogue = true;
                activeObjectRef.current = name;

                // The original typed at 1ms, which is faster than a frame and
                // made the effect invisible. 18ms reads as typing and still
                // finishes the longest line in about five seconds.
                let index = 0;
                clearInterval(typeTimerRef.current);
                setDialogueText("");

                typeTimerRef.current = setInterval(() => {
                  index += 1;
                  setDialogueText(text.slice(0, index));

                  if (index >= text.length) {
                    clearInterval(typeTimerRef.current);
                  }
                }, 18);
              });
            }
          }

          if (layer.name === "spawnpoints") {
            for (const entity of layer.objects ?? []) {
              if (entity.name === "player") {
                player.pos = k.vec2(
                  (map.pos.x + entity.x) * scaleFactor,
                  (map.pos.y + entity.y) * scaleFactor,
                );
                k.add(player);
              }
            }
          }
        }

        setCamScale(k);
        k.onResize(() => setCamScale(k));
        k.onUpdate(() => {
          // KAPLAY types worldPos() as nullable — it is null until the object is
          // attached to the scene tree, which is exactly the first frames here.
          const position = player.worldPos();

          if (position) {
            k.setCamPos(position.x, position.y - 100);
          }
        });

        function stopAnims() {
          if (player.direction === "down") {
            player.play("female-idle-down");
            return;
          }

          if (player.direction === "up") {
            player.play("female-idle-up");
            return;
          }

          player.play("female-idle-side");
        }

        k.onMouseDown((mouseBtn) => {
          if (mouseBtn !== "left" || player.isInDialogue) return;

          const worldMousePos = k.toWorld(k.mousePos());
          player.moveTo(worldMousePos, player.speed);

          const mouseAngle = player.pos.angle(worldMousePos);
          const lowerBound = 50;
          const upperBound = 125;

          if (
            mouseAngle > lowerBound &&
            mouseAngle < upperBound &&
            player.getCurAnim()?.name !== "female-walk-up"
          ) {
            player.play("female-walk-up");
            player.direction = "up";
            return;
          }

          if (
            mouseAngle < -lowerBound &&
            mouseAngle > -upperBound &&
            player.getCurAnim()?.name !== "female-walk-down"
          ) {
            player.play("female-walk-down");
            player.direction = "down";
            return;
          }

          if (Math.abs(mouseAngle) > upperBound) {
            player.flipX = false;
            if (player.getCurAnim()?.name !== "female-walk-side") player.play("female-walk-side");
            player.direction = "right";
            return;
          }

          if (Math.abs(mouseAngle) < lowerBound) {
            player.flipX = true;
            if (player.getCurAnim()?.name !== "female-walk-side") player.play("female-walk-side");
            player.direction = "left";
          }
        });

        k.onMouseRelease(stopAnims);

        k.onKeyDown(() => {
          const keyMap = [
            k.isKeyDown("right"),
            k.isKeyDown("left"),
            k.isKeyDown("up"),
            k.isKeyDown("down"),
          ];

          if (keyMap.filter(Boolean).length > 1 || player.isInDialogue) return;

          if (keyMap[0]) {
            player.flipX = false;
            if (player.getCurAnim()?.name !== "female-walk-side") player.play("female-walk-side");
            player.direction = "right";
            player.move(player.speed, 0);
            return;
          }

          if (keyMap[1]) {
            player.flipX = true;
            if (player.getCurAnim()?.name !== "female-walk-side") player.play("female-walk-side");
            player.direction = "left";
            player.move(-player.speed, 0);
            return;
          }

          if (keyMap[2]) {
            if (player.getCurAnim()?.name !== "female-walk-up") player.play("female-walk-up");
            player.direction = "up";
            player.move(0, -player.speed);
            return;
          }

          if (keyMap[3]) {
            if (player.getCurAnim()?.name !== "female-walk-down") player.play("female-walk-down");
            player.direction = "down";
            player.move(0, player.speed);
          }
        });

        k.onKeyRelease(stopAnims);
      });

      k.go("main");
    }

    start().catch(() => {
      if (!disposed) {
        setFailed(true);
      }
    });

    return () => {
      disposed = true;
      clearInterval(typeTimerRef.current);
      quit?.();
    };
  }, []);

  // Enter closes the dialogue, matching the original. Bound at the document so
  // it works whether or not the Close button has focus.
  useEffect(() => {
    if (dialogueText === null) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Enter" || event.key === "Escape") {
        closeDialogue();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [dialogueText, closeDialogue]);

  if (failed) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="text-sm text-(--color-text-muted)">
          The room could not start in this browser. It needs WebGL.
        </p>
        <Link href="/room/text" className="text-sm font-semibold text-(--color-accent) underline">
          Read it as text instead
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh bg-(--color-room)">
      <p className="pointer-events-none absolute left-4 top-4 z-10 text-sm text-zinc-200 sm:left-8">
        Click, tap, or use the arrow keys to move.
      </p>

      <Link
        href="/room/text"
        className="absolute right-4 top-4 z-10 rounded-md px-3 py-1.5 text-sm font-semibold text-zinc-200 underline-offset-4 transition hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 sm:right-8"
      >
        Read as text
      </Link>

      <canvas ref={canvasRef} tabIndex={-1} className="block h-dvh w-full outline-none" />

      {ready ? null : (
        <p
          role="status"
          className="absolute inset-0 z-10 flex items-center justify-center text-sm text-zinc-300"
        >
          Loading the room…
        </p>
      )}

      {dialogueText === null ? null : (
        <div
          role="dialog"
          aria-modal="true"
          aria-live="polite"
          aria-label="Object description"
          className="absolute inset-x-4 bottom-4 z-20 flex flex-col gap-4 rounded-lg bg-white p-6 text-zinc-900 shadow-lg sm:inset-x-10 sm:bottom-10 sm:p-8"
        >
          <p className="m-0 text-base leading-7 sm:text-lg">{dialogueText}</p>
          <button
            type="button"
            onClick={closeDialogue}
            autoFocus
            className="self-end rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
