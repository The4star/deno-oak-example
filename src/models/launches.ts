// deno-lint-ignore-file no-explicit-any

let allLaunchData: Launch[] = []


const formatLaunchData = (launchData: any) => {
  const launches: Launch[] = []
  for (const launch of launchData) {
    const customers = launch.rocket.second_stage.payloads.map((p: any) => {
      return p.customers
    }).flat()

    const flightData: Launch = {
      flightNumber: launch.flight_number,
      mission: launch.mission_name,
      rocket: launch.rocket.rocket_name,
      customers,
      launchDate: launch.launch_date_unix,
      upcoming: launch.upcoming,
      success: launch.launch_success,
    };
    launches.push(flightData)
  }
  return launches
}

const downloadLaunchData = async (): Promise<Launch[]> => {
  const response = await fetch("https://api.spacexdata.com/v3/launches", {
    method: "GET"
  })

  const launchData = await response.json()  
  const formattedLaunchData = formatLaunchData(launchData)
  formattedLaunchData.forEach(fl => {
    const alreadyDownloaded = allLaunchData.some(op => op.flightNumber === fl.flightNumber)    
    if (!alreadyDownloaded) {
      allLaunchData.push(fl)
    }
  })
  return allLaunchData
}

const addLaunch = (data: Launch) => {
  allLaunchData.push({
    ...data,
    upcoming: true,
    customers: ["4star Enterprises", "Nasa"]
  })
}

const abortLaunch = (id: number): Launch | undefined => {
  const launchToAbort = allLaunchData.find(launch => launch.flightNumber === id)
  if (launchToAbort) {
    launchToAbort.success = false
    launchToAbort.upcoming = false
  }
  return launchToAbort
}

export {
  downloadLaunchData,
  addLaunch,
  abortLaunch
}
