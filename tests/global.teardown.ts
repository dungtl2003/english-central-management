import {test as setup} from "@playwright/test";

setup("global teardown", async ({}) => {
    console.log("cleanup database");
});
