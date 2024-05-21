import {setupClerkTestingToken} from "@clerk/testing/playwright";
import {test, expect} from "@playwright/test";

test.describe("app", () => {
    test("sign in", async ({page}) => {
        await setupClerkTestingToken({page});

        await page.goto(`/teachers/${process.env.E2E_CLERK_TEACHER_ID!}`);
        console.log(await page.content());
        await expect(page.locator("h1")).toContainText("Sign in to ECM");
        await page.locator(".cl-signIn-root").waitFor({state: "attached"});
        await page
            .locator("input[name=identifier]")
            .fill(process.env.E2E_CLERK_TEACHER_EMAIL!);
        await page.getByRole("button", {name: "Continue", exact: true}).click();
        await page
            .locator("input[name=password]")
            .fill(process.env.E2E_CLERK_TEACHER_PASSWORD!);
        await page.getByRole("button", {name: "Continue", exact: true}).click();
        await page.waitForURL(
            `**/teachers/${process.env.E2E_CLERK_TEACHER_ID!}`
        );
    });
});
