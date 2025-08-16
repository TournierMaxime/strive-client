import { api as http } from "./axios"

class StriveService {
  private http = http

  async getActivities(params?: { offset?: number; limit?: number }) {
    const { data } = await http.post("/activities", params)
    return data
  }
}

export const striveApi = new StriveService()
