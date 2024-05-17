import {clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";
import {NextRequest, NextResponse} from "next/server";
import {UserJwtSessionClaims} from "./constaints";
import {UserRole} from "@prisma/client";

const homepage = "/";
const errorPage = "/404";
const completeProfilePage = "";
const isNonRoleProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
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
        isParentProtectedRoute(req)
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
): NextResponse | null => {
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
};

export default clerkMiddleware(
    (auth, req) => {
        const jwt: UserJwtSessionClaims | null = auth().sessionClaims;
        const role: string | null = jwt?.metadata?.role?.toUpperCase() ?? null;

        //the user isn't authenticated
        if (!auth().userId && isProtectedRoute(req)) {
            return auth().redirectToSignIn({returnBackUrl: req.url});
        }

        //the user is authenticated but hasn't complete profile yet
        if (auth().userId && !role) {
            return NextResponse.redirect(new URL(completeProfilePage, req.url));
        }

        //the user doesn't have right permission
        if (!isRightPermission(role, req)) {
            return NextResponse.redirect(new URL(errorPage, req.url));
        }

        //the user is fully authorized and in homepage
        if (auth().userId && role && req.nextUrl.pathname === homepage) {
            const response = skipHomePage(auth().userId!, req, role!);
            if (response !== null) return response;
        }

        //public route or the user is authorized
        return NextResponse.next();
    },
    {debug: true}
);

export const config = {
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
