import {clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";
import {NextRequest, NextResponse} from "next/server";
import {UserJwtSessionClaims, UserRole} from "./constaints";

const homepage = "/";
const isNonRoleProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isTestProtectedRoute = createRouteMatcher(["/normal-users(.*)"]);
const isAdminProtectedRoute = createRouteMatcher(["/admins(.*)"]);
const isTeacherProtectedRoute = createRouteMatcher(["/teachers(.*)"]);
const isStudentProtectedRoute = createRouteMatcher(["/students(.*)"]);
const isParentProtectedRoute = createRouteMatcher(["/parents(.*)"]);
const isProtectedRoute = (req: NextRequest): boolean => {
    return (
        isNonRoleProtectedRoute(req) ||
        isAdminProtectedRoute(req) ||
        isTeacherProtectedRoute(req) ||
        isStudentProtectedRoute(req) ||
        isParentProtectedRoute(req) ||
        isTestProtectedRoute(req)
    );
};

export default clerkMiddleware(
    (auth, req) => {
        const jwt: UserJwtSessionClaims | null = auth().sessionClaims;
        const role: string | null =
            jwt && jwt!.metadata && jwt!.metadata!.role
                ? jwt!.metadata!.role
                : null;

        //if the user isn't authenticated
        if (!auth().userId && isProtectedRoute(req)) {
            return auth().redirectToSignIn({returnBackUrl: req.url});
        }

        //user doesn't have right permission
        //the user must have signed in in order to try to access protected routes,
        //no need to check userId
        if (role !== UserRole.ADMIN && isAdminProtectedRoute(req)) {
            return NextResponse.redirect(new URL("/404", req.url));
        }
        if (role !== UserRole.TEACHER && isTeacherProtectedRoute(req)) {
            return NextResponse.redirect(new URL("/404", req.url));
        }
        if (role !== UserRole.STUDENT && isStudentProtectedRoute(req)) {
            return NextResponse.redirect(new URL("/404", req.url));
        }
        if (role !== UserRole.PARENT && isParentProtectedRoute(req)) {
            return NextResponse.redirect(new URL("/404", req.url));
        }

        //TODO: for testing purpose
        if (
            auth().userId &&
            role === null &&
            req.nextUrl.pathname === homepage
        ) {
            req.nextUrl.pathname = `/normal-users/${auth().userId}`;
            return NextResponse.redirect(req.nextUrl);
        }

        //user is authorized and in homepage
        if (auth().userId && role && req.nextUrl.pathname === homepage) {
            const response = skipHomePage(auth().userId!, role!, req);
            if (response !== null) return response;
        }

        //public route or the user is authorized
        return NextResponse.next();
    },
    {debug: true}
);

function skipHomePage(
    userId: string,
    role: string,
    req: NextRequest
): NextResponse<unknown> | null {
    switch (role) {
        case UserRole.ADMIN:
            req.nextUrl.pathname = `/admins/${userId}`;
            break;
        case UserRole.TEACHER:
            req.nextUrl.pathname = `/teachers/${userId}`;
            break;
        case UserRole.STUDENT:
            req.nextUrl.pathname = `/students/${userId}`;
            break;
        case UserRole.PARENT:
            req.nextUrl.pathname = `/parents/${userId}`;
            break;
        default:
            return null;
    }

    return NextResponse.redirect(req.nextUrl);
}

export const config = {
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
