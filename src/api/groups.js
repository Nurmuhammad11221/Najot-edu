import { request } from "./client";

export const groupsApi = {
  getAll: function () {
    return request("/groups/all");
  },
  getOne: function (groupId) {
    return request("/groups/one/" + groupId);
  },
  getById: function (groupId) {
    return request(`/groups/${groupId}`);
  },
  getStudents: function (groupId) {
    return request(`/groups/one/students/${groupId}`);
  },
  getArchive: function () {
    return request("/groups/archive");
  },
  getSchedules: function (groupId) {
    return request(`/groups/${groupId}/schedules`);
  },
  getLesson: function (groupId) {
    return request(`/groups/${groupId}/lesson`);
  },
  // Talaba darslari
  getStudentLessonsAll: function (groupId) {
    return request(`/groups/${groupId}/lessons/all`);
  },
  getStudentLessons: function (groupId) {
    return request(`/groups/${groupId}/lessons`);
  },
  // Videolar va uy vazifalari
  getLessonVideos: function (groupId, lessonId) {
    return request(`/groups/${groupId}/lessons/${lessonId}/videos`);
  },
  getLessonHomeworks: function (groupId, lessonId) {
    return request(`/groups/${groupId}/lessons/${lessonId}/homeworks`);
  },
  create: function (payload) {
    return request("/groups", { method: "POST", body: JSON.stringify(payload) });
  },
  createLesson: function (groupId, payload) {
    return request(`/groups/${groupId}/lesson`, { method: "POST", body: JSON.stringify(payload) });
  },
  update: function (groupId, payload) {
    return request(`/groups/${groupId}`, { method: "PATCH", body: JSON.stringify(payload) });
  },
  remove: function (groupId) {
    return request(`/groups/${groupId}`, { method: "DELETE" });
  },
};
