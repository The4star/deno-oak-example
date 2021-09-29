import { assertEquals } from "../deps.ts";
import {filterHabitablePlanets} from './planets.ts'

interface planetTest {
  habitable: boolean
  planet: Planet
}

const planetsTests: planetTest[] = [
  {
    habitable: true,
    planet: {
      kepler_name: "Kepler-227 a",
      koi_disposition: "CONFIRMED",
      koi_prad: "1",
      koi_srad: "1",
      koi_smass: "1"
    }
  },
  {
    habitable: false,
    planet: {
      kepler_name: "Kepler-227 b",
      koi_disposition: "FALSE POSITIVE"
    }
  },
  {
    habitable: false,
    planet: {
      kepler_name: "Kepler-227 c",
      koi_disposition: "CONFIRMED",
      koi_prad: "1.5",
      koi_srad: "1",
      koi_smass: "1"
    }
  },
  {
    habitable: false,
    planet: {
      kepler_name: "Kepler-227 d",
      koi_disposition: "CONFIRMED",
      koi_prad: "1",
      koi_srad: "1.01",
      koi_smass: "1"
    }
  },
  {
    habitable: false,
    planet: {
      kepler_name: "Kepler-227 e",
      koi_disposition: "CONFIRMED",
      koi_prad: "1",
      koi_srad: "1",
      koi_smass: "1.04"
    }
  }
]

Deno.test("filters only habitable planets", () => {
  planetsTests.forEach(test => {
    const filtered = filterHabitablePlanets([test.planet])
    const amountOfPlanets = filtered.length
    if (test.habitable) {
      assertEquals(1, amountOfPlanets)
    } else {    
      assertEquals(0, amountOfPlanets)
    }
  })
})