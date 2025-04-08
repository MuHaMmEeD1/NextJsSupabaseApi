import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const todoId = parseInt(params.id);

  console.log("Todo ID:", todoId);

  if (isNaN(todoId)) {
    return NextResponse.json({ error: "Invalid Todo ID" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("id", todoId)
    .maybeSingle();

  if (error) {
    console.error("Supabase error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const data = await request.json();

  const todoId = data.id;
  console.log("Attempting to delete Todo with ID:", todoId);

  console.log("\n\n ok 1 \n\n");

  try {
    if (isNaN(todoId)) {
      console.error("Invalid Todo ID:", todoId);
      return NextResponse.json({ error: "Invalid Todo ID" }, { status: 400 });
    }

    console.log("\n\n ok 2 \n\n");

    const { data, error } = await supabase
      .from("todos")
      .delete()
      .eq("id", todoId);

    console.log("\n\n ok 3 \n\n");

    if (error) {
      console.error("Supabase delete error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("Todo deleted successfully:", data);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Unexpected error occurred:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const todoId = parseInt(params.id);

  if (isNaN(todoId)) {
    console.error("Invalid Todo ID:", todoId);
    return NextResponse.json({ error: "Invalid Todo ID" }, { status: 400 });
  }

  try {
    const requestData = await request.json();

    if (
      !requestData.title &&
      !requestData.description &&
      typeof requestData.completed !== "boolean"
    ) {
      console.error("No valid fields to update");
      return NextResponse.json(
        { error: "At least one valid field to update is required" },
        { status: 400 }
      );
    }

    console.log(requestData.completed);

    const { data, error } = await supabase
      .from("todos")
      .update({
        title: requestData.title ?? undefined,
        description: requestData.description ?? undefined,
      })
      .eq("id", todoId);

    if (error) {
      console.error("Supabase error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Internal error:", err);
    console.dir(err);
    return NextResponse.json(
      { error: "Internal server error: " + err },
      { status: 500 }
    );
  }
}
