import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { NewPendingImplementation } from "../generated/schema"
import { NewPendingImplementation as NewPendingImplementationEvent } from "../generated/Factory/Factory"
import { handleNewPendingImplementation } from "../src/factory"
import { createNewPendingImplementationEvent } from "./factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let oldPendingImplementation = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newPendingImplementation = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newNewPendingImplementationEvent = createNewPendingImplementationEvent(
      oldPendingImplementation,
      newPendingImplementation
    )
    handleNewPendingImplementation(newNewPendingImplementationEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NewPendingImplementation created and stored", () => {
    assert.entityCount("NewPendingImplementation", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NewPendingImplementation",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "oldPendingImplementation",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "NewPendingImplementation",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newPendingImplementation",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
