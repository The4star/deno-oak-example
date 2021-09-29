import { join, BufReader, parse, _ } from '../dependencies.ts'
import { Planet } from '../types.d.ts'

const loadPlanetsData = async () => {
  const path = join("data", "kepler_exoplanets_nasa.csv")
  const file = await Deno.open(path)
  const bufreader = new BufReader(file)
  const result = await parse(bufreader, {
    comment: "#",
    skipFirstRow: true
  }) as Planet[]
  Deno.close(file.rid)

  const planets = result.filter((planet: Planet) => {
    const planetaryRadius = Number(planet["koi_prad"]);
    const stellarMass = Number(planet["koi_smass"]);
    const stellarRadius = Number(planet["koi_srad"])
    return planet["koi_disposition"] === "CONFIRMED"
    && planetaryRadius > 0.5 && planetaryRadius < 1.5
    && stellarMass > 0.78 && stellarMass < 1.04
    && stellarRadius > 0.99 && stellarRadius < 1.01;
  }).map((planet: Planet) => {
    return _.pick(planet, [
      "koi_prad",
      "koi_smass",
      "koi_srad",
      "koi_name",
      "koi_count",
      "koi_steff"
    ])
  })

  return planets 
}
