import axios from "axios";

describe('GET /api', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api/v1`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: "Api is running" });
  });
});
