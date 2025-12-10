import Contribute from "./Contribute";

export default async function GroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="p-8">
      <Contribute groupId={id} />
    </div>
  );
}
