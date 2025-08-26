interface Activity {
  activity_id: string
  name: string
  description: null
  type: string
  course_id: null
  laps: number
  sport: string
  sub_sport: string
  device_serial_number: null
  self_eval_feel: null
  self_eval_effort: null
  training_load: null
  training_effect: number
  anaerobic_training_effect: null
  start_time: string
  stop_time: string
  elapsed_time: string
  moving_time: string
  distance: number
  cycles: number
  avg_hr: number
  max_hr: number
  avg_rr: null
  max_rr: null
  calories: number
  avg_cadence: number
  max_cadence: number
  avg_speed: number
  max_speed: number
  ascent: number
  descent: number
  max_temperature: number
  min_temperature: null
  avg_temperature: number
  start_lat: number
  start_long: number
  stop_lat: number
  stop_long: number
  hr_zones_method: string
  hrz_1_hr: number
  hrz_2_hr: number
  hrz_3_hr: number
  hrz_4_hr: number
  hrz_5_hr: number
  hrz_1_time: string
  hrz_2_time: string
  hrz_3_time: string
  hrz_4_time: string
  hrz_5_time: string
}

interface Records {
  activity: Record[]
  chartData: {
    time: string
    hr: number
  }[]
}

interface Record {
  activity_id: string
  record: number
  timestamp: string
  position_lat: number
  position_long: number
  distance: number
  cadence: number
  altitude: number
  hr: number
  rr: null
  speed: number
  temperature: null
}

interface Laps {
  activity: Lap[]
}

interface Lap {
  activity_id: string
  lap: number
  start_time: string
  stop_time: string
  elapsed_time: string
  moving_time: string
  distance: number
  cycles: number
  avg_hr: number
  max_hr: number
  avg_rr: null
  max_rr: null
  calories: number
  avg_cadence: number
  max_cadence: number
  avg_speed: number
  max_speed: number
  ascent: number
  descent: number
  max_temperature: number
  min_temperature: null
  avg_temperature: number
  start_lat: number
  start_long: number
  stop_lat: number
  stop_long: number
  hr_zones_method: string
  hrz_1_hr: number
  hrz_2_hr: number
  hrz_3_hr: number
  hrz_4_hr: number
  hrz_5_hr: number
  hrz_1_time: string
  hrz_2_time: string
  hrz_3_time: string
  hrz_4_time: string
  hrz_5_time: string
}

interface Activities {
  activities: Activity[]
  meta: {
    offset: number
    limit: number
    total: number
  }
}

export { Activity, Record, Records, Laps, Lap, Activities }
