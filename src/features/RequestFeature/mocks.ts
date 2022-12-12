import { FeatureRequest } from "./models";

export const featureRequestsMock: FeatureRequest[] = [
  {
    id: 0,
    name: "Feature Request",
    description: "I want to be able to save feature requests",
    author: "Dima",
    done: false,
  },
  {
    id: 1,
    name: "Exercise statistics",
    description:
      "I want to be able to store results of my exercises, view charts and I want to create different exercise templates.",
    author: "Ana",
    done: false,
  },
  {
    id: 2,
    name: "Food Stock",
    description:
      "I want to store and view current stock of my food products. Also it would be nice to retrieve notifications when product quantity changes.",
    author: "Dima",
    done: false,
  },
  {
    id: 3,
    name: "Authentication",
    description: "I want to have authentication (by Email).",
    author: "Dima",
    done: false,
  },
  {
    id: 4,
    name: "Calendar",
    description:
      "I want to have calendar with events exported from all my online accounts.",
    author: "Dima",
    done: false,
  },
];
