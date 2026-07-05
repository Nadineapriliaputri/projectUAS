import { NextResponse } from "next/server";

export async function GET() {

const response = await fetch(
"https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=64.71.01.1003"
);

const data = await response.json();

return NextResponse.json(data);

}