import { request } from "./client";

export const studentsApi = {
  getAll: function (pageNumber = 1, limitSize = 50) {
    return request(`/students?page=${pageNumber}&limit=${limitSize}`);
  },
  getOne: function (studentId) {
    return request("/students/one/" + studentId);
  },
  getArchive: function () {
    return request("/students/archive");
  },
  getMyGroups: function () {
    return request("/students/my/groups");
  },
  getOwnHomework: function (lessonId) {
    return request(`/homework/own/${lessonId}`);
  },
  create: function (payload) {
    const isForm = payload instanceof FormData;
    return request("/students", {
      method: "POST",
      body: isForm ? payload : JSON.stringify(payload),
    });
  },
  update: function (studentId, payload) {
    const isForm = payload instanceof FormData;
    return request(`/students/${studentId}`, {
      method: "PATCH",
      body: isForm ? payload : JSON.stringify(payload),
    });
  },
  remove: function (studentId) {
    return request(`/students/${studentId}`, { method: "DELETE" });
  },
  homeworkAnswer: function (hwId, payload) {
    const isForm = payload instanceof FormData;
    return request(`/students/homeworkAnswer/${hwId}`, {
      method: "POST",
      body: isForm ? payload : JSON.stringify(payload),
    });
  },
};
