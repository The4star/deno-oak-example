// deno-lint-ignore-file no-explicit-any

let allOnlineLaunchData: Launch[] = []
let allLocalLaunchData: Launch[] = []

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
  allOnlineLaunchData = formatLaunchData(launchData)
  return [...allOnlineLaunchData, ...allLocalLaunchData]
}

const addLaunch = (data: Launch) => {
  allLocalLaunchData.push({
    ...data,
    upcoming: true,
    customers: ["4star Enterprises", "Nasa"]
  })
}

export {
  downloadLaunchData,
  addLaunch
}
