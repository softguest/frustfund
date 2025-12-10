import MembersTable from "@/components/MembersTable";
import ContributionsTable from "@/components/ContributionsTable";
import { db } from "@/config/db";
import { groups, groupMembers, contributions } from "@/config/schema";
import { eq } from "drizzle-orm";
import { users } from "@/config/schema";


export default async function GroupDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

const group = await db
  .select({
    id: groups.id,
    name: groups.name,
    description: groups.description,
    createdAt: groups.createdAt,
    userId: groups.userId,
    creatorName: users.fullName,   // 👈 add creator name
    creatorEmail: users.email,     // optional
  })
  .from(groups)
  .leftJoin(users, eq(groups.userId, users.id))
  //@ts-ignore
  .where(eq(groups.id, id))
  .limit(1)
  .then((res) => res[0]);

    //   // 👉 Fetch members
const members = await db
  .select({
    memberId: groupMembers.id,
    joinedAt: groupMembers.joinedAt,
    userId: users.id,
    name: users.fullName,
    email: users.email,
  })
  .from(groupMembers)
  .leftJoin(users, eq(groupMembers.userId, users.id))
  .where(eq(groupMembers.groupId, id));


    //   // 👉 Fetch contributions
  const contributionsList = await db
    .select()
    .from(contributions)
    //@ts-ignore
    .where(eq(contributions.groupId, id));

  if (!group) return <p className="p-10 text-center">Group not found</p>;
    return (
      <div className="container p-8 space-y-6">
        <h1 className="text-3xl font-bold">{group.name}</h1>
        <p className="text-gray-700">{group.description ?? "No description"}</p>
        <p className="text-sm text-gray-500">
          Created by <span className="font-medium">{group.creatorName}</span> on{" "}
          {new Date(group.createdAt).toLocaleDateString()}
        </p>
        {/* MEMBERS */}
       <MembersTable members={members} />

       {/* CONTRIBUTIONS */}
       <ContributionsTable contributions={contributionsList} />
      </div>
    );
  } 