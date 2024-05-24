"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

import kaboom from "kaboom";

import { setCamScale } from "@/utils/game";

import { scaleFactor } from "@/constants";

export default function GamePortfolio() {
  const t = useTranslations("page.game");
  useEffect(() => {
    const k = kaboom();

    // Step 1: assets
    const folder = "/assets/2d-game-portfolio";
    k.loadRoot(folder);

    k.loadSprite("spritesheet", "/spritesheet.png", {
      sliceX: 39,
      sliceY: 31,
      anims: {
        // Step 1.1: male player
        "male-idle-down": 936,
        "male-walk-down": { from: 936, to: 939, loop: true, speed: 8 },
        "male-idle-side": 975,
        "male-walk-side": { from: 975, to: 978, loop: true, speed: 8 },
        "male-idle-up": 1014,
        "male-walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
        // Step 1.2: female player
        "female-idle-down": 952,
        "female-walk-down": { from: 952, to: 955, loop: true, speed: 8 },
        "female-idle-side": 991,
        "female-walk-side": { from: 991, to: 994, loop: true, speed: 8 },
        "female-idle-up": 1030,
        "female-walk-up": { from: 1030, to: 1033, loop: true, speed: 8 },
      },
    });

    // Step 1.3: map
    k.loadSprite("map", "/map.png");

    // Step 1.4: set bg color
    k.setBackground(k.Color.fromHex("#191919"));

    // Step 2: set the scene
    k.scene("main", async () => {
      // Step 2.1: load the map data
      const mapData = await (await fetch(`${folder}/map.json`)).json();
      const layers = mapData.layers;

      // Step 2.2: add the map
      const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);

      // Step 2.3: add the player
      const player = k.make([
        k.sprite("spritesheet", { anim: "female-idle-down" }),
        k.area({
          shape: new k.Rect(k.vec2(0, 3), 10, 10),
        }),
        k.body(),
        k.anchor("center"),
        k.pos(),
        k.scale(scaleFactor),
        {
          speed: 250,
          direction: "down",
          isInDialogue: false,
        },
        "player",
      ]);

      // Step 2.4: set position of boundaries and spawn points based
      for (const layer of layers) {
        // Step 2.4.1: set position of boundaries
        if (layer.name === "boundaries") {
          for (const boundary of layer.objects) {
            map.add([
              k.area({
                shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
              }),
              k.body({ isStatic: true }),
              k.pos(boundary.x, boundary.y),
              boundary.name,
            ]);

            // Step 2.4.2: set the dialog box
            if (boundary.name) {
              player.onCollide(boundary.name, () => {
                // player.isInDialogue = true;
                // displayDialogue(
                //   dialogueData[boundary.name],
                //   () => (player.isInDialogue = false)
                // );
                console.log(boundary.name);
              });
            }
          }
        }

        // Step 2.4.3: set position of spawn points based
        if (layer.name === "spawnpoints") {
          for (const entity of layer.objects) {
            if (entity.name === "player") {
              player.pos = k.vec2(
                (map.pos.x + entity.x) * scaleFactor,
                (map.pos.y + entity.y) * scaleFactor
              );
              k.add(player);
            }
          }
        }
      }

      // Step 2.5: update Camera position
      setCamScale(k);

      k.onResize(() => {
        setCamScale(k);
      });

      k.onUpdate(() => {
        k.camPos(player.worldPos().x, player.worldPos().y - 100);
      });

      // Step 2.6: set stop Animation Position Functions
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

      // Step 2.7: set Position by Mouse Functions
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
          player.curAnim() !== "female-walk-up"
        ) {
          player.play("female-walk-up");
          player.direction = "up";
          return;
        }

        if (
          mouseAngle < -lowerBound &&
          mouseAngle > -upperBound &&
          player.curAnim() !== "female-walk-down"
        ) {
          player.play("female-walk-down");
          player.direction = "down";
          return;
        }

        if (Math.abs(mouseAngle) > upperBound) {
          player.flipX = false;
          if (player.curAnim() !== "female-walk-side")
            player.play("female-walk-side");
          player.direction = "right";
          return;
        }

        if (Math.abs(mouseAngle) < lowerBound) {
          player.flipX = true;
          if (player.curAnim() !== "female-walk-side")
            player.play("female-walk-side");
          player.direction = "left";
          return;
        }
      });

      k.onMouseRelease(stopAnims);

      // Step 2.8: set Position by Keyboard Functions
      k.onKeyDown(() => {
        const keyMap = [
          k.isKeyDown("right"),
          k.isKeyDown("left"),
          k.isKeyDown("up"),
          k.isKeyDown("down"),
        ];

        let nbOfKeyPressed = 0;
        for (const key of keyMap) {
          if (key) {
            nbOfKeyPressed++;
          }
        }

        if (nbOfKeyPressed > 1) return;

        if (player.isInDialogue) return;
        if (keyMap[0]) {
          player.flipX = false;
          if (player.curAnim() !== "female-walk-side")
            player.play("female-walk-side");
          player.direction = "right";
          player.move(player.speed, 0);
          return;
        }

        if (keyMap[1]) {
          player.flipX = true;
          if (player.curAnim() !== "female-walk-side")
            player.play("female-walk-side");
          player.direction = "left";
          player.move(-player.speed, 0);
          return;
        }

        if (keyMap[2]) {
          if (player.curAnim() !== "female-walk-up")
            player.play("female-walk-up");
          player.direction = "up";
          player.move(0, -player.speed);
          return;
        }

        if (keyMap[3]) {
          if (player.curAnim() !== "female-walk-down")
            player.play("female-walk-down");
          player.direction = "down";
          player.move(0, player.speed);
        }
      });

      k.onKeyRelease(() => {
        stopAnims();
      });
    });

    // Step 3: init scene
    k.go("main");
  }, []);

  return <></>;
}
