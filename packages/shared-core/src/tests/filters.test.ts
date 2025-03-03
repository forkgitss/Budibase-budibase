import { BasicOperator, FieldType, LegacyFilter } from "@budibase/types"
import { buildQuery } from "../filters"

describe("buildQuery", () => {
  describe("LegacyFilter", () => {
    describe.each([true, false])("allOr: %s", allOr => {
      const baseQuery: LegacyFilter[] = allOr ? [{ operator: "allOr" }] : []

      it("it can resolve a empty LegacyFilter", () => {
        const query = [...baseQuery]

        const result = buildQuery(query)
        expect(result).toEqual({})
      })

      it("it can resolve a single LegacyFilter", () => {
        const query: LegacyFilter[] = [
          ...baseQuery,
          {
            field: "_id",
            operator: BasicOperator.EQUAL,
            type: FieldType.STRING,
            value: "123",
            valueType: "Binding",
          },
        ]

        const result = buildQuery(query)
        expect(result).toEqual({
          $and: {
            conditions: [
              {
                [allOr ? "$or" : "$and"]: {
                  conditions: [{ equal: { _id: "123" } }],
                },
              },
            ],
          },
          onEmptyFilter: "all",
        })
      })

      it("it can resolve multiple LegacyFilters", () => {
        const query: LegacyFilter[] = [
          ...baseQuery,
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

        const result = buildQuery(query)
        expect(result).toEqual({
          $and: {
            conditions: [
              {
                [allOr ? "$or" : "$and"]: {
                  conditions: [
                    { equal: { _id: "456" } },
                    { equal: { name: "value" } },
                  ],
                },
              },
            ],
          },
          onEmptyFilter: "all",
        })
      })
    })
  })
})
