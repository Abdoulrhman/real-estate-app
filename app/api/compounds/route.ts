import { NextResponse } from "next/server";
import { compounds } from "../../data/compounds";

export async function GET() {
  return NextResponse.json(compounds);
}
