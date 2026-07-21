"use client";

import { Command } from "cmdk";
import { searchableItems } from "./data";

interface SearchResultsProps {
  search: string;
  onSelect: (id: string) => void;
}

export default function SearchResults({
  search,
  onSelect,
}: SearchResultsProps) {
  const query = search.trim().toLowerCase();

  const filteredItems = searchableItems.filter((item) =>
    item.title.toLowerCase().includes(query)
  );

  const navigationItems = filteredItems.filter(
    (item) => item.type === "Navigation"
  );

  const quickActions = filteredItems.filter(
    (item) => item.type === "Quick Action"
  );

  const easterEgg = filteredItems.filter(
    (item) => item.type === "Easter Egg"
  );

  return (
    <>
      <Command.List className="max-h-[min(420px,55vh)] overflow-y-auto p-2">

        <Command.Empty className="py-8 text-center text-sm text-zinc-500">
          No results found.
        </Command.Empty>

        {/* Navigation */}
        {navigationItems.length > 0 && (
          <Command.Group
            heading="Navigation"
            className="px-2 py-2"
          >
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <Command.Item
                  key={item.id}
                  value={item.title}
                  onSelect={() => onSelect(item.id)}
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2
                    text-sm
                    text-zinc-300
                    aria-selected:bg-white/10
                    aria-selected:text-white
                  "
                >
                  <Icon size={18} />

                  <span>{item.title}</span>
                </Command.Item>
              );
            })}
          </Command.Group>
        )}

        {/* Quick Actions */}
        {quickActions.length > 0 && (
          <Command.Group
            heading="Quick Actions"
            className="px-2 py-2"
          >
            {quickActions.map((item) => {
              const Icon = item.icon;

              return (
                <Command.Item
                  key={item.id}
                  value={item.title}
                  onSelect={() => onSelect(item.id)}
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2
                    text-sm
                    text-zinc-300
                    aria-selected:bg-white/10
                    aria-selected:text-white
                  "
                >
                  <Icon size={18} />

                  <span>{item.title}</span>
                </Command.Item>
              );
            })}
          </Command.Group>
        )}

        {/* Easter Egg */}
        {easterEgg.length > 0 && (
          <Command.Group
            heading="Hidden"
            className="px-2 py-2"
          >
            {easterEgg.map((item) => {
              const Icon = item.icon;

              return (
                <Command.Item
                  key={item.id}
                  value={item.title}
                  onSelect={() => onSelect(item.id)}
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2
                    text-sm
                    text-zinc-300
                    aria-selected:bg-emerald-500/20
                    aria-selected:text-emerald-300
                  "
                >
                  <Icon size={18} />

                  <span>{item.title}</span>
                </Command.Item>
              );
            })}
          </Command.Group>
        )}
      </Command.List>
    </>
  );
}