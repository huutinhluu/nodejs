export default {
  type: "object",
  properties: {
    first_name: { type: "string", pattern: "^[A-Z\\s]{2,45}$" },
    last_name: { type: "string", pattern: "^[A-Z\\s]{2,45}$" },
  },
  required: ["first_name", "last_name"],
  additionalProperties: false,
};
