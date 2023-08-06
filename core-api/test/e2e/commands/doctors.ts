import supertest from "supertest";

import { Api } from "../api";

export const fetchSlots = (api: Api, variables: any): supertest.Test =>
  api.post("").send({
    query: `
    query getSlots($slotInput: slotInput!){
      getSlots( slotInput: $slotInput) {
        doctorId
        date
        availabilities {
          start
          end
          isAvailable
        }
      }
    }
    `,
    variables: variables
  });
