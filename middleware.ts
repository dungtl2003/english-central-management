import {clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";
import {NextRequest, NextResponse} from "next/server";
import {UserRole} from "@prisma/client";
import {UserJwtSessionClaims} from "./constaints";

const homePage = "/";
const errorPage = "/404";
const completeProfilePage = "/complete-profile";

const isNonRoleProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isAdminProtectedRoute = createRouteMatcher(["/admins(.*)"]);
const isTeacherProtectedRoute = createRouteMatcher(["/teachers(.*)"]);
const isStudentProtectedRoute = createRouteMatcher(["/students(.*)"]);
const isParentProtectedRoute = createRouteMatcher(["/parents(.*)"]);
const isApiRoute = createRouteMatcher(["/api(.*)"]);

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

//TODO: middleware logic could be better
export default clerkMiddleware(
    (auth, req) => {
        const jwt: UserJwtSessionClaims | null = auth().sessionClaims;
        const role: UserRole | null = (jwt?.metadata?.role as UserRole) ?? null;
        console.log("auth ID: ", auth().userId);
        console.log("jwt: ", jwt);

        //for authenticated api calls
        if (auth().userId && isApiRoute(req)) {
            return NextResponse.next();
        }

        //the user isn't authenticated
        if (!auth().userId && isProtectedRoute(req)) {
            return auth().redirectToSignIn({returnBackUrl: req.url});
        }

        //the user is authenticated but hasn't complete profile yet
        if (
            auth().userId &&
            !role &&
            req.nextUrl.pathname !== completeProfilePage
        ) {
            return NextResponse.redirect(new URL(completeProfilePage, req.url));
        }

        //the user doesn't have right permission
        if (!isRightPermission(role, req)) {
            return NextResponse.redirect(new URL(errorPage, req.url));
        }

        //the user is fully authorized and in home page or complete profile page
        if (
            auth().userId &&
            role &&
            (req.nextUrl.pathname === homePage ||
                req.nextUrl.pathname === completeProfilePage)
        ) {
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
