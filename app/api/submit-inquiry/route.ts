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

    const {
      planName,
      fullName,
      email,
      phone,
      location,
      companyName,
      employeeCount,
      challenges,
      yearlyPlan,
      noOfSystems,
      months,
    } = await request.json();

    if (!planName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Format plan name
    const plan = planName.toLowerCase();

    // Generate formatted reference ID
    const referenceId = `PLAN-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 5)
      .toUpperCase()}`;

    // ==== ENTERPRISE HANDLING ====
    if (plan === "enterprise") {
      if (!companyName) {
        return NextResponse.json(
          { error: "Company name is required for enterprise inquiries" },
          { status: 400 }
        );
      }

      const { data, error } = await supabase
        .from("enterprise_inquiries")
        .insert([
          {
            company_name: companyName,
            email,
            phone,
            employee_count: employeeCount || null,
            challenges: challenges || null,
            reference_id: referenceId,
            status: "new",
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("SUPABASE ENTERPRISE ERROR:", error);
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
            planName: "Enterprise",
            email,
            phone,
            companyName,
            employees: employeeCount,
            createdAt: data.created_at,
          },
        },
        { status: 201 }
      );
    }

    // ==== STANDARD PLANS: Lite / Pro / Ultra ====
    if (!fullName || !location) {
      return NextResponse.json(
        { error: "Full Name and Location are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("plan_inquiries")
      .insert([
        {
          plan_name: planName,
          full_name: fullName,
          email,
          phone,
          location,
          yearly_plan: yearlyPlan || false,
          no_of_systems: noOfSystems || 1,
          months: months || 1,
          reference_id: referenceId,
          status: "new",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("SUPABASE PLAN ERROR:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Return receipt for UI
    return NextResponse.json(
      {
        success: true,
        receipt: {
          referenceId,
          planName,
          fullName,
          email,
          phone,
          location,
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
