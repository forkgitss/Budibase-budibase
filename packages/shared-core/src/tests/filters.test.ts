import { BasicOperator, FieldType, LegacyFilter } from "@budibase/types"
import { buildQuery } from "../filters"

describe("buildQuery", () => {
  describe("LegacyFilter", () => {
    it("it can resolve a empty LegacyFilter", () => {
      const basicQuery: LegacyFilter[] = []

      const result = buildQuery(basicQuery)
      expect(result).toEqual({})
    })

    it("it can resolve a single LegacyFilter", () => {
      const basicQuery: LegacyFilter[] = [
        {
          field: "_id",
          operator: BasicOperator.EQUAL,
          type: FieldType.STRING,
          value: "123",
          valueType: "Binding",
        },
      ]

      const result = buildQuery(basicQuery)
      expect(result).toEqual({
        $and: {
          conditions: [{ equal: { _id: "" } }],
        },
        onEmptyFilter: "all",
      })
    })

    it("it can resolve multiple LegacyFilters", () => {
      const basicQuery: LegacyFilter[] = [
        {
          field: "_id",
          operator: BasicOperator.EQUAL,
          type: FieldType.STRING,
          value: "456",
          valueType: "Binding",
        },
        {
          field: "name",
          operator: BasicOperator.EQUAL,
          type: FieldType.STRING,
          value: "value",
          valueType: "Binding",
        },
      ]

      const result = buildQuery(basicQuery)
      expect(result).toEqual({
        $and: {
          conditions: [{ equal: { _id: "456" } }, { equal: { name: "value" } }],
        },
        onEmptyFilter: "all",
      })
    })
  })
})
