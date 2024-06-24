import {clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";
import {NextRequest, NextResponse} from "next/server";
import {UserJwtSessionClaims, UserRole} from "./constaints";

const homePage = "/";
const completeProfilePage = "/complete-profile";
const errorPage = "/404";

const isNonRoleProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isAdminProtectedRoute = createRouteMatcher(["/admins(.*)"]);
const isTeacherProtectedRoute = createRouteMatcher(["/teachers(.*)"]);
const isStudentProtectedRoute = createRouteMatcher(["/students(.*)"]);
const isParentProtectedRoute = createRouteMatcher(["/parents(.*)"]);
const isUserProfileRoute = createRouteMatcher(["/user-profile(.*)"]);

const isProtectedRoute = (req: NextRequest): boolean => {
    return (
        isNonRoleProtectedRoute(req) ||
        isAdminProtectedRoute(req) ||
        isTeacherProtectedRoute(req) ||
        isStudentProtectedRoute(req) ||
        isParentProtectedRoute(req) ||
        isUserProfileRoute(req)
    );
};

const isRightPermission = (role: string | null, req: NextRequest): boolean => {
    return !(
        (role !== UserRole.ADMIN && isAdminProtectedRoute(req)) ||
        (role !== UserRole.TEACHER && isTeacherProtectedRoute(req)) ||
        (role !== UserRole.STUDENT && isStudentProtectedRoute(req)) ||
        (role !== UserRole.PARENT && isParentProtectedRoute(req))
    );
};

const skipHomePage = (
    userId: string,
    req: NextRequest,
    role: string
): NextResponse => {
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
            throw new Error("Unsupported role");
    }

    return NextResponse.redirect(req.nextUrl);
};

export default clerkMiddleware(
    (auth, req) => {
        console.log("Request ", req.nextUrl.pathname);

        const referUserId: string | null = auth().userId;
        const jwt: UserJwtSessionClaims | null = auth().sessionClaims;
        const role: UserRole | null =
            (jwt?.metadata?.public?.role as UserRole) ?? null;

        //the user isn't authenticated
        if (!referUserId && isProtectedRoute(req)) {
            return auth().redirectToSignIn({returnBackUrl: req.url});
        }

        //the user doesn't have right permission
        if (!isRightPermission(role, req)) {
            return NextResponse.redirect(new URL(errorPage, req.url));
        }

        //the user is authorized and in home page
        if (referUserId && req.nextUrl.pathname === homePage) {
            if (!role) {
                return NextResponse.redirect(
                    new URL(completeProfilePage, req.url)
                );
            }
            return skipHomePage(auth().userId!, req, role);
        }

        //public route or the user is authorized
        return NextResponse.next();
    },
    {debug: false}
);

export const config = {
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
