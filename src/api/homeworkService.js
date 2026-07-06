import { request } from "./client";

function jsonBody(body) {
  return body instanceof FormData ? body : JSON.stringify(body);
}

function buildUrl(path, query = {}) {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, value);
    }
  });
  return params.toString() ? `${path}?${params.toString()}` : path;
}

export const homeworkApi = {
  getAll: () => request("/homework/all"),
  getOwn: (lessonId) => request(`/homework/own/${lessonId}`),
  getByGroup: (groupId) => request(`/homework/${groupId}`),
  getResults: (groupId, homeworkId, status) =>
    request(buildUrl(`/group/${groupId}/homework/${homeworkId}/results`, { status })),
  getResult: (groupId, homeworkId, studentId) =>
    request(`/group/${groupId}/homework/${homeworkId}/result/${studentId}`),
  getStudentHomework: (groupId, lessonId, homeworkId, studentId) =>
    request(`/group/${groupId}/lesson/${lessonId}/homework/${homeworkId}/student/${studentId}`),
  create: (body) =>
    request("/homework", { method: "POST", body: jsonBody(body) }),
  check: (groupId, homeworkId, body) =>
    request(`/group/${groupId}/homework/${homeworkId}/check`, {
      method: "POST",
      body: jsonBody(body),
    }),
};
