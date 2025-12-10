import GroupsList from "./GroupsList";

interface Group {
  id: string;
  name: string;
  description?: string;
  isMember: boolean;
  memberCount: number;
}

export default function GroupsListServer({ groups }: { groups: Group[] }) {
  return <GroupsList groups={groups} loading={false} onJoin={() => {}} />;
}
