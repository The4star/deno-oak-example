import { join, BufReader, parse, _ } from '../deps.ts'
import { Planet } from '../types.d.ts'

export const filterHabitablePlanets = ((planets: Planet[]) => {
  return planets.filter((planet: Planet) => {
    const planetaryRadius = Number(planet["koi_prad"]);
    const stellarMass = Number(planet["koi_smass"]);
    const stellarRadius = Number(planet["koi_srad"])
    return planet["koi_disposition"] === "CONFIRMED"
    && planetaryRadius > 0.5 && planetaryRadius < 1.5
    && stellarMass > 0.78 && stellarMass < 1.04
    && stellarRadius > 0.99 && stellarRadius < 1.01;
  }).map((planet: Planet) => {
    return _.pick(planet, [
      "kepler_name",
      "koi_prad",
      "koi_smass",
      "koi_srad",
      "koi_name",
      "koi_count",
      "koi_steff"
    ])
  }) 
})

const loadPlanetsData = async (): Promise<Planet[]> => {  
  try {
    const path = join("src/data", "kepler_exoplanets_nasa.csv")
    const file = await Deno.open(path)
    const bufreader = new BufReader(file)
    const result = await parse(bufreader, {
      comment: "#",
      skipFirstRow: true
    }) as Planet[]
    Deno.close(file.rid)
    
    const planetData = filterHabitablePlanets(result)   
    return planetData 
  } catch (error) {    
    throw new Error("Error getting planets data", error);
  }
}

export {
  loadPlanetsData
}
