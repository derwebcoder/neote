import { EditorMain } from "@/components/EditorMain/EditorMain";

export type MainTemplateProps = {
  menuSlot: React.ReactNode;
  mainSlot: React.ReactNode;
};

export const MainTemplate = ({ menuSlot, mainSlot }: MainTemplateProps) => {
  return (
    <div className="grid h-full grid-cols-12 gap-4 px-4 py-4" data-tag-style="token-gradient-light">
      <div className="col-span-5 flex flex-col gap-4">
        <div className="h-24 rounded-sm shadow shadow-stone-300">
          <EditorMain />
        </div>
        {menuSlot}
      </div>
      <main className="col-span-7 rounded-lg bg-white shadow shadow-stone-300 drop-shadow-lg">
        {mainSlot}
      </main>
    </div>
  );
};
