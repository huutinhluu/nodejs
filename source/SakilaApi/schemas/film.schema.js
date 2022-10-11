export default {
  type: "object",
  properties: {
    title: { type: "string", pattern: "^[A-Z\\s]{2,128}$" },
    description: { type: "string", pattern: "^([A-Z])([\\w\\d\\s,.])*$" },
    release_year: { type: "integer", minimum: 1900, maximum: 2022 },
    language_id: { type: "integer", minimum: 1, maximum: 6 },
    original_language_id: { type: "integer", minimum: 1, maximum: 6 },
    rental_duration: { type: "integer", minimum: 3, maximum: 7 },
    rental_rate: { type: "number", minimum: 0.99, maximum: 4.99 },
    length: { type: "integer", minimum: 30, maximum: 240 },
    replacement_cost: { type: "number", minimum: 9.99, maximum: 30 },
    special_features: {
      type: "array",
      minItems: 1,
      maxItems: 4,
      uniqueItems: true,
      items: {
        enum: [
          "Trailers",
          "Commentaries",
          "Deleted Scenes",
          "Behind the Scenes",
        ],
      },
    },
    rating: { enum: ["G", "PG", "PG-13", "R", "NC-17"] },
  },
  dependencies: {
    rental_rate: ["rental_duration"],
  },
  required: ["title", "language_id"],
  additionalProperties: false,
};
