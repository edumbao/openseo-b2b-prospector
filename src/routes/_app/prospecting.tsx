
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/prospecting")({
  component: ProspectingPage,
});

function ProspectingPage() {
  return (
    <div className="px-4 py-6 md:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold">
            SEO Prospecting
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Find local businesses, identify SEO opportunities,
            and build qualified prospect lists.
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-medium">
            Prospecting Workspace
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Targetron business search will be integrated here.
          </p>
        </div>
      </div>
    </div>
  );
}
