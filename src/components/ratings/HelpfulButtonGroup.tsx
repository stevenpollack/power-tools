import { type FC } from "react";

export const HelpfulButtonGroup: FC = () => (
  <div className="flex gap-2">
    <button className="rounded bg-gray-100 px-3 py-1 text-gray-700 hover:bg-gray-200">
      Helpful
    </button>
    <button className="rounded bg-gray-100 px-3 py-1 text-gray-700 hover:bg-gray-200">
      Unhelpful
    </button>
  </div>
);
