import MembersTable from "@/components/MembersTable";
import ContributionsTable from "@/components/ContributionsTable";
import GroupProgress from "@/components/groups/GroupProgress";
import ContributionsChart from "@/components/groups/ContributionsChart";
import MyContributionCard from "@/components/groups/MyContributionCard";

import { db } from "@/config/db";
import { groups, groupMembers, contributions, users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
export default async function GroupDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  /* -------- AUTH -------- */
  const session = await auth();
  const userId = session?.userId;

  if (!userId) throw new Error("Unauthorized");

  /* -------- GROUP -------- */
  const group = await db
    .select({
      id: groups.id,
      name: groups.name,
      description: groups.description,
      goalAmount: groups.goalAmount,
      creatorName: users.fullName,
      creatorId: groups.userId,
    })
    .from(groups)
    .leftJoin(users, eq(groups.userId, users.id))
    .where(eq(groups.id, id))
    .limit(1)
    .then((res) => res[0]);
  if (!group) throw new Error("Group not found");

  const isCreator = group.creatorId === userId;
  console.log("isCreator is:", isCreator);

  /* -------- MEMBERS -------- */
  /* -------- MEMBERS -------- */
  const members = await db
    .select({
      memberId: groupMembers.id,
      userId: users.id,
      name: users.fullName,
      email: users.email,
      expectedAmount: groupMembers.expectedAmount,
      joinedAt: groupMembers.joinedAt,
    })
    .from(groupMembers)
    .leftJoin(users, eq(groupMembers.userId, users.id))
    .where(eq(groupMembers.groupId, id));

  /* -------- CONTRIBUTIONS -------- */
  const contributionsList = await db
  .select({
    id: contributions.id,
    amount: contributions.amount,
    createdAt: contributions.createdAt,
    userId: contributions.userId,
    user: {
      id: users.id,
      fullName: users.fullName,
    },
  })
  .from(contributions)
  .leftJoin(users, eq(contributions.userId, users.id))
  .where(eq(contributions.groupId, id));

  /* -------- TOTAL RAISED -------- */
  const totalRaised = contributionsList.reduce(
    (sum, c) => sum + Number(c.amount),
    0
  );

  const memberStats = members.map((member) => {
    const contributed = contributionsList
      .filter((c) => c.userId === member.userId)
      .reduce((sum, c) => sum + Number(c.amount), 0);

    const expected = Number(member.expectedAmount);
    const remaining = Math.max(expected - contributed, 0);

    let status: "COMPLETED" | "ON_TRACK" | "BEHIND" = "BEHIND";

    if (contributed >= expected) status = "COMPLETED";
    else if (contributed >= expected * 0.5) status = "ON_TRACK";

    return {
      ...member,
      contributed,
      expected,
      remaining,
      status,
      progress:
        expected > 0
          ? Math.min((contributed / expected) * 100, 100)
          : 0,
    };
  });

  /* -------- MY MEMBER RECORD -------- */
  const myMember = members.find((m) => m.userId === userId);

  if (!myMember) {
    throw new Error("You are not a member of this group");
  }

  /* -------- MY CONTRIBUTION -------- */
  const myContribution = contributionsList
    .filter((c) => c.userId === userId)
    .reduce((sum, c) => sum + Number(c.amount), 0);

  const expectedAmount = Number(myMember.expectedAmount);

  const myProgress =
    expectedAmount > 0
      ? Math.min((myContribution / expectedAmount) * 100, 100)
      : 0;

  /* -------- UI -------- */
  return (
    <div className="container p-2 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{group.name}</h1>
        <hr className="my-4"/>
        <p className="text-gray-600">{group.description}</p>
        <p className="text-sm text-gray-400">
          Created by {group.creatorName}
        </p>
      </div>

      <GroupProgress
        goal={Number(group.goalAmount)}
        raised={totalRaised}
      />

      <MyContributionCard
        contributed={myContribution}
        expected={expectedAmount}
        percentage={myProgress}
        remaining={Math.max(expectedAmount - myContribution, 0)}
        status={
          myContribution >= expectedAmount
            ? "COMPLETED"
            : myProgress >= 50
            ? "ON_TRACK"
            : "BEHIND"
        }
      />
      {/* <MembersTable members={members} /> */}
      <MembersTable
        groupId={group.id}
        isCreator={isCreator}
        members={memberStats.map((m) => ({ ...m, userId: m.userId ?? "" }))}
      />

      {/* <MembersTable members={members} /> */}
      {/* <MembersTable members={memberStats.map((m) => ({ ...m, userId: m.userId ?? "" }))} /> */}

      <ContributionsTable
        contributions={contributionsList.map((c) => ({
          ...c,
          createdAt: c.createdAt ?? new Date(),
        }))}
      />
    </div>
  );
}
