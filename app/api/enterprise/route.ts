import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured || !supabase) {
      return NextResponse.json(
        { error: "Database not configured. Please contact support." },
        { status: 503 }
      );
    }

    const { companyName, email, phone, employees, challenges } =
      await request.json();

    if (!companyName || !email || !phone) {
      return NextResponse.json(
        { error: "Company name, email and phone are required" },
        { status: 400 }
      );
    }

    const referenceId = `ENT-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 5)
      .toUpperCase()}`;

    const { data, error } = await supabase
      .from("enterprise_inquiries")
      .insert([
        {
          company_name: companyName,
          email,
          phone,
          employee_count: employees || null,
          challenges: challenges || null,
          reference_id: referenceId,
          status: "new",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("SUPABASE ERROR:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        receipt: {
          referenceId,
          companyName,
          email,
          phone,
          employees,
          createdAt: data.created_at,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("ROUTE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
