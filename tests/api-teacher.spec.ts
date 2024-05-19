import {Token, User, clerkClient} from "@clerk/nextjs/server";
import test, {expect} from "@playwright/test";
import {fail} from "assert";

let clerkUser: User;
let token: Token;

const createTestUser = async () => {
    const user = await clerkClient.users.createUser({
        firstName: "Test",
        lastName: "User",
        emailAddress: [`testuser_${Date.now()}@example.com`],
        password: "dfklashgijrashgpashfpqwoij341234HDfjd;askfp",
    });

    const sessions = await clerkClient.sessions.getSessionList({
        userId: user.id,
    });
    console.log(sessions);

    const token = await clerkClient.sessions.getToken(
        sessions.data[0].id,
        "testing-template"
    );

    return {user, token};
};

const deleteTestUser = async () => {
    await clerkClient.users.deleteUser(clerkUser.id);
};

test.beforeAll(async ({}) => {
    try {
        const result = await createTestUser();
        clerkUser = result.user;
        token = result.token;

        console.log("Result: ", result);
    } catch (error) {
        fail(`Error: ${error}`);
    }
});

test("getting started", async ({}) => {
    expect(clerkUser).not.toBeNull();
    expect(token).not.toBeNull();
});

test.afterAll(async ({}) => {
    if (!clerkUser) return;
    await deleteTestUser();
});
