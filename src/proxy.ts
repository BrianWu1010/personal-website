import { NextResponse, userAgent, type NextRequest } from "next/server";

const LAYOUT_COOKIE = "layout";
type Layout = "desktop" | "mobile";

const isLayout = (value: string | null | undefined): value is Layout =>
  value === "desktop" || value === "mobile";

export function proxy(request: NextRequest) {
  const view = request.nextUrl.searchParams.get("view");

  if (isLayout(view)) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("view");
    const response = NextResponse.redirect(url);
    response.cookies.set(LAYOUT_COOKIE, view, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return response;
  }

  const saved = request.cookies.get(LAYOUT_COOKIE)?.value;
  const layout: Layout = isLayout(saved)
    ? saved
    : userAgent(request).device.type === "mobile"
      ? "mobile"
      : "desktop";

  const response =
    layout === "mobile" ? NextResponse.rewrite(new URL("/m", request.url)) : NextResponse.next();
  response.headers.set("Vary", "User-Agent, Cookie");
  return response;
}

export const config = {
  matcher: "/",
};
