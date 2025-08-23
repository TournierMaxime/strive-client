import { api as http } from "./axios"

class StriveService {
  private http = http

  async getActivities(params?: { offset?: number; limit?: number }) {
    const { data } = await this.http.post("/activities", params)
    return data
  }

  async getActivity(activity_id: string) {
    const { data } = await this.http.get(`/activities/${activity_id}`)
    return data
  }

  async updateActivities() {
    const { data } = await this.http.post("/activities/update")
    return data
  }
}

export const striveApi = new StriveService()
