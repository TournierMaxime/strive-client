import { api as http } from "../../../services/axios"
import { Activities, Activity, Laps, Records } from "../types/activity"

class ActivityService {
  private http = http

  async getActivities(params?: {
    offset?: number
    limit?: number
  }): Promise<Activities> {
    const {
      data,
    }: {
      data: Activities
    } = await this.http.post("/activities", params)
    return data
  }

  async getActivity(activity_id: string): Promise<Activity> {
    const { data }: { data: { activity: Activity } } = await this.http.get(
      `/activities/${activity_id}`
    )
    return data.activity
  }

  async getActivityLaps(activity_id: string): Promise<Laps> {
    const { data }: { data: Laps } = await this.http.get(
      `/activities/${activity_id}/laps`
    )
    return data
  }

  async getActivityRecords(activity_id: string | undefined): Promise<Records> {
    const { data }: { data: Records } = await this.http.get(
      `/activities/${activity_id}/records`
    )
    return data
  }

  async updateActivities(): Promise<{ message: string }> {
    const { data }: { data: { message: string } } = await this.http.post(
      "/activities/update"
    )
    return data
  }
}

export const activityService = new ActivityService()
