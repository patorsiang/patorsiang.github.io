import { describe, expect, test } from "bun:test";

import mapData from "../../public/assets/2d-game-portfolio/map.json";
import { dialogue, dialogueFor, exitObjectName } from "./dialogue";

type MapObject = { name?: string };
type MapLayer = { name: string; objects?: MapObject[] };

/** The spawn point, not something the player can bump into. */
const nonInteractive = new Set(["player"]);

const objectNames = [
  ...new Set(
    (mapData.layers as MapLayer[])
      .flatMap((layer) => layer.objects ?? [])
      .map((object) => object.name)
      .filter((name): name is string => Boolean(name)),
  ),
].filter((name) => !nonInteractive.has(name));

describe("dialogue stays in step with the map", () => {
  // The map is authored in Tiled and the dialogue by hand, in separate files
  // with no shared type. Nothing else catches them drifting apart.
  test("every interactive object in map.json has dialogue", () => {
    const missing = objectNames.filter((name) => dialogueFor(name) === null);

    expect(missing).toEqual([]);
  });

  test("every dialogue entry maps to an object that exists", () => {
    const orphaned = Object.keys(dialogue).filter((key) => !objectNames.includes(key));

    expect(orphaned).toEqual([]);
  });

  test("the exit object is one of them", () => {
    expect(objectNames).toContain(exitObjectName);
    expect(dialogueFor(exitObjectName)).not.toBeNull();
  });
});

describe("dialogueFor", () => {
  test("returns null for an unknown object rather than throwing", () => {
    expect(dialogueFor("no-such-object")).toBeNull();
  });

  test("returns the text for a known object", () => {
    expect(dialogueFor("clock")).toContain("5:00 AM");
  });
});
